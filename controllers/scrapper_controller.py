from fastapi import FastAPI, Query, APIRouter, BackgroundTasks, Depends, HTTPException
from models.product import Product
from helpers.user_helper import get_current_user
from models.user import User
from helpers.scrapper_helper import scrape_and_store_pages


router=APIRouter()


@router.get("/scrape")
async def run_scraper(
    background_tasks: BackgroundTasks,
    user: User = Depends(get_current_user),
    start_page: int = Query(..., ge=1),
    end_page: int = Query(..., ge=1),
):
    if end_page < start_page:
        raise HTTPException(status_code=422, detail="end_page must be greater than or equal to start_page")

    background_tasks.add_task(scrape_and_store_pages, start_page, end_page)

    return {"message": f"Scraping pages {start_page} to {end_page} started"}



@router.get("/products")
async def list_products(page: int = 1, limit: int = 10):
    offset = (page - 1) * limit
    products = await Product.all().offset(offset).limit(limit)
    total = await Product.all().count()

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "data": products,
    }
