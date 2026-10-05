import { Link, useParams } from "react-router-dom";
import { catalog } from "../../app/container.js";
import { categoryLabel } from "../../domain/product/ProductCatalog.js";
import { useAsync } from "../hooks/useAsync.js";
import { useCart } from "../context/CartContext.jsx";
import Price from "../components/Price.jsx";
import Stars from "../components/Stars.jsx";
import { ErrorBox } from "../components/AsyncState.jsx";

export default function ProductPage() {
  const { id } = useParams();
  const { status, data: p, reload } = useAsync(() => catalog.getProduct(id), [id]);
  const { add } = useCart();

  return (
    <main className="wide">
      <Link to={p ? `/?categoria=${p.category}` : "/"} className="crumb">← {p ? categoryLabel(p.category) : "Colección"}</Link>
      {status === "loading" && <div className="skel" style={{ aspectRatio: "16/9" }} />}
      {status === "error" && <ErrorBox onRetry={reload} />}
      {status === "ok" && (
        <>
          <article className="pdp">
            <div className="pics">
              {p.gallery.map((src, k) => (
                <div className={`pic${k === 0 ? " first" : ""}`} key={src}>
                  <img src={src} alt={k === 0 ? p.title : ""} />
                </div>
              ))}
            </div>
            <div className="pinfo">
              <h1>{p.title}</h1>
              <Price product={p} />
              <div className="meta"><Stars value={p.rating} /><span>{p.reviews.length} reseñas</span>{p.brand && <span>{p.brand}</span>}</div>
              <p className="desc">{p.description}</p>
              <p className={p.inStock ? "stock" : "stock out"}>{p.inStock ? (p.availabilityStatus ?? "En stock") : "Agotado"}</p>
              <button className="btn dark wide-btn" disabled={!p.inStock} onClick={() => add(p)}>Agregar al carrito</button>
              <details open>
                <summary>Medidas y peso</summary>
                <dl>
                  <dt>Ancho</dt><dd>{p.dimensions.width} cm</dd>
                  <dt>Alto</dt><dd>{p.dimensions.height} cm</dd>
                  <dt>Profundidad</dt><dd>{p.dimensions.depth} cm</dd>
                  <dt>Peso</dt><dd>{p.weight} kg</dd>
                  {p.sku && (<><dt>Referencia</dt><dd>{p.sku}</dd></>)}
                </dl>
              </details>
              <details>
                <summary>Envío, garantía y cambios</summary>
                <dl>
                  {p.shipping && (<><dt>Envío</dt><dd>{p.shipping}</dd></>)}
                  {p.warranty && (<><dt>Garantía</dt><dd>{p.warranty}</dd></>)}
                  {p.returnPolicy && (<><dt>Cambios</dt><dd>{p.returnPolicy}</dd></>)}
                </dl>
              </details>
            </div>
          </article>
          {p.reviews.length > 0 && (
            <section className="reviews">
              <h2>Opiniones de clientes</h2>
              <div className="rev-grid">
                {p.reviews.map((r, k) => (
                  <blockquote key={k}><Stars value={r.rating} /><p>{r.comment}</p><span>{r.author}</span></blockquote>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </main>
  );
}
