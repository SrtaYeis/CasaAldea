import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="wrap msg">
      <h1>No encontramos esa página</h1>
      <p className="muted">Puede que el enlace haya cambiado.</p>
      <Link className="btn dark" to="/">Ir al catálogo</Link>
    </main>
  );
}
