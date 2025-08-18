import os
import uuid
from datetime import datetime, timezone
from typing import List, Optional
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI(title="Adam's Kustom Badges API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve static images
app.mount("/images", StaticFiles(directory="/app/images"), name="images")

# MongoDB connection
MONGO_URL = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
client = AsyncIOMotorClient(MONGO_URL)
db = client.akb_store

# Pydantic Models
class Product(BaseModel):
    id: str
    name: str
    description: str
    price: float
    original_price: Optional[float] = None
    stock: int
    category: str
    image: str
    images: List[str] = []
    tags: List[str] = []
    rating: float = 4.8
    reviews: int = 0
    sku: str
    status: str = "active"
    created_at: datetime = datetime.now(timezone.utc)

class CartItem(BaseModel):
    product_id: str
    quantity: int
    
class Cart(BaseModel):
    items: List[CartItem]
    total: float

# Real Products Data - Your Actual Catalog
REAL_PRODUCTS = [
    {
        "id": "akb-001",
        "name": "German Eagle (Federal Court Eagle)",
        "description": "German Eagle (Federal Court Eagle) zinc alloy materials, size 90mm FRONT HOOD BADGE FIT LIKE THE ORIGINAL VW EMBLEM FITS THE 1956-1960 (3 holes hood) & 1961-1976 BEETLE",
        "price": 39.99,
        "stock": -1,  # Special case for unlimited stock
        "category": "Hood Badges",
        "image": "/r0002.png",
        "images": ["/r0002.png"],
        "tags": ["German", "Eagle", "Hood Badge", "90mm", "1956-1976"],
        "rating": 4.9,
        "reviews": 156,
        "sku": "AKB-001-GE-90"
    },
    {
        "id": "akb-002", 
        "name": "German Eagle Shift Knob",
        "description": "Wolfsburg Shift Knob Ivory / Black Threaded, 3 size in one shift knob (7mm,10mm,12mm) fit all VW type also we have adapters for after market shifters 1946-1979 Beetle 1952-1979 Bus 1956-1974 Ghia 1962-1974 Type 3 Thing",
        "price": 49.99,
        "stock": 2,
        "category": "Shift Knobs",
        "image": "/images/r0003.png",
        "images": ["/images/r0003.png"],
        "tags": ["Wolfsburg", "Shift Knob", "Threaded", "Multi-size"],
        "rating": 4.8,
        "reviews": 89,
        "sku": "AKB-002-WS-THR"
    },
    {
        "id": "akb-003",
        "name": "German Deutschland Hood Badge Crest", 
        "description": "GERMAN DEUTSCHLAND HOOD BADGE CREST Zinc Alloy Material fit like the original Size is 38mm x 54mm",
        "price": 19.99,
        "stock": 44,
        "category": "Hood Crests",
        "image": "/images/r0004.png", 
        "images": ["/images/r0004.png"],
        "tags": ["Deutschland", "Hood Crest", "38x54mm", "Germany"],
        "rating": 4.7,
        "reviews": 203,
        "sku": "AKB-003-DE-38"
    },
    {
        "id": "akb-004",
        "name": "Wolfsburg Crest Hood",
        "description": "WOLFSBURG CREST HOOD EMBLEM SIZE 38mm x 54mm Zinc alloy metal",
        "price": 19.99,
        "stock": 5,
        "category": "Hood Crests", 
        "image": "/images/r0005.png",
        "images": ["/images/r0005.png"],
        "tags": ["Wolfsburg", "Hood Crest", "38x54mm", "Zinc Alloy"],
        "rating": 4.9,
        "reviews": 127,
        "sku": "AKB-004-WB-38"
    },
    {
        "id": "akb-005",
        "name": "VW Shift knob with Wolfsburg emblem",
        "description": "Wolfsburg Shift Knob Ivory / Black Threaded, 3 size in one shift knob also we have adapters for after market shifters (7mm,10mm,12mm) fit all VW type 1946-1979 Beetle 1952-1979 Bus 1956-1974 Ghia 1962-1974 Type 3 Thing",
        "price": 49.99,
        "stock": 6,
        "category": "Shift Knobs",
        "image": "/images/r0006.png",
        "images": ["/images/r0006.png"], 
        "tags": ["Wolfsburg", "Shift Knob", "VW Emblem", "Multi-size"],
        "rating": 5.0,
        "reviews": 98,
        "sku": "AKB-005-VW-WB"
    },
    {
        "id": "akb-006",
        "name": "Eagle Horn Grill",
        "description": "Eagle Horn Grill (Federal Coat of Arm Germany) Fit 1953-1967 Beetle Made of Polished Aluminum Fit perfectly, NO Drilling Just tight it from the back it Add a adorable touch and make your ride looks different.",
        "price": 49.99,
        "stock": 9,
        "category": "Horn Grills",
        "image": "/images/r0007.png",
        "images": ["/images/r0007.png"],
        "tags": ["Eagle", "Horn Grill", "1953-1967", "Polished Aluminum"],
        "rating": 4.8,
        "reviews": 74,
        "sku": "AKB-006-EG-AL"
    },
    {
        "id": "akb-007", 
        "name": "German Deutschland Hood Badge Crest",
        "description": "GERMAN DEUTSCHLAND HOOD BADGE CREST Zinc Alloy Material fit like the original Size is 38mm x 54mm",
        "price": 19.99,
        "stock": 19,
        "category": "Hood Crests",
        "image": "/images/r0008.png",
        "images": ["/images/r0008.png"],
        "tags": ["Deutschland", "Hood Crest", "38x54mm", "Germany"],
        "rating": 4.6,
        "reviews": 145,
        "sku": "AKB-007-DE-38B"
    },
    {
        "id": "akb-008",
        "name": "Hawaii Front Hood Badge",
        "description": "HAWAII FRONT HOOD BADGE FIT LIKE THE ORIGINAL VW EMBLEM FITS THE 1961-1972 BEETLE (3 holes hood) ASK PLS FOR THE YEAR 1956-60, 3 HOLS HOOD TYPE 3 1963-69 also on BAYWINDOW BUS FRONT VENT",
        "price": 55.00,
        "stock": 2,
        "category": "Hood Badges",
        "image": "/images/r0009.png",
        "images": ["/images/r0009.png"],
        "tags": ["Hawaii", "Front Hood", "1961-1972", "3 holes"],
        "rating": 4.9,
        "reviews": 34,
        "sku": "AKB-008-HW-90"
    },
    {
        "id": "akb-009",
        "name": "St. Christophorus Hood Badge Crest",
        "description": "ST. CHRISTOPHORUS HOOD BADGE CREST SIZE 38mm x 54mm Zinc alloy metal",
        "price": 19.99,
        "stock": 21,
        "category": "Hood Crests",
        "image": "/images/r0010.png",
        "images": ["/images/r0010.png"],
        "tags": ["St. Christophorus", "Hood Crest", "38x54mm", "Religious"],
        "rating": 4.7,
        "reviews": 67,
        "sku": "AKB-009-SC-38"
    },
    {
        "id": "akb-010",
        "name": "Wolfsburg Crest Hood Emblem",
        "description": "WOLFSBURG CREST HOOD EMBLEM SIZE 38mm x 54mm Zinc alloy metal",
        "price": 19.99,
        "stock": 4,
        "category": "Hood Crests",
        "image": "/images/r0011.png", 
        "images": ["/images/r0011.png"],
        "tags": ["Wolfsburg", "Hood Emblem", "38x54mm", "Classic"],
        "rating": 4.8,
        "reviews": 189,
        "sku": "AKB-010-WB-38B"
    },
    {
        "id": "akb-011",
        "name": "Wolfsburg Shift Knob - Gold Castle",
        "description": "Wolfsburg Shift Knob Ivory / Black Threaded, 3 size in one shift knob also we have adapters for after market shifters (7mm,10mm,12mm) fit all VW type 1946-1979 Beetle 1952-1979 Bus 1956-1974 Ghia 1962-1974 Type 3 Thing",
        "price": 49.99,
        "stock": 6,
        "category": "Shift Knobs",
        "image": "/images/r0012.png",
        "images": ["/images/r0012.png"],
        "tags": ["Wolfsburg", "Shift Knob", "Gold Castle", "Premium"],
        "rating": 4.9,
        "reviews": 112,
        "sku": "AKB-011-WS-GC"
    },
    {
        "id": "akb-012",
        "name": "Mexico Flag Hood Crest Emblem",
        "description": "MEXICO FLAG HOOD CREST EMBLEM Zinc Alloy Materials, size 38mm X 54mm Fit VW Beetle like the original",
        "price": 19.99,
        "stock": 5,
        "category": "Hood Crests", 
        "image": "/images/r0013.png",
        "images": ["/images/r0013.png"],
        "tags": ["Mexico", "Flag", "Hood Crest", "38x54mm"],
        "rating": 4.8,
        "reviews": 91,
        "sku": "AKB-012-MX-38"
    },
    {
        "id": "akb-013",
        "name": "VW Eagle Crest Wolfsburg Hood Badge",
        "description": "VW EAGLE CREST WOLFSBURG HOOD BADGE CREST Zinc Alloy Material fit like the original Size is 38mm x 54mm",
        "price": 19.99,
        "stock": 7,
        "category": "Hood Crests",
        "image": "/images/r0014.png",
        "images": ["/images/r0014.png"],
        "tags": ["VW Eagle", "Wolfsburg", "Hood Badge", "38x54mm"],
        "rating": 4.7,
        "reviews": 156,
        "sku": "AKB-013-VWE-38"
    },
    {
        "id": "akb-014",
        "name": "Wolfsburg Front Hood Badge",
        "description": "WOLFSBURG FRONT HOOD BADGE Zinc Alloy Materials, size 90mm FIT LIKE THE ORIGINAL VW EMBLEM FITS THE 1956-1960 (3 Holes Hood) 1961-1976 BEETLE also fit (bay window bus vent)",
        "price": 39.99,
        "stock": 5,
        "category": "Hood Badges",
        "image": "/images/r0015.png",
        "images": ["/images/r0015.png"],
        "tags": ["Wolfsburg", "Front Hood", "90mm", "1956-1976"],
        "rating": 4.9,
        "reviews": 143,
        "sku": "AKB-014-WB-90"
    },
    {
        "id": "akb-015",
        "name": "Wolfsburg Shift Knob - Gold Wolf",
        "description": "Wolfsburg Shift Knob Ivory / Black Threaded, 3 size in one shift knob also we have adapters for after market shifters (7mm,10mm,12mm) fit all VW type 1946-1979 Beetle 1952-1979 Bus 1956-1974 Ghia 1962-1974 Type 3 Thing",
        "price": 49.99,
        "stock": 9,
        "category": "Shift Knobs",
        "image": "/images/r0016.png",
        "images": ["/images/r0016.png"],
        "tags": ["Wolfsburg", "Shift Knob", "Gold Wolf", "Limited Edition"],
        "rating": 5.0,
        "reviews": 78,
        "sku": "AKB-015-WS-GW"
    },
    {
        "id": "akb-016",
        "name": "VW Shift Knob with Wolfsburg Emblem Logo",
        "description": "Wolfsburg Shift Knob Ivory / Black Threaded, 3 size in one shift knob (7mm,10mm,12mm) fit all VW type also we have adapters for after market shifters 1946-1979 Beetle 1952-1979 Bus 1956-1974 Ghia 1962-1974 Type 3 Thing",
        "price": 49.99,
        "stock": 10,
        "category": "Shift Knobs",
        "image": "/images/r0017.png",
        "images": ["/images/r0017.png"],
        "tags": ["VW", "Wolfsburg", "Shift Knob", "Logo"],
        "rating": 4.8,
        "reviews": 167,
        "sku": "AKB-016-VW-WL"
    },
    {
        "id": "akb-017",
        "name": "Wolfsburg Horn Grill",
        "description": "Wolfsburg Horn Grill Fit 1953-1967 Beetle Made of Polished Aluminum Fit perfectly, NO Drilling Just tight it from the back it Add a adorable touch and make your ride looks different.",
        "price": 49.99,
        "stock": 7,
        "category": "Horn Grills",
        "image": "/images/r0018.png",
        "images": ["/images/r0018.png"],
        "tags": ["Wolfsburg", "Horn Grill", "1953-1967", "New"],
        "rating": 4.9,
        "reviews": 45,
        "sku": "AKB-017-WH-AL"
    },
    {
        "id": "akb-018",
        "name": "Coat of Arms of Brandenburg Hood Badge",
        "description": "COAT OF ARMS OF BRANDENBURG HOOD BADGE CREST Zinc Alloy Material fit like the original Size is 38mm x 54mm",
        "price": 19.99,
        "stock": 7,
        "category": "Hood Crests",
        "image": "/images/r0019.png",
        "images": ["/images/r0019.png"],
        "tags": ["Brandenburg", "Coat of Arms", "Hood Badge", "German"],
        "rating": 4.6,
        "reviews": 34,
        "sku": "AKB-018-BR-38"
    },
    {
        "id": "akb-019",
        "name": "Coat of Arms of Sao Bernardo do Campo",
        "description": "COAT OF ARMS OF SAO BERNARDO DO CAMPO (BRAZIL) Zinc Alloy materials fit like the original size 38mm x 54mm",
        "price": 19.99,
        "stock": 9,
        "category": "Hood Crests",
        "image": "/images/r0020.png",
        "images": ["/images/r0020.png"],
        "tags": ["Brazil", "Sao Bernardo", "Coat of Arms", "Rare"],
        "rating": 4.8,
        "reviews": 23,
        "sku": "AKB-019-BR-38"
    },
    {
        "id": "akb-020",
        "name": "Mexico Flag Front Hood Badge",
        "description": "MEXICO FLAG FRONT HOOD BADGE Zinc Alloy Materials, size 90mm FIT LIKE THE ORIGINAL VW EMBLEM FITS THE 1956-1960 (3 Holes Hood) 1961-1976 BEETLE also fit (bay window bus vent)",
        "price": 39.99,
        "stock": 9,
        "category": "Hood Badges",
        "image": "/images/r0021.png",
        "images": ["/images/r0021.png"],
        "tags": ["Mexico", "Flag", "Front Hood", "90mm"],
        "rating": 4.7,
        "reviews": 67,
        "sku": "AKB-020-MX-90"
    }
]

@app.on_event("startup")
async def startup_event():
    """Initialize the database with real products"""
    try:
        # Check if products already exist
        existing_count = await db.products.count_documents({})
        if existing_count == 0:
            # Insert real products
            products_to_insert = []
            for product_data in REAL_PRODUCTS:
                product = Product(**product_data)
                products_to_insert.append(product.dict())
            
            if products_to_insert:
                await db.products.insert_many(products_to_insert)
                print(f"✅ Inserted {len(products_to_insert)} real products")
        else:
            print(f"✅ Database already has {existing_count} products")
            
    except Exception as e:
        print(f"❌ Database initialization error: {e}")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Adam's Kustom Badges API is running"}

@app.get("/api/products", response_model=List[Product])
async def get_products(category: Optional[str] = None, search: Optional[str] = None, limit: int = 50):
    """Get products with optional filtering"""
    try:
        query = {"status": "active"}
        
        if category:
            query["category"] = {"$regex": category, "$options": "i"}
            
        if search:
            query["$or"] = [
                {"name": {"$regex": search, "$options": "i"}},
                {"description": {"$regex": search, "$options": "i"}},
                {"tags": {"$regex": search, "$options": "i"}},
                {"sku": {"$regex": search, "$options": "i"}}
            ]
        
        products = await db.products.find(query).limit(limit).to_list(length=None)
        return [Product(**product) for product in products]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching products: {str(e)}")

@app.get("/api/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    """Get a single product by ID"""
    try:
        product = await db.products.find_one({"id": product_id})
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return Product(**product)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching product: {str(e)}")

@app.get("/api/categories")
async def get_categories():
    """Get all product categories"""
    try:
        categories = await db.products.distinct("category", {"status": "active"})
        return {"categories": categories}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching categories: {str(e)}")

@app.post("/api/cart/add")
async def add_to_cart(item: CartItem):
    """Add item to cart (simplified - in production you'd use sessions/user accounts)"""
    try:
        # Verify product exists and has stock
        product = await db.products.find_one({"id": item.product_id})
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
            
        if product["stock"] != -1 and product["stock"] < item.quantity:
            raise HTTPException(status_code=400, detail="Insufficient stock")
            
        return {"message": "Item added to cart", "product": product["name"], "quantity": item.quantity}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding to cart: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)