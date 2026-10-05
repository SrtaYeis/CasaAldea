import { Product } from "../../domain/product/Product.js";

const BASE = "https://dummyjson.com";
const HOME_CATEGORIES = ["furniture", "home-decoration", "kitchen-accessories"];

const toProduct = (dto) =>
  new Product({
    id: dto.id,
    title: dto.title,
    description: dto.description,
    category: dto.category,
    brand: dto.brand,
    sku: dto.sku,
    tags: dto.tags,
    price: dto.price,
    discountPercentage: dto.discountPercentage,
    rating: dto.rating,
    stock: dto.stock,
    dimensions: dto.dimensions,
    weight: dto.weight,
    warranty: dto.warrantyInformation,
    shipping: dto.shippingInformation,
    returnPolicy: dto.returnPolicy,
    availabilityStatus: dto.availabilityStatus,
    images: dto.images,
    thumbnail: dto.thumbnail,
    reviews: (dto.reviews ?? []).map((r) => ({
      rating: r.rating, comment: r.comment, author: r.reviewerName, date: r.date,
    })),
  });

async function getJson(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`DummyJSON respondió ${res.status}`);
  return res.json();
}

export class DummyJsonProductRepository {
  async findAll() {
    const pages = await Promise.all(HOME_CATEGORIES.map((c) => getJson(`/products/category/${c}`)));
    return pages.flatMap((p) => p.products).map(toProduct);
  }
  async findById(id) {
    return toProduct(await getJson(`/products/${id}`));
  }
}
