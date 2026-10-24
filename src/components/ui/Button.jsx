import { ArrowRight } from './Icons.jsx';

/**
 * Pill CTA from the Figma "Link" component (64px tall, 45px radius, uppercase label).
 * variant: primary (lime→green gradient) | outline-light (white stroke) | outline-gradient
 */
export default function Button({ href, children, variant = 'primary', icon = true, className = '', as, ...rest }) {
  const Tag = as || (href ? 'a' : 'button');
  return (
    <Tag href={href} className={`btn btn--${variant} ${className}`} {...rest}>
      <span className="btn__label">{children}</span>
      {icon && (
        <span className="btn__icon" aria-hidden="true">
          <ArrowRight />
          <ArrowRight />
        </span>
      )}
    </Tag>
  );
}
