# CLAUDE.md — CentraleSupélec Finance

## Projet

**CentraleSupélec Finance** est une association étudiante de CentraleSupélec dont la mission est de créer le lien entre les étudiants et le monde de la finance : networking, découverte des métiers, formations aux entretiens.

**Tagline :** *Built for Finance, shaped by CS*
**Email de contact :** contact@csfinance.fr
**Domaine :** csfinance.fr
**Déploiement :** Vercel (auto-deploy depuis `main`)

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js (App Router) |
| Langage | TypeScript (strict) |
| Styles | Tailwind CSS v4 |
| Animations | Framer Motion |
| CMS | Sanity v5 (Studio embarqué à `/studio`) |
| i18n | next-intl — locales : `fr` (défaut) et `en` |
| Formulaire contact | Resend API |
| Package manager | npm |

---

## Système de design

### Charte graphique
- Logo : structure de cubes isométriques, blanc sur fond sombre, géométrique et minimaliste
- Personnalité visuelle : corporate, éditorial, sérieux, clean — noir/blanc dominant

### Palette de couleurs
```css
--color-bg:             #1A1A1A   /* Charbon principal (fond dark) */
--color-surface:        #242424   /* Surfaces secondaires */
--color-surface-raised: #2E2E2E   /* Cartes, éléments élevés */
--color-text:           #FFFFFF   /* Texte principal */
--color-text-muted:     #A0A0A0   /* Texte secondaire */
--color-border:         #333333   /* Bordures subtiles */
```

### Typographie
- **Headlines :** Bold, grande échelle, sans-serif — Geist (déjà installé via next/font)
- **Body :** Regular, clean, 16–18px
- **Labels/taglines :** Italique pour les formules de marque

### Philosophie des animations (inspiration Apple)
- Reveals au scroll : fade + slide vers le haut en entrant dans le viewport
- Transitions de pages fluides avec Framer Motion `AnimatePresence`
- Micro-interactions au hover : scale et opacity subtils
- Toute animation sert la clarté — jamais gratuite
- Durées : 0.4–0.7s pour les reveals, 0.15–0.2s pour les micro-interactions
- Courbes : `easeOut` ou spring custom `{ stiffness: 100, damping: 20 }`

---

## Architecture du site

### Pages

| Route | Contenu |
|-------|---------|
| `/` | Homepage — hero, mission, 3 piliers (Événements / Formations / Réseau) |
| `/equipe` | Bureau — membres, rôles, photos |
| `/evenements` | Listing des événements + détail |
| `/partenaires` | Page partenaires — logos, tiers, pitch partenariat |
| `/contact` | Formulaire → contact@csfinance.fr via Resend |

### i18n
- Structure d'URL : `/fr/...` et `/en/...` via next-intl middleware
- Locale par défaut : `fr` (redirigée depuis `/`)
- Traductions dans `/messages/fr.json` et `/messages/en.json`
- Sélecteur de langue dans la Navbar
- Toutes les chaînes UI passent par les fichiers de traduction — jamais hardcodées dans les composants

### CMS (Sanity Studio)
Le studio est accessible à `/studio` (route exclue de l'i18n). Les membres de l'asso gèrent le contenu via cette interface sans toucher au code.

**Schémas Sanity :**
- `teamMember` : nom, rôle, photo, bio (fr + en), LinkedIn, ordre d'affichage
- `event` : titre (fr + en), date, description (fr + en), image, catégorie, lien d'inscription
- `partner` : nom, logo, tier (Gold / Silver / Bronze), URL, description (fr + en)
- `siteSettings` : textes de la homepage (hero, mission) en fr + en — pour éviter un redéploiement pour changer un texte

---

## Structure des fichiers

```
src/
├── app/
│   ├── [locale]/               # Routing i18n
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Homepage
│   │   ├── equipe/page.tsx
│   │   ├── evenements/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── partenaires/page.tsx
│   │   └── contact/page.tsx
│   ├── studio/
│   │   └── [[...tool]]/page.tsx  # Sanity Studio (pas de locale)
│   ├── api/
│   │   └── contact/route.ts    # Endpoint Resend
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── ui/                     # Primitives réutilisables (Button, Card...)
│   └── sections/               # Sections de pages (Hero, TeamGrid...)
├── lib/
│   ├── sanity/
│   │   ├── client.ts
│   │   ├── queries.ts
│   │   └── schemas/
│   └── resend.ts
├── messages/
│   ├── fr.json
│   └── en.json
└── types/                      # Types partagés
```

---

## Conventions de code

### TypeScript
- Strict mode activé — pas de `any` ni de `@ts-ignore` sans commentaire justificatif
- Interfaces de props nommées `[NomComposant]Props`
- Préférer `type` pour les formes simples, `interface` pour les objets extensibles
- Typer explicitement les retours de fonctions async et les props de composants

### Composants
- Un composant par fichier, export nommé (pas de default export)
- Composants petits et ciblés — splitter au-delà de ~100 lignes
- Types spécifiques au composant colocalisés dans le même fichier
- Sections de page dans `/sections/`, primitives réutilisables dans `/ui/`

### CSS / Tailwind
- Classes utilitaires Tailwind uniquement — pas de CSS custom sauf absolue nécessité
- Pas de styles inline
- Design tokens via variables CSS Tailwind v4 définis dans `globals.css`
- Mobile-first (`sm:`, `md:`, `lg:`, `xl:`)
- Pas de classes magiques ou hardcodées — utiliser les tokens du design system

### Nommage de fichiers
- Composants : `PascalCase.tsx`
- Pages : `page.tsx` (convention Next.js)
- Hooks/utilitaires : `camelCase.ts`
- Types : `PascalCase.ts`
- Schémas Sanity : `camelCase.ts`

### Imports
- Alias `@/` → `src/`
- Ordre : externes → internes `@/` → relatifs, séparés par une ligne vide

---

## Variables d'environnement

Voir `.env.example` pour la liste complète. Ne jamais committer `.env.local`.

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=           # Server-only, lecture/écriture pour les webhooks

# Resend
RESEND_API_KEY=

# App
NEXT_PUBLIC_SITE_URL=https://csfinance.fr
```

---

## SEO & Performance

- Chaque page expose ses métadonnées via `generateMetadata()` de Next.js
- Images : toujours `next/image` avec `alt` descriptif
- Fonts : chargées via `next/font` (Geist déjà configuré)
- Contenu disponible au build → SSG/ISR, pas de fetch client-side
- Cibler : LCP < 2.5s, CLS < 0.1, FID < 100ms
- `sitemap.xml` et `robots.txt` générés automatiquement
- Open Graph tags pour le partage réseaux sociaux

---

## Ce qu'il ne faut PAS faire

- Pas de console admin (supprimée intentionnellement) ni de système d'auth sur le site public
- Pas de dépendances inutiles — garder le bundle léger
- Pas de contenu hardcodé qui devrait être dans le CMS ou les fichiers de traduction
- Pas de `// TODO` dans le code — créer une issue GitHub ou régler le problème immédiatement
- Pas de blocs de code commentés laissés en place
- Pas de `!important` dans les styles
- Jamais bypasser TypeScript sans justification commentée
- Pas de `console.log` laissés en production

---

## Workflow de développement

Voir `docs/git-conventions.md` pour les conventions Git détaillées.

```bash
npm run dev      # Serveur de dev local
npm run build    # Build de production
npm run lint     # ESLint
```

*Mis à jour : mars 2026*
