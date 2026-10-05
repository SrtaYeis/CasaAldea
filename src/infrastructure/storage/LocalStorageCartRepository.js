const KEY = "casa-aldea:cart";

export class LocalStorageCartRepository {
  load() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) ?? [];
    } catch {
      return [];
    }
  }
  save(cart) {
    try {
      localStorage.setItem(KEY, JSON.stringify(cart.lines));
    } catch {
      /* almacenamiento no disponible: el carrito sigue en memoria */
    }
  }
}
