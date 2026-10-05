import { createContext, useContext, useMemo, useState } from "react";
import { cartUseCases } from "../../app/container.js";

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => cartUseCases.load());
  const [open, setOpen] = useState(false);
  const value = useMemo(
    () => ({
      cart, open,
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
      add: (p) => { setCart((c) => cartUseCases.addProduct(c, p)); setOpen(true); },
      change: (id, d) => setCart((c) => cartUseCases.changeQuantity(c, id, d)),
      clear: () => setCart(cartUseCases.clear()),
    }),
    [cart, open]
  );
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
