import { money } from "../../shared/format.js";

export default function Price({ product }) {
  return (
    <div className="price">
      <b>{money(product.finalPrice)}</b>
      {product.hasDiscount && <s>{money(product.price)}</s>}
    </div>
  );
}
