# Quad Host. — App del anfitrión

Parte del **anfitrión** de Quad, programada en **React + JavaScript** con **Vite**, a partir del archivo de Figma *Quad App*.

La app del estudiante vive en otro repositorio: <https://github.com/valssse/quad> (página: <https://valssse.github.io/quad/>).

## Flujo

`Onboarding de anfitrión (A01–A22)` → `Panel del anfitrión` (Inicio · Mis quads · Inquilinos · Mensajes · Perfil).

Se llega desde la app del estudiante al elegir **Ofrezco un Quad** en *¿Cómo usarás Quad?* (o desde *Perfil → Cambia a modo anfitrión*).
También se puede abrir directo el panel: `#/host/inicio`.

## Cómo correrlo

```bash
npm install
npm run dev      # servidor local
npm run build    # compilar
npm run deploy   # publicar en GitHub Pages (rama gh-pages)
```

Página publicada: <https://valssse.github.io/Quad-Host/>

> Todo es simulado en memoria: no hay base de datos ni servidor.
