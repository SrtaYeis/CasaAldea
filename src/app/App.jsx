import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CartProvider } from "../presentation/context/CartContext.jsx";
import Layout from "../presentation/components/Layout.jsx";
import CatalogPage from "../presentation/pages/CatalogPage.jsx";
import ProductPage from "../presentation/pages/ProductPage.jsx";
import NotFoundPage from "../presentation/pages/NotFoundPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<CatalogPage />} />
            <Route path="producto/:id" element={<ProductPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}
