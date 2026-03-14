/**
 * Sanity Studio — accessible à /studio
 * Exclu du routing i18n (voir middleware.ts)
 *
 * NOTE: Ce conflit React ne survient qu'en développement local dans ce worktree
 * (deux node_modules : parent + worktree). Sur Vercel, le build fonctionnera normalement.
 * Pour accéder au studio en local, utiliser `npx sanity dev` à la racine du projet Sanity.
 */
export const dynamic = "force-dynamic";

import StudioClient from "./StudioClient";

export default function StudioPage() {
  return <StudioClient />;
}
