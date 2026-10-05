# Casa Aldea · tienda de muebles (demo)

React + Vite. Datos de https://dummyjson.com (categorías furniture, home-decoration y kitchen-accessories), sin backend.

    npm install
    npm run dev      # http://localhost:5173
    npm run build

## Arquitectura (DDD por capas)

Las dependencias apuntan hacia adentro: presentation → application → domain. infrastructure implementa los puertos del dominio.

    src/
      domain/          Reglas de negocio puras (sin React, sin fetch)
        product/       Product (entidad), ProductCatalog (búsqueda/orden), ProductRepository (puerto)
        cart/          Cart (agregado inmutable)
      application/     Casos de uso que orquestan el dominio
        catalog/       listar, obtener y explorar productos
        cart/          agregar, cambiar cantidad, vaciar (persistiendo)
      infrastructure/  Adaptadores a servicios externos
        dummyjson/     Repositorio HTTP + mapper API → Product
        storage/       Carrito en localStorage
      presentation/    React: páginas, componentes, hooks, contexto, estilos
      app/             Composición: container (inyección de dependencias), rutas
      shared/          Utilidades transversales

Para cambiar la fuente de datos (API propia, otro proveedor) solo se escribe un nuevo repositorio en `infrastructure/` y se enchufa en `app/container.js`.
