import requests
import asyncio
from bs4 import BeautifulSoup
from models.product import Product

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
}


def fetch_page(url: str) -> requests.Response:
    last_error = None
    for attempt in range(1, 3):
        try:
            response = requests.get(url, headers=headers, timeout=(10, 20))
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as error:
            last_error = error
            print(f"Request attempt {attempt}/2 failed for {url}: {error}")

    raise RuntimeError(f"Unable to fetch {url} after 2 attempts") from last_error


async def scrape_and_store_pages(start_page: int, end_page: int):
    for page in range(start_page, end_page + 1):
        print(f"Scraping page {page}...")
        url = f"https://priceoye.pk/mobiles?page={page}"
        try:
            response = await asyncio.to_thread(fetch_page, url)
        except RuntimeError as error:
            print(f"Skipping page {page}: {error}")
            continue

        soup = BeautifulSoup(response.content, "html.parser")
        cards = soup.select("div.productBox")

        if not cards:
            break

        for card in cards:
            try:
                title_el = card.select_one("h4.p-title, .p-title")
                price_el = card.select_one("div.price-box span")
                image_el = card.select_one("img.product-thumbnail-img")
                link_el = card.select_one("a[href]")

                if not all((title_el, price_el, image_el, link_el)):
                    print("Skipping product card with missing required fields")
                    continue

                title = title_el.get_text(strip=True)
                price = price_el.get_text(strip=True)
                image = image_el.get("src") or image_el.get("data-src")
                link = link_el["href"]
                if not image:
                    print(f"Skipping product card without an image: {title}")
                    continue

                full_link = link if link.startswith("http") else f"https://priceoye.pk{link}"

                rating_el = card.select_one("span.h6")
                rating = rating_el.get_text(strip=True) if rating_el else None

                reviews_el = card.select_one("span.rating-h7, span.p6")
                reviews = reviews_el.get_text(strip=True) if reviews_el else None

                await Product.get_or_create(
                    link=full_link,
                    defaults={
                        "title": title,
                        "price": price,
                        "image_url": image,
                        "rating": rating,
                        "reviews": reviews,
                     }
             )
            except (KeyError, TypeError) as e:
                print("Error processing product card:", e)
