import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { catalog } from "../../app/container.js";
import { CATEGORIES, SORTS } from "../../domain/product/ProductCatalog.js";
import { useAsync } from "../hooks/useAsync.js";
import ProductCard from "../components/ProductCard.jsx";
import { ErrorBox, Skeletons } from "../components/AsyncState.jsx";
import muebleImg1 from "../../public/assets/muebles.jpg";
import muebleImg2 from "../../public/assets/muebles2.jpg";
import muebleImg3 from "../../public/assets/muebles3.jpg";

const HERO_IMGS = [muebleImg1, muebleImg2, muebleImg3];


export default function CatalogPage() {
  const { status, data, reload } = useAsync(() => catalog.listProducts(), []);
  const [params, setParams] = useSearchParams();
  const category = params.get("categoria");
  const [filters, setFilters] = useState({ query: "", sort: "default", onlyDiscount: false });
  const set = (patch) => setFilters((f) => ({ ...f, ...patch }));
  const shown = useMemo(
    () => (data ? catalog.browse(data, { ...filters, category }) : []),
    [data, filters, category]
  );
  const hero = data?.find((p) => p.category === "furniture");
  const pick = (slug) => setParams(slug ? { categoria: slug } : {});
  const [heroIdx, setHeroIdx] = useState(0);
  const [fade, setFade] = useState(true);
  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setHeroIdx((i) => (i + 1) % HERO_IMGS.length);
        setFade(true);
      }, 400);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <h1>Una casa en calma, con raíz en lo hecho a mano</h1>
          <p>Mobiliario, objetos y piezas de cocina elegidos por su materia y su oficio.</p>
          <a
            className="link-btn"
            href="#coleccion"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("coleccion")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Ver colección
          </a>
        </div>
        <div className="hero-media">
          <img
            src={HERO_IMGS[heroIdx]}
            alt="Muebles Casa Aldea"
            className="hero-img-cover"
            style={{ opacity: fade ? 1 : 0, transition: "opacity 0.4s ease" }}
          />
        </div>
      </section>

      <main className="wide" id="coleccion">
        <div className="tools">
          <div className="tabs" role="tablist" aria-label="Filtrar por categoría">
            <button role="tab" aria-selected={!category} onClick={() => pick(null)}>Todo</button>
            {CATEGORIES.map((c) => (
              <button key={c.slug} role="tab" aria-selected={category === c.slug} onClick={() => pick(c.slug)}>{c.label}</button>
            ))}
          </div>
          <div className="f">
            <input type="search" placeholder="Buscar" aria-label="Buscar" value={filters.query} onChange={(e) => set({ query: e.target.value })} />
            <select aria-label="Ordenar" value={filters.sort} onChange={(e) => set({ sort: e.target.value })}>
              {Object.entries(SORTS).map(([k, s]) => <option key={k} value={k}>{s.label}</option>)}
            </select>
            <label className="check">
              <input type="checkbox" checked={filters.onlyDiscount} onChange={(e) => set({ onlyDiscount: e.target.checked })} />
              Ofertas
            </label>
          </div>
        </div>
        {status === "ok" && <p className="count">{shown.length} {shown.length === 1 ? "producto" : "productos"}</p>}

        {status === "loading" && <Skeletons n={8} />}
        {status === "error" && <ErrorBox onRetry={reload} />}
        {status === "ok" && shown.length === 0 && <div className="msg"><p>No hay productos que coincidan. Prueba con otra palabra o quita los filtros.</p></div>}
        {status === "ok" && <div className="grid">{shown.map((p) => <ProductCard key={p.id} product={p} />)}</div>}
      </main>

      <section className="values">
        <div className="wide cols">
          <div><h3>Materia noble</h3><p>Maderas, cerámica y fibras elegidas por cómo envejecen, no solo por cómo se ven.</p></div>
          <div><h3>Taller propio</h3><p>Somos pocos y revisamos cada pieza a mano antes de que salga hacia tu casa.</p></div>
          <div><h3>Entrega cuidada</h3><p>Embalamos con protección para que llegue como salió del taller.</p></div>
        </div>
      </section>
    </>
  );
}
