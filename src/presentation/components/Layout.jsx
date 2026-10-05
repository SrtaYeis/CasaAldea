import { Link, Outlet, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../../domain/product/ProductCatalog.js";
import { useCart } from "../context/CartContext.jsx";
import CartDrawer from "./CartDrawer.jsx";

const scrollToProducts = () => {
  setTimeout(() => {
    document.getElementById("coleccion")?.scrollIntoView({ behavior: "smooth" });
  }, 50);
};

export default function Layout() {
  const { cart, openCart, open } = useCart();
  const navigate = useNavigate();

  const goCategory = (slug) => {
    navigate(`/?categoria=${slug}`);
    scrollToProducts();
  };

  return (
    <>
      <header className="top">
        <div className="bar">
          <nav aria-label="Categorías">
            {CATEGORIES.map((c) => (
              <button key={c.slug} className="nav-cat-btn" onClick={() => goCategory(c.slug)}>
                {c.label}
              </button>
            ))}
          </nav>
          <Link to="/" className="logo">Casa Aldea</Link>
          <button className="cart-btn" onClick={openCart}>Carrito ({cart.count})</button>
        </div>
      </header>
      <Outlet />
      <footer>
        <div className="bar foot">
          <div><strong className="logo sm">Casa Aldea</strong><p>Hogar con raíz. Taller en crecimiento.</p></div>
          <div><h4>Colección</h4>{CATEGORIES.map((c) => <Link key={c.slug} to={`/?categoria=${c.slug}`}>{c.label}</Link>)}</div>
          <div><h4>Ayuda</h4><span>Envíos</span><span>Cambios y devoluciones</span><span>Contacto</span></div>
          <p className="legal">© {new Date().getFullYear()} Casa Aldea · Demo con datos de DummyJSON</p>
        </div>
      </footer>
      {open && <CartDrawer />}
    </>
  );
}
