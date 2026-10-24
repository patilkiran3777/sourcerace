/**
 * Resolves a /public asset path. The offline single-file preview (preview.html)
 * injects window.__ST_ASSETS with inlined copies; the normal build uses the path as-is.
 */
export const asset = (path) => (typeof window !== 'undefined' && window.__ST_ASSETS?.[path]) || path;
