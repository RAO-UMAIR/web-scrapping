import requests
from bs4 import BeautifulSoup
from models.product import Product

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}

async def scrape_and_store_pages(start_page: int, end_page: int):
    for page in range(start_page, end_page + 1):
        print(f"Scraping page {page}...")
        url = f"https://priceoye.pk/mobiles?page={page}"
        response = requests.get(url, headers=headers)

        soup = BeautifulSoup(response.content, "html.parser")
        cards = soup.select("div.productBox")

        if not cards:
            break

        for card in cards:
            
            try:
                title = card.select_one("div.p-title").get_text(strip=True)
                price = card.select_one("div.price-box span").get_text(strip=True)
                image = card.select_one("img.product-thumbnail-img")["src"]
                link = card.select_one("a")["href"]
                full_link = link if link.startswith("http") else f"https://priceoye.pk{link}"
    
                rating_el = card.select_one("span.h6")
                rating = rating_el.get_text(strip=True) if rating_el else None

                reviews_el = card.select_one("span.rating-h7")
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
            except Exception as e:
                     print("Error processing product card:", e)
