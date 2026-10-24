import { asset } from '../../data/asset.js';
import { footer, social } from '../../data/content.js';
import Button from '../ui/Button.jsx';
import { SocialIcon } from '../ui/Icons.jsx';
import NewsletterForm from './NewsletterForm.jsx';
import useSectionReveal from '../../hooks/useSectionReveal.js';
import '../../styles/layout/footer.css';

export default function Footer() {
  const ref = useSectionReveal();
  return (
    <footer className="footer" ref={ref}>
      <div className="container">
        <div className="footer__top" data-reveal-group="">
          <div className="footer__news">
            <h2 className="footer__head">Newsletter</h2>
            <NewsletterForm />
          </div>
          <div className="footer__social">
            <h2 className="footer__head">Our Social Media</h2>
            <ul>
              {social.map((s) => (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noreferrer"><SocialIcon id={s.id} /> {s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="footer__rule" data-reveal-line="" />

        <div className="footer__main">
          <div className="footer__brand" data-reveal="">
            <a href="/" className="footer__logo" aria-label="SourceTrace home">
              <img src={asset('/brand/sourcetrace-logo.svg')} alt="SourceTrace" width="517" height="91" loading="lazy" />
            </a>
            {footer.about.map((p) => <p key={p}>{p}</p>)}
            <Button href={footer.contact.href} icon={false}>{footer.contact.label}</Button>
          </div>

          <nav className="footer__cols" aria-label="Footer" data-reveal-group="">
            {footer.columns.map((col) => (
              <div key={col.title} className="footer__col">
                <h2 className="footer__head">{col.title}</h2>
                <ul>
                  {col.links.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <hr className="footer__rule footer__rule--bottom" data-reveal-line="" />
        <p className="footer__copy">{footer.copyright}</p>
      </div>
    </footer>
  );
}
