export default function Stars({ value }) {
  return (
    <span className="rate" role="img" aria-label={`Calificación ${value.toFixed(1)} de 5`}>
      ★ {value.toFixed(1)}
    </span>
  );
}
