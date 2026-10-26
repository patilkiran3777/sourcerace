/**
 * Calendly popup widget, loaded on first use so it costs nothing until a visitor clicks.
 * Docs: https://help.calendly.com/hc/en-us/articles/223147027 (popup widget).
 */
const BASE = 'https://assets.calendly.com/assets/external/widget';
let loading;

function loadCalendly() {
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const css = document.createElement('link');
      css.rel = 'stylesheet';
      css.href = `${BASE}.css`;
      document.head.appendChild(css);

      const js = document.createElement('script');
      js.src = `${BASE}.js`;
      js.async = true;
      js.onload = () => (window.Calendly ? resolve(window.Calendly) : reject(new Error('Calendly missing')));
      js.onerror = () => { loading = null; reject(new Error('Calendly failed to load')); };
      document.head.appendChild(js);
    });
  }
  return loading;
}

/** Opens the booking popup; falls back to a new tab if the script can't load. */
export async function openCalendly(url) {
  try {
    const Calendly = await loadCalendly();
    Calendly.initPopupWidget({ url });
  } catch {
    window.open(url, '_blank', 'noopener');
  }
}
