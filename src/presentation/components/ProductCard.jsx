import { Link } from "react-router-dom";
import Price from "./Price.jsx";

export default function ProductCard({ product: p }) {
  return (
    <Link className="tile" to={`/producto/${p.id}`}>
      <div className="ph">
        <img src={p.thumbnail} alt={p.title} loading="lazy" />
        {p.hoverImage && <img className="alt" src={p.hoverImage} alt="" loading="lazy" />}
        {p.hasDiscount && <span className="tag">−{Math.round(p.discountPercentage)}%</span>}
      </div>
      <h3>{p.title}</h3>
      <Price product={p} />
    </Link>
  );
}
