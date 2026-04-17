# RestaurantOS Presentation — Handoff

Sitio scroll-based para presentarle RestaurantOS a los directivos. Deploy en Vercel.

**Repo:** https://github.com/fractalshoot-lgtm/restaurant-os-presentation
**URL:** https://restaurant-os-presentation.vercel.app

## Stack

- Next.js 16.2.4 (App Router · static export con `output: "export"`)
- React 19 + TypeScript 5.7
- Tailwind CSS 4 (CSS-first via `@theme` en `globals.css`, sin config file)
- Framer Motion 11 para todas las animaciones
- `lucide-react` para íconos (mismos que la app real)
- Fuente: Karla vía `next/font/google`

## Estructura

```
app/
  layout.tsx     — Karla + SmoothScrollProvider wrapper
  page.tsx       — ensambla las 7 secciones
  globals.css    — tokens de diseño en @theme
components/
  sections/      — Hero · Problem · SolutionIntro · ModuleTour · ModuleSlide · BotSection · Benefits · CTA
  mockup/        — IphoneFrame · MockupModal · ZoomMarker (desktop) · NumberedDot (mobile) · Screen
  mockup/screens — DashboardScreen · TareasScreen · SemanaScreen · ProduccionScreen · FiltroScreen · WorkflowsScreen
  ui/            — SectionTitle · Stat
  SmoothScrollProvider.tsx — no-op + scroll-to-top on mount
lib/
  content.ts     — todo el copy en inglés
  demo-data.ts   — datos ficticios pulidos (tasks, nombres reales)
  tokens.ts      — paleta T{} + íconos de áreas
```

## Lo construido hoy

### Arquitectura inicial
- Scaffold Next.js + Tailwind 4 + Framer Motion
- Hero · Problem · SolutionIntro · ModuleTour (6 slides) · BotSection · Benefits · CTA
- Deploy a Vercel vía GitHub (fractalshoot-lgtm/restaurant-os-presentation)

### iPhone 16 Pro Max mockup
- `IphoneFrame` con width explícito en px (sin container queries — causaban bugs en iOS Safari)
- Interior 430×932 con transform-scale(width/430) desde top-left
- Bezel en gradiente + Dynamic Island + side buttons — mismo look en todas las breakpoints

### Sistema de zoom markers (doble tratamiento mobile/desktop)
- **Desktop (`ZoomMarker`)**: círculo pulsante en el target + línea horizontal dashed saliendo por el borde más cercano + label card fuera del phone
- **Mobile (`NumberedDot`)**: badges numerados clickeables a los costados del phone (fuera del área de tap), alineados verticalmente con el target
- Auto-detect del lado (right/left) basado en x < 215 → izquierda
- Labels en el 430×932 design space, cálculo de posición hecho en `MockupModal`

### Tap-to-enlarge modal
- `MockupModal`: overlay full-screen con backdrop blur
- Phone escalado a `min(430px, 90vw, 82vh/aspect)`
- Cuando se toca un número en mobile, el modal abre con un halo verde pulsando sobre el target + pill con el label
- Cuando se toca el phone en general, abre el modal completo sin highlight
- Escape/click fuera para cerrar

### Choreography de slides en desktop (ModuleSlideDesktop)
Secuencia scroll-triggered:
- 0.0–0.6s: texto aparece solo, escalado 1.14×, offset 8% hacia el centro
- 0.6–1.4s: pausa (texto domina)
- 1.4–2.2s: texto se encoge a su columna + phone entra desde scale 0.88
- 2.3–3.3s: zoom markers cascadean con stagger

### Choreography mobile (ModuleSlideMobile)
Simple: fade-in del texto → 0.1s después fade-in del phone → markers numerados entran staggered. Sin parallax.

### Screens rediseñados basados en el código real
Leí los archivos reales en `../restaurant-os/src/pages/*.jsx` y reescribí cada mockup:
- **DashboardScreen**: Full Week selector con today highlighted + Production Review card dark navy + 2×2 stat grid (ClipboardList/CheckCircle2/XCircle lucide) + SVG progress ring + By Area bars
- **TareasScreen**: "Shift Tasks" header con compliance badge color-coded + progress bar + cards con priority pill vertical + botón 48×48 (→/✓/✗)
- **SemanaScreen**: collapsible day cards con TODAY/PLAN badges + search con `Search` de lucide
- **ProduccionScreen**: Yes/No toggles + footer con Submit
- **FiltroScreen**: "✅ Completed today" + cards con borde izquierdo coloreado por prioridad + ↩ Revert pill
- **WorkflowsScreen**: "User Guide" con accordion + bloque dark con BOT COMMANDS

### BottomNav fiel al real
Barra navy #0F172A con botón verde circular elevado 56×56 en el centro (border navy 3px, shadow verde). Íconos ListChecks/Home/GitBranch de lucide. Agregada a Dashboard/Tareas/Semana/Filtro/Workflows. Produccion tiene su propio footer con Submit.

### Copy + design tokens
- Paleta app: `--color-bg #F8FAFC · --color-navy #0F172A · --color-accent #22C55E · --color-border #E2E8F0`
- Fuente Karla
- Benefits stats: quitamos "$0 platform cost", agregamos "Live · staff performance · Effective production time logged per person, per task"
- Hero eyebrow: "restaurant-os" (no uppercase, hyphen literal)

## Decisiones técnicas

- **Mobile y desktop separados** en ModuleSlide (`md:hidden` / `hidden md:block`). Intentar una versión única con responsive classes rompía ambas; una coreografía de 3 actos no funciona en un viewport de 390px.
- **Width fijo en px** para IphoneFrame en vez de container queries. Las container queries (`100cqw / 430`) fallaban en ciertas versiones de iOS Safari al primer paint — el 430×932 absoluto se rendereaba sin escalar y se metía en la siguiente sección.
- **Markers outside the scaled frame** con `phoneWidth` como prop. Antes los labels se escalaban junto con el phone y quedaban a 4.5px en móvil (ilegibles). Ahora se posicionan en px reales, tamaño de fuente fijo 11px.
- **`NumberedDot` para mobile** en vez de ZoomMarker. Labels horizontales se salían del viewport (390px) con labels > 13 caracteres. Los números afuera + halo en el modal resuelven tanto la visibilidad como la interacción.
- **No Lenis**. Smooth scroll con JS rompía el touch en iOS Safari (`html.lenis body { overflow: hidden }` bloqueaba el scroll nativo). Quitado; `scroll-behavior: smooth` nativo.
- **`overflow-x: clip` en body** en vez de `hidden`. Clip no crea scroll container y no bloquea el swipe-back de iOS.
- **`history.scrollRestoration = manual`** + `window.scrollTo(0,0)` on mount. Cada refresh aterriza en el hero, no donde estaba.
- **Next 16 en vez de 15**. Vercel bloqueaba el deploy de 15.1.4 por CVE-2025-66478.
- **Coords en 430×932** (design space). Cada screen component renderea dentro del bezel inset (14) + status padding (52), entonces el marcador en y=230 apunta a lo que se dibuja a esa y.

## Estado actual

- **Último commit con cambios visibles**: `3288c9e` docs: add CLAUDE.md with session handoff
- **En curso (sin push — pendiente de revisión visual la próxima sesión)**: shape-based markers
- Mockups coinciden con la app real
- BottomNav anclada correctamente al fondo, visible en 5 de 6 slides (Produccion tiene su propio Submit footer)
- Zoom markers rediseñados: ahora adoptan la forma del target (no puntos)

### En qué módulo estamos

**Módulo activo: ModuleSlide (mobile + desktop) + screens internos.**

Los slides ya tienen:
- Texto con coreografía correcta
- Phone mockup con estilo fiel al real
- Markers numerados que abren modal con highlight
- BottomNav anclada abajo

## Sesión 2 — shape-based markers (sin push aún)

### Qué cambió hoy

Petición del usuario: **"en los zoom marks en lugar de que sea un circulo me gustaría que se adoptara la forma de la tarjeta o botón en la app a la que se hace referencia"**.

Refactor de los markers para que en vez de un punto circular sobre el target, dibujen un **rectángulo redondeado calcando la forma de la tarjeta/botón real**.

### Archivos modificados (sin commit al momento de guardar)

- `components/mockup/ZoomMarker.tsx` — desktop marker pasa de círculo a rect. Pulse ahora es `box-shadow` animada (no deforma el rect). Línea dashed sale del borde lateral.
- `components/mockup/MockupModal.tsx` — halo del modal (mobile) también pasa a rect con mismo `w/h/radius`.
- `components/mockup/NumberedDot.tsx` — badge numerado se alinea al centro vertical del target (`y + h/2`).
- `components/sections/ModuleSlide.tsx` — tipo `Zoom` extendido con `w, h, radius?`. Mobile pasa shape al modal.
- `components/sections/ModuleTour.tsx` — los 16 markers recalibrados con `{ x, y, w, h, radius }` en design space 430×932.

### Ejemplo de la recalibración

Dashboard marker #3 (By area) pasó de `(90, 531)` punto → `(14, 600, 402×176, r=20)` tarjeta completa.

### Estado del commit

- Sin commit ni push aún: user quiere **revisar visualmente antes** en la próxima sesión.
- `npx tsc --noEmit` pasa sin errores.
- `tsconfig.tsbuildinfo` apareció untracked (artifact del type-check — ignorar o agregar a `.gitignore`).

## Qué sigue en la próxima sesión

### Prioridad alta
1. **Revisar los shape-based markers** — arrancar `npm run dev`, abrir cada slide (desktop + mobile modal):
   - Verificar que el rect calca bien la tarjeta/botón en los 6 slides
   - Ajustar `x, y, w, h, radius` donde no coincida
   - Decidir si commit + push o iterar más
2. **Verificar visualmente la coincidencia con la app real** — comparar contra screenshots reales, ajustar fuentes, padding, colores, posiciones.
3. **Verificar en device real** — iPhone físico y Android — que todo se vea bien.

### Prioridad media
4. **ProduccionScreen** — quedó del diseño viejo (área COLD PREP + 5 tasks + Submit), reescribir con el patrón real: sticky header con back + lock emoji, task cards con borde izquierdo coloreado según decisión, footer con name input + Submit verde, banner "🔒 Review completed" cuando está submitted.
5. **Hero iPhone** — considerar si se usa tilt o no, si los 2 variants (mobile 200 · desktop 340) son los correctos.
6. **BotSection** — el chat mockup es un div custom (no iPhone). Verificar que los bubbles de Telegram se vean bien.

### Nice-to-have
7. Agregar un **Before/After** comparativo en la sección Problem (WhatsApp chaos vs RestaurantOS clean).
8. **Logo custom** en el hero (actualmente solo texto "restaurant-os").
9. **OG image** (`public/og.png`) para compartir por link.
10. Revisar que la presentación cumpla **Lighthouse ≥ 90 Performance**.

### Bugs latentes conocidos
- Las coords actuales de los zoom markers asumen un layout que cambié. **Pueden estar desalineadas en 1-2 slides.** Verificar slide por slide al abrir modal + halo.
- En viewports <375px los labels de ZoomMarker desktop pueden overflow (edge case, raro).

## Referencias rápidas

```bash
# Dev
npm run dev        # localhost:3000
npm run build      # Next.js static export a out/

# Deploy
git push           # Vercel auto-deploys main
```

- App real (para seguir calibrando): `/Volumes/CORSAIR/0. Claude code/restaurant-os/src/pages/`
- Coords de markers: `components/sections/ModuleTour.tsx`
- Copy: `lib/content.ts`
- Tokens: `lib/tokens.ts` + `app/globals.css`
