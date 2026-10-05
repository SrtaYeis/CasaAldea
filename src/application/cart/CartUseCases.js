import { Cart } from "../../domain/cart/Cart.js";

export function makeCartUseCases(cartRepository) {
  const persist = (cart) => (cartRepository.save(cart), cart);
  return {
    load: () => Cart.fromPlain(cartRepository.load()),
    addProduct: (cart, product) => persist(cart.add(product)),
    changeQuantity: (cart, id, delta) => persist(cart.changeQuantity(id, delta)),
    clear: () => persist(new Cart()),
  };
}
