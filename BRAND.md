# HusAI — Identidad de Marca

## Marca
- **Nombre:** HusAI
- **Tagline:** Transforming Data into Intelligence
- **Dominio canónico:** https://www.husai.com.co/
- **Descripción:** Soluciones de analítica de datos y chatbots impulsados por IA.

## Logos
Ubicación: `public/`
- `public/husai_logo_svg.svg` — logo principal (usado por `src/components/Logo.tsx`)
- `public/husai_logo_with_white_circle.svg` — variante con círculo blanco (favicon en `index.html`)

Componente React: `src/components/Logo.tsx` (renderiza `/husai_logo_svg.svg` con prop `size`, default 32px).

## Tipografía
Definida en `index.html` (Google Fonts) y `src/index.css`:
- **Principal (UI / headings):** Poppins (system-ui, sans-serif fallback)
- **Cargadas adicionalmente:** Antonio, Chivo 300

## Paleta de Colores
Definida en `tailwind.config.js`.

### Fondos / Superficies (dark)
| Token | Hex |
|---|---|
| `dark.background` | `#121212` |
| `dark.surface` | `#1E1E1E` |
| `dark.card` | `#2D2D2D` |
| `dark.modal` | `#333333` |
| `dark.border` | `#424242` |
| `dark.divider` | `#333333` |

### Texto
| Token | Hex |
|---|---|
| `text.primary` | `#FFFFFF` |
| `text.secondary` | `#E0E0E0` |
| `text.tertiary` | `#BDBDBD` |
| `text.disabled` | `#757575` |

### Púrpura (color de marca)
| Token | Hex |
|---|---|
| `purple.primary` | `#9C27B0` |
| `purple.hover` | `#AB47BC` |
| `purple.active` | `#7B1FA2` |
| `purple.secondary` | `#4A148C` |

### Estados
| Token | Hex |
|---|---|
| `status.success` | `#00C853` |
| `status.error` | `#FF1744` |
| `status.warning` | `#FFB300` |
| `status.info` | `#2196F3` |

## Estilo Visual
- Tema **dark-first** con acentos en púrpura `#9C27B0`.
- **Glassmorphism:** clases `.glass`, `.glass-card`, `.glass-button` (blur + bordes translúcidos) en `src/index.css`.
- **Navegación flotante:** `.floating-nav` (rounded 50px, shadow púrpura tenue).
- **Animaciones:** `glow`, `float`, `pulse` (3 anillos púrpura: `#9C27B0`, `#AB47BC`, `#4A148C`), `orbit`, `scroll` (marquee 30s), `fadeIn`.
- **Inputs:** `.input-field` con focus en `purple-primary`.

## Otros Assets
Ubicación: `public/`
- `galaxy.png`, `planet_image.avif`, `sky.png` — fondos espaciales (tema cósmico)
- `hand.png`, `Mapos.png`, `wa.png`
- `public/flags/` — banderas para selector de idioma (i18n: `src/i18n.ts`, `src/locales/`)

## SEO (de `index.html`)
- **Title:** HusAI - Transforming Data into Intelligence
- **Keywords:** HusAI, data analytics, AI solutions, machine learning, chatbot, business intelligence
