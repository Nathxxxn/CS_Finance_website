import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

// Returns empty results when Sanity is not configured (e.g. during initial setup or CI)
const isSanityConfigured = Boolean(projectId);

export const sanityClient = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion: "2024-01-01",
  useCdn: true,
});

export const sanityWriteClient = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

/**
 * Safe fetch: returns an empty array/null when Sanity is not configured,
 * rather than throwing at build time.
 */
export async function safeFetch<T>(query: string, params?: Record<string, unknown>): Promise<T[]> {
  if (!isSanityConfigured) return [];
  return sanityClient.fetch<T[]>(query, params ?? {}).catch(() => []);
}

export async function safeFetchOne<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  if (!isSanityConfigured) return null;
  return sanityClient.fetch<T | null>(query, params ?? {}).catch(() => null);
}
