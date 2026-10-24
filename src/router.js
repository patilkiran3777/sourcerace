/**
 * Minimal path-based routing (no router dependency). Pages are full loads,
 * so reading the pathname once per render is enough.
 */
export const currentPath = () =>
  (typeof window === 'undefined' ? '/' : window.location.pathname.replace(/\/+$/, '')) || '/';

const matches = (href, path) => href === path || (href !== '/' && path.startsWith(`${href}/`));

/** True when a nav item (or one of its children) points at the current page. */
export const isActive = (item, path = currentPath()) =>
  matches(item.href, path) || (item.children || []).some((c) => matches(c.href, path));
