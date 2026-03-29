import { MOCK_PRODUCTS } from "./mockData";

const FALLBACK_API_URL = "https://69c90d5c68edf52c954e334d.mockapi.io/ShopEase";
const MOCK_HOME_PRODUCTS = MOCK_PRODUCTS.filter(p => p.category === "Home");

function mapCategory(apiCategory) {
  if (!apiCategory) return "Home";
  const lower = apiCategory.toLowerCase();
  if (lower === "electronics") return "Electronics";
  if (["jewelery", "men's clothing", "women's clothing", "accessories"].includes(lower)) {
    return "Accessories";
  }
  return "Home";
}

function normaliseProduct(item) {
  return {
    id: item.id,
    name: item.title || item.name || "Unnamed Product",
    price: typeof item.price === "number" ? item.price : 0,
    originalPrice: item.originalPrice || Math.round((item.price || 0) * 1.3),
    category: mapCategory(item.category),
    rating: typeof item.rating === "number" ? item.rating : 4.0,
    reviews: typeof item.reviews === "number" ? item.reviews : Math.floor(Math.random() * 500) + 10,
    image: item.image || "https://via.placeholder.com/400",
    badge: item.badge || (item.price && item.price < 50 ? "Sale" : null),
    description: item.description || "No description available.",
  };
}

export async function fetchProducts(apiUrl = FALLBACK_API_URL) {
  console.log("[API] Fetching from:", apiUrl);
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    // If empty array, warn and use mock data
    if (Array.isArray(data) && data.length === 0) {
      console.warn("[API] Empty array received – no products in database. Using mock data.");
      return MOCK_PRODUCTS;
    }

    if (Array.isArray(data)) {
      const apiProducts = data.map(normaliseProduct);
      const allProducts = [...apiProducts, ...MOCK_HOME_PRODUCTS];
      return allProducts;
    }

    console.warn("[API] Unexpected format, using mock data");
    return MOCK_PRODUCTS;
  } catch (error) {
    console.error("[API] Fetch failed, using mock data:", error.message);
    return MOCK_PRODUCTS;
  }
}

export function delay(ms = 600) {
  return new Promise(resolve => setTimeout(resolve, ms));
}