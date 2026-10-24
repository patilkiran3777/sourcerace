import { asset } from '../../data/asset.js';
/* Real SourceTrace wordmark exported from the Figma vector (sts-logo-active). */
export default function Logo({ className = '', width = 210 }) {
  return (
    <a href="/" className={`logo ${className}`} aria-label="SourceTrace home">
      <img src={asset('/brand/sourcetrace-logo.svg')} alt="SourceTrace" width={width} height={Math.round(width * 0.1764)} />
    </a>
  );
}
