import { useId, useState } from 'react';
import { EMAIL_RE, subscribe } from '../../services/newsletter.js';

export default function NewsletterForm() {
  const id = useId();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: 'idle', msg: '' });

  const onSubmit = async (e) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return setStatus({ type: 'error', msg: 'Please enter your email address.' });
    if (!EMAIL_RE.test(value)) return setStatus({ type: 'error', msg: 'That email address doesn’t look right — please check it.' });
    setStatus({ type: 'loading', msg: 'Subscribing…' });
    try {
      await subscribe(value);
      setStatus({ type: 'success', msg: 'Thanks! You’re subscribed to SourceTrace updates.' });
      setEmail('');
    } catch (err) {
      setStatus(
        err.code === 'NOT_CONFIGURED'
          ? { type: 'error', msg: 'Subscriptions aren’t connected yet. Set VITE_NEWSLETTER_ENDPOINT to enable sign-ups.' }
          : { type: 'error', msg: 'Something went wrong. Please try again in a moment.' },
      );
    }
  };

  const invalid = status.type === 'error';
  return (
    <form className={`newsletter newsletter--${status.type}`} onSubmit={onSubmit} noValidate>
      <label className="sr-only" htmlFor={id}>Email address</label>
      <div className="newsletter__field">
        <input
          id={id}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); if (status.type !== 'idle') setStatus({ type: 'idle', msg: '' }); }}
          aria-invalid={invalid || undefined}
          aria-describedby={`${id}-msg`}
        />
        <button className="btn btn--primary newsletter__submit" type="submit" disabled={status.type === 'loading'}>
          <span className="btn__label">{status.type === 'loading' ? 'Sending' : 'Subscribe'}</span>
        </button>
      </div>
      <p className="newsletter__msg" id={`${id}-msg`} role={invalid ? 'alert' : 'status'} aria-live="polite">{status.msg}</p>
    </form>
  );
}
