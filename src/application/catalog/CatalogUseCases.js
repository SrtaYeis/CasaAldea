import { filterAndSort } from "../../domain/product/ProductCatalog.js";
import { assertProductRepository } from "../../domain/product/ProductRepository.js";

export function makeCatalogUseCases(productRepository) {
  const repo = assertProductRepository(productRepository);
  return {
    listProducts: () => repo.findAll(),
    getProduct: (id) => repo.findById(id),
    browse: (products, filters) => filterAndSort(products, filters),
  };
}
