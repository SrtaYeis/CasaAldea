export function Skeletons({ n = 8 }) {
  return <div className="grid">{Array.from({ length: n }, (_, i) => <div className="skel tall" key={i} />)}</div>;
}

export function ErrorBox({ onRetry }) {
  return (
    <div className="msg">
      <p>No pudimos cargar los datos. Revisa tu conexión e inténtalo de nuevo.</p>
      <button className="btn dark" onClick={onRetry}>Reintentar</button>
    </div>
  );
}
