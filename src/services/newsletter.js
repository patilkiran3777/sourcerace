/**
 * Newsletter integration point.
 * Set VITE_NEWSLETTER_ENDPOINT in a .env file (e.g. a Mailchimp/HubSpot/Brevo
 * form endpoint or your own API). It receives a JSON POST: { email }.
 * Without it, the form validates but reports that the service isn't connected —
 * it never pretends to have subscribed anyone.
 */
const ENDPOINT = import.meta.env.VITE_NEWSLETTER_ENDPOINT;

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function subscribe(email) {
  if (!ENDPOINT) {
    const err = new Error('not-configured');
    err.code = 'NOT_CONFIGURED';
    throw err;
  }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return true;
}
