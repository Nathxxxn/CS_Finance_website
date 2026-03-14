# Conventions Git — CentraleSupélec Finance

## Stratégie de branches

```
main          → production (auto-deploy Vercel)
dev           → branche d'intégration (toujours stable)
feature/*     → nouvelles fonctionnalités
fix/*         → corrections de bugs
style/*       → changements visuels/CSS sans logique
chore/*       → maintenance (dépendances, config, nettoyage)
content/*     → contenu, schémas Sanity, traductions
docs/*        → documentation uniquement
```

**Règles :**
- Ne jamais committer directement sur `main`
- Toujours passer par une PR `feature/* → dev`, puis `dev → main` quand stable
- Supprimer la branche après merge

---

## Format des commits

Nous suivons la convention **Conventional Commits** :

```
<type>(<scope>): <description courte en français>

[corps optionnel — explication du pourquoi si nécessaire]
```

### Types

| Type | Usage |
|------|-------|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `style` | Changements visuels / CSS (sans changement de logique) |
| `refactor` | Restructuration de code (comportement inchangé) |
| `chore` | Dépendances, config, outillage |
| `docs` | Documentation |
| `perf` | Amélioration de performance |
| `i18n` | Traductions, fichiers messages |
| `content` | Schémas Sanity, données de contenu |
| `seo` | Métadonnées, sitemap, robots |

### Scopes (optionnels mais recommandés)

`navbar`, `footer`, `homepage`, `equipe`, `evenements`, `partenaires`, `contact`, `sanity`, `i18n`, `animations`, `seo`, `api`

### Exemples

```
feat(evenements): ajouter la page détail d'un événement avec données Sanity

fix(navbar): corriger l'état du lien actif lors du changement de locale

style(homepage): ajuster l'espacement de la section hero sur mobile

chore: mettre à jour Framer Motion vers v12

i18n: ajouter les traductions anglaises de la page équipe

content(sanity): ajouter le champ "tier" au schéma partner

seo: générer sitemap.xml dynamique depuis les routes Next.js
```

### Règles

- Description courte : impératif, minuscules, pas de point final, max 72 caractères
- Pas de `fix: fix bug` — être précis sur ce qui est corrigé
- Corps uniquement si la description ne suffit pas à comprendre le "pourquoi"
- Un commit = une chose logique — ne pas mélanger feat + refactor

---

## Workflow PR

1. Créer une branche depuis `dev` : `git checkout -b feature/nom-feature`
2. Développer en commits atomiques et conventionnels
3. Pousser et ouvrir une PR vers `dev`
4. Relire sa propre PR avant de merger
5. Squash merge dans `dev` si la branche a des commits de travail brouillons
6. Merge `dev → main` une fois la feature stable et testée

---

## Versioning

Pas de versioning sémantique formel pour ce projet. On suit la progression par features déployées sur `main`.

---

*Mis à jour : mars 2026*
