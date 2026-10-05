export const CATEGORIES = [
  { slug: "furniture", label: "Mobiliario" },
  { slug: "home-decoration", label: "Decoración" },
  { slug: "kitchen-accessories", label: "Cocina" },
];
export const categoryLabel = (slug) => CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;

export const SORTS = {
  default: { label: "Destacados", compare: null },
  priceAsc: { label: "Precio: menor a mayor", compare: (a, b) => a.finalPrice - b.finalPrice },
  priceDesc: { label: "Precio: mayor a menor", compare: (a, b) => b.finalPrice - a.finalPrice },
  rating: { label: "Mejor calificados", compare: (a, b) => b.rating - a.rating },
  discount: { label: "Mayor descuento", compare: (a, b) => b.discountPercentage - a.discountPercentage },
};

export function filterAndSort(products, { query = "", sort = "default", onlyDiscount = false, category = null } = {}) {
  const q = query.trim().toLowerCase();
  const list = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!q || p.title.toLowerCase().includes(q) || p.tags.some((t) => t.toLowerCase().includes(q))) &&
      (!onlyDiscount || p.hasDiscount)
  );
  const cmp = SORTS[sort]?.compare;
  return cmp ? [...list].sort(cmp) : list;
}
