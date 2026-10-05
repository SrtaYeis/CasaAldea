import { useState } from "react";
import { money } from "../../shared/format.js";
import { useCart } from "../context/CartContext.jsx";

const STEPS = ["Envío", "Pago", "Confirmación"];

const initialForm = {
  nombre: "",
  apellido: "",
  email: "",
  telefono: "",
  direccion: "",
  ciudad: "",
  estado: "",
  cp: "",
  cardNumber: "",
  cardName: "",
  cardExpiry: "",
  cardCvv: "",
};

function formatCardNumber(v) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
}
function formatExpiry(v) {
  const d = v.replace(/\D/g, "").slice(0, 4);
  return d.length >= 3 ? d.slice(0, 2) + "/" + d.slice(2) : d;
}

export default function CheckoutModal({ onClose }) {
  const { cart, clear, closeCart } = useCart();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const validateStep0 = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.apellido.trim()) e.apellido = "Requerido";
    if (!form.email.includes("@")) e.email = "Email inválido";
    if (!form.direccion.trim()) e.direccion = "Requerido";
    if (!form.ciudad.trim()) e.ciudad = "Requerido";
    if (!form.cp.trim()) e.cp = "Requerido";
    return e;
  };

  const validateStep1 = () => {
    const e = {};
    if (form.cardNumber.replace(/\s/g, "").length < 16) e.cardNumber = "Número inválido";
    if (!form.cardName.trim()) e.cardName = "Requerido";
    if (form.cardExpiry.length < 5) e.cardExpiry = "Fecha inválida";
    if (form.cardCvv.length < 3) e.cardCvv = "CVV inválido";
    return e;
  };

  const next = () => {
    if (step === 0) {
      const e = validateStep0();
      if (Object.keys(e).length) { setErrors(e); return; }
    }
    if (step === 1) {
      const e = validateStep1();
      if (Object.keys(e).length) { setErrors(e); return; }
    }
    setStep((s) => s + 1);
  };

  const finish = () => {
    clear();
    closeCart();
    onClose();
  };

  return (
    <div className="co-overlay" onClick={onClose}>
      <div className="co-modal" role="dialog" aria-modal="true" aria-label="Checkout" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="co-header">
          <span className="co-brand">Casa Aldea</span>
          <button className="co-close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        {/* Stepper */}
        <div className="co-stepper">
          {STEPS.map((s, i) => (
            <div key={s} className={`co-step ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}>
              <div className="co-step-dot">{i < step ? "✓" : i + 1}</div>
              <span>{s}</span>
              {i < STEPS.length - 1 && <div className="co-step-line" />}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="co-body">
          {step === 0 && (
            <div className="co-section">
              <h2 className="co-title">Información de envío</h2>
              <div className="co-grid2">
                <Field label="Nombre" error={errors.nombre}>
                  <input id="co-nombre" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Ana" />
                </Field>
                <Field label="Apellido" error={errors.apellido}>
                  <input id="co-apellido" value={form.apellido} onChange={(e) => set("apellido", e.target.value)} placeholder="García" />
                </Field>
              </div>
              <Field label="Correo electrónico" error={errors.email}>
                <input id="co-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="ana@email.com" />
              </Field>
              <Field label="Teléfono" error={errors.telefono}>
                <input id="co-telefono" type="tel" value={form.telefono} onChange={(e) => set("telefono", e.target.value)} placeholder="55 1234 5678" />
              </Field>
              <Field label="Dirección" error={errors.direccion}>
                <input id="co-direccion" value={form.direccion} onChange={(e) => set("direccion", e.target.value)} placeholder="Calle, número, colonia" />
              </Field>
              <div className="co-grid3">
                <Field label="Ciudad" error={errors.ciudad}>
                  <input id="co-ciudad" value={form.ciudad} onChange={(e) => set("ciudad", e.target.value)} placeholder="Ciudad de México" />
                </Field>
                <Field label="Estado" error={errors.estado}>
                  <input id="co-estado" value={form.estado} onChange={(e) => set("estado", e.target.value)} placeholder="CDMX" />
                </Field>
                <Field label="Código postal" error={errors.cp}>
                  <input id="co-cp" value={form.cp} onChange={(e) => set("cp", e.target.value)} placeholder="06600" />
                </Field>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="co-section">
              <h2 className="co-title">Método de pago</h2>
              <div className="co-card-preview">
                <div className="co-card-chip" />
                <div className="co-card-number">{form.cardNumber || "•••• •••• •••• ••••"}</div>
                <div className="co-card-row">
                  <div>
                    <div className="co-card-label">Titular</div>
                    <div className="co-card-val">{form.cardName || "TU NOMBRE"}</div>
                  </div>
                  <div>
                    <div className="co-card-label">Vence</div>
                    <div className="co-card-val">{form.cardExpiry || "MM/AA"}</div>
                  </div>
                </div>
              </div>

              <Field label="Número de tarjeta" error={errors.cardNumber}>
                <input
                  id="co-card-number"
                  value={form.cardNumber}
                  onChange={(e) => set("cardNumber", formatCardNumber(e.target.value))}
                  placeholder="1234 5678 9012 3456"
                  inputMode="numeric"
                />
              </Field>
              <Field label="Nombre en la tarjeta" error={errors.cardName}>
                <input
                  id="co-card-name"
                  value={form.cardName}
                  onChange={(e) => set("cardName", e.target.value.toUpperCase())}
                  placeholder="ANA GARCIA"
                />
              </Field>
              <div className="co-grid2">
                <Field label="Fecha de vencimiento" error={errors.cardExpiry}>
                  <input
                    id="co-card-expiry"
                    value={form.cardExpiry}
                    onChange={(e) => set("cardExpiry", formatExpiry(e.target.value))}
                    placeholder="MM/AA"
                    inputMode="numeric"
                  />
                </Field>
                <Field label="CVV" error={errors.cardCvv}>
                  <input
                    id="co-card-cvv"
                    value={form.cardCvv}
                    onChange={(e) => set("cardCvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="123"
                    inputMode="numeric"
                    type="password"
                  />
                </Field>
              </div>
              <p className="co-secure">🔒 Pago simulado — ningún dato es procesado ni almacenado.</p>
            </div>
          )}

          {step === 2 && (
            <div className="co-section co-confirm">
              <div className="co-check-circle">✓</div>
              <h2 className="co-title">¡Pedido confirmado!</h2>
              <p className="co-confirm-msg">
                Gracias, <strong>{form.nombre}</strong>. Recibirás un correo de confirmación en <strong>{form.email}</strong> con el seguimiento de tu pedido.
              </p>
              <div className="co-summary-box">
                <div className="co-summary-title">Resumen del pedido</div>
                {cart.lines.map((l) => (
                  <div className="co-summary-line" key={l.productId}>
                    <span>{l.title} × {l.quantity}</span>
                    <span>{money(l.unitPrice * l.quantity)}</span>
                  </div>
                ))}
                <div className="co-summary-total">
                  <span>Total pagado</span>
                  <strong>{money(cart.total)}</strong>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="co-footer">
          {step < 2 && (
            <div className="co-footer-total">
              <span>Total</span>
              <strong>{money(cart.total)}</strong>
            </div>
          )}
          <div className="co-footer-actions">
            {step > 0 && step < 2 && (
              <button className="co-btn-ghost" onClick={() => setStep((s) => s - 1)}>← Volver</button>
            )}
            {step < 2 && (
              <button className="co-btn-primary" onClick={next}>
                {step === 0 ? "Continuar al pago" : "Confirmar pedido"}
              </button>
            )}
            {step === 2 && (
              <button className="co-btn-primary" onClick={finish}>Cerrar</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div className={`co-field ${error ? "has-error" : ""}`}>
      <label className="co-label">{label}</label>
      {children}
      {error && <span className="co-error">{error}</span>}
    </div>
  );
}
