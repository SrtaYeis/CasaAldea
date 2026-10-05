const fmt = new Intl.NumberFormat("es-PE", { style: "currency", currency: "USD" });
export const money = (n) => fmt.format(n);
