import { useEffect, useState } from "react";
import { money } from "../../shared/format.js";
import { useCart } from "../context/CartContext.jsx";
import CheckoutModal from "./CheckoutModal.jsx";

export default function CartDrawer() {
  const { cart, closeCart, change, clear } = useCart();
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && !checkout && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart, checkout]);

  return (
    <>
      <div className="overlay" onClick={closeCart}>
        <aside className="drawer" role="dialog" aria-modal="true" aria-label="Carrito" onClick={(e) => e.stopPropagation()}>
          <h2>Tu carrito</h2>
          <div className="lines">
            {cart.isEmpty && <p className="muted">Aún no agregaste muebles. Explora el catálogo y elige tu favorito.</p>}
            {cart.lines.map((l) => (
              <div className="line" key={l.productId}>
                <img src={l.thumbnail} alt="" />
                <div>
                  <strong>{l.title}</strong>
                  <div className="qty">
                    <button className="qty-btn" onClick={() => change(l.productId, -1)} aria-label="Quitar uno">−</button>
                    <span>{l.quantity}</span>
                    <button className="qty-btn" onClick={() => change(l.productId, 1)} aria-label="Agregar uno">+</button>
                  </div>
                </div>
                <b>{money(l.unitPrice * l.quantity)}</b>
              </div>
            ))}
          </div>
          <div className="total"><span>Total</span><b>{money(cart.total)}</b></div>
          <button
            className="btn dark wide-btn"
            disabled={cart.isEmpty}
            onClick={() => setCheckout(true)}
          >
            Finalizar compra
          </button>
          <button className="btn wide-btn" style={{ marginTop: 8 }} onClick={closeCart}>Seguir viendo</button>
        </aside>
      </div>

      {checkout && <CheckoutModal onClose={() => setCheckout(false)} />}
    </>
  );
}
