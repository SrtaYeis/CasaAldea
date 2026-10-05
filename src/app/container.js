// Raíz de composición: único lugar donde se eligen las implementaciones concretas.
import { DummyJsonProductRepository } from "../infrastructure/dummyjson/DummyJsonProductRepository.js";
import { LocalStorageCartRepository } from "../infrastructure/storage/LocalStorageCartRepository.js";
import { makeCatalogUseCases } from "../application/catalog/CatalogUseCases.js";
import { makeCartUseCases } from "../application/cart/CartUseCases.js";

export const catalog = makeCatalogUseCases(new DummyJsonProductRepository());
export const cartUseCases = makeCartUseCases(new LocalStorageCartRepository());
