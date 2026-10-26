# Práctica RWD vs. AWD

## Requisitos

- Node.js 18 o posterior.
- npm.

## Instalación y ejecución

```powershell
npm install
npm start
```

El servidor y la lógica JavaScript del catálogo están juntos en `public/server.js`. El CSS permanece en `public/styles.css`.

Abre `http://localhost:3000/responsive` para la versión RWD o `http://localhost:3000/adaptive` para la versión AWD. La ruta AWD elige la plantilla móvil o de escritorio usando el encabezado `User-Agent`.

También puedes abrir `public/index.html` con Go Live para probar la versión RWD; la búsqueda y los filtros de categoría y precio funcionan sin iniciar Node.js. La versión AWD sí requiere `npm start`.

## Pruebas

```powershell
npm test
```

## Auditoría pendiente de registrar

El reporte solicitado debe registrar para ambas rutas el tamaño del HTML, el peso total transferido, las solicitudes HTTP, LCP y CLS. Ejecuta Chrome DevTools con viewport móvil de 390 × 844, red Fast 3G y CPU slowdown de 4×; guarda capturas de Network y Lighthouse junto con los valores observados. No se incluyen cifras de ejemplo como si fueran mediciones reales.

La versión RWD y la plantilla AWD de escritorio incluyen imágenes del catálogo. La plantilla AWD móvil omite por completo las etiquetas `<img>` y `<picture>` del HTML inicial, evitando que el navegador solicite imágenes que no se mostrarán. Ocultarlas con `display: none` en CSS no evitaría la descarga, porque el navegador descubre los recursos al analizar el HTML.
