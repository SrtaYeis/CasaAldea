export class Product {
  constructor(data) {
    Object.assign(this, {
      images: [], reviews: [], tags: [], dimensions: {}, discountPercentage: 0, ...data,
    });
  }
  get finalPrice() {
    return this.price * (1 - this.discountPercentage / 100);
  }
  get hasDiscount() {
    return this.discountPercentage > 0;
  }
  get gallery() {
    return this.images.length ? this.images : [this.thumbnail];
  }
  get hoverImage() {
    return this.images.find((src) => src !== this.thumbnail) ?? null;
  }
  get sizeLabel() {
    const { width, height, depth } = this.dimensions;
    return `${width} × ${height} × ${depth} cm`;
  }
  get inStock() {
    return (this.stock ?? 1) > 0;
  }
}
