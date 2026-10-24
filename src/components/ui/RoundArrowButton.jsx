import { ArrowLong } from './Icons.jsx';

/* 79×56 gradient-outlined pill used for card links and carousel controls. */
export default function RoundArrowButton({ direction = 'next', label, href, onClick, disabled }) {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      onClick={onClick}
      disabled={Tag === 'button' ? disabled : undefined}
      aria-label={label}
      className={`round-arrow round-arrow--${direction}`}
      type={Tag === 'button' ? 'button' : undefined}
    >
      <ArrowLong width={22} />
    </Tag>
  );
}
