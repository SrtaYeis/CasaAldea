/**
 * Puerto del dominio. Toda implementación debe exponer:
 *   findAll():  Promise<Product[]>
 *   findById(id): Promise<Product>
 */
export const REPOSITORY_METHODS = ["findAll", "findById"];
export function assertProductRepository(repo) {
  for (const m of REPOSITORY_METHODS) {
    if (typeof repo[m] !== "function") throw new Error(`ProductRepository sin método ${m}`);
  }
  return repo;
}
