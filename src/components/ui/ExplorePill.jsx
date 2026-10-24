import { ArrowUpRight } from './Icons.jsx';

/* The large "Explore More" pill with the dark circular arrow (Figma Group 25). */
export default function ExplorePill({ href, label = 'Explore More', tone = 'mint' }) {
  return (
    <a href={href} className={`explore-pill explore-pill--${tone}`}>
      <span className="explore-pill__label">{label}</span>
      <span className="explore-pill__dot" aria-hidden="true">
        <ArrowUpRight />
      </span>
    </a>
  );
}
