export class Cart {
  constructor(lines = []) {
    this.lines = lines;
  }
  static fromPlain(lines) {
    return new Cart(Array.isArray(lines) ? lines : []);
  }
  add(product) {
    const exists = this.lines.some((l) => l.productId === product.id);
    const lines = exists
      ? this.lines.map((l) => (l.productId === product.id ? { ...l, quantity: l.quantity + 1 } : l))
      : [...this.lines, {
          productId: product.id, title: product.title, thumbnail: product.thumbnail,
          unitPrice: product.finalPrice, quantity: 1,
        }];
    return new Cart(lines);
  }
  changeQuantity(productId, delta) {
    return new Cart(
      this.lines
        .map((l) => (l.productId === productId ? { ...l, quantity: l.quantity + delta } : l))
        .filter((l) => l.quantity > 0)
    );
  }
  get count() {
    return this.lines.reduce((s, l) => s + l.quantity, 0);
  }
  get total() {
    return this.lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
  }
  get isEmpty() {
    return this.lines.length === 0;
  }
}
