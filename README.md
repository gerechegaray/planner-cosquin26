# Planner Cosquín Rock 2026 – Web

Misma lógica que el Excel: elegí bandas, ves tu cronograma con conflictos y recomendaciones. Optimizado para mobile.

## Cómo abrirlo en tu compu

1. Abrí `index.html` con doble clic (se abre en el navegador).
2. O arrastrá `index.html` al Chrome/Edge/Firefox.

---

## Cómo subirlo para compartir (paso a paso)

### Opción A: GitHub Pages (gratis)

1. **Creá una cuenta en GitHub**  
   Entrá a [github.com](https://github.com) y registrate si no tenés cuenta.

2. **Creá un repositorio nuevo**  
   - Clic en "+" → "New repository"
   - Nombre: por ejemplo `cosquin-planner` o `cosquinrock2026`
   - Dejalo público (Public)
   - No marques "Add a README"
   - Clic en "Create repository"

3. **Subí los archivos**  
   En la carpeta `web` de este proyecto tenés: `index.html`, `styles.css`, `app.js`, `README.md`.  
   - Clic en "uploading an existing file"
   - Arrastrá esos 4 archivos (o la carpeta `web` entera) al área de subida
   - Clic en "Commit changes"

4. **Activá GitHub Pages**  
   - Settings → Pages (menú izquierdo)
   - En "Source" elegí "Deploy from a branch"
   - En "Branch" elegí `main` y carpeta `/ (root)`
   - Save

5. **Esperá unos minutos** y entrá a:  
   `https://tu-usuario.github.io/cosquin-planner/`  
   (reemplazá `tu-usuario` y `cosquin-planner` por tu usuario y nombre del repo)

---

### Opción B: Netlify (gratis, más rápido)

1. **Entrá a [netlify.com](https://netlify.com)**  
   Creá cuenta con GitHub, email o Google.

2. **Arrastrá la carpeta**  
   - En el panel: "Add new site" → "Deploy manually"
   - Arrastrá la carpeta `web` completa a la zona de drop
   - Netlify sube los archivos y te da una URL tipo:  
     `https://random-name-123.netlify.app`

3. **(Opcional) Cambiar el nombre**  
   - Site settings → Change site name → poné algo como `cosquin-rock-2026`

---

## Pestañas

- **Mi cronograma:** Día 1 / Día 2, lista de bandas por escenario, checkboxes. Tu cronograma se arma solo con conflictos y recomendaciones. Exportá PDF para tenerlo sin conexión.
- **Mapa:** Adjuntá una imagen del mapa del predio (se guarda en tu navegador).

## Archivos

- `index.html` – estructura y pestañas
- `styles.css` – estilos (tema oscuro, rockero, mobile)
- `app.js` – datos, lógica y render
