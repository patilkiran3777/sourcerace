/* Icons traced from the Figma vectors (arrow, leaf "envira", quote, plus, angle). */
const base = { 'aria-hidden': true, focusable: false };

export const ArrowRight = ({ size = 17, ...p }) => (
  <svg {...base} width={size} height={size} viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M3.5 8.5h10M9.5 4.5l4 4-4 4" />
  </svg>
);

export const ArrowLong = ({ width = 38, ...p }) => (
  <svg {...base} width={width} height="12" viewBox="0 0 38 12" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" {...p}>
    <path d="M1 6h35M31 1l5 5-5 5" />
  </svg>
);

export const ArrowUpRight = ({ size = 38, ...p }) => (
  <svg {...base} width={size} height={size} viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" {...p}>
    <path d="M6 32L32 6M14 6h18v18" />
  </svg>
);

export const Leaf = ({ size = 18, ...p }) => (
  <svg {...base} width={size} height={size} viewBox="0 0 18.2 18.2" fill="currentColor" {...p}>
    <path transform="translate(1.14 1.14)" d="M0 0C16.989 0 13.04 11.287 13.058 13.03L15.936 15.936H15.011L12.507 13.403C11.12 13.553 8.082 14.63 4.88 12.087 1.672 9.544 1.85 6.499 0 0ZM2.835 1.636C1.067.8 2.65 1.964 2.65 1.964 4.258 3.073 4.998 4.585 5.859 6.228 6.979 8.37 8.669 11.198 10.988 12.194 13.3 13.19 12.204 12.638 11.201 11.891 10.198 11.137 8.775 8.797 7.964 7.26 6.837 5.126 5.795 3.041 2.835 1.636Z" />
  </svg>
);

export const AngleRight = ({ size = 25, ...p }) => (
  <svg {...base} width={size} height={size} viewBox="0 0 25 25" fill="currentColor" {...p}>
    <path transform="translate(7.46 4.69)" d="M9.744 8.645L3.103 15.286C2.644 15.745 1.902 15.745 1.448 15.286L.344 14.182C-.115 13.723-.115 12.981.344 12.527L5.051 7.82.344 3.113C-.115 2.654-.115 1.912.344 1.458L1.443.344C1.902-.115 2.644-.115 3.098.344L9.739 6.985C10.203 7.444 10.203 8.186 9.744 8.645Z" />
  </svg>
);

export const ChevronDown = ({ size = 12, ...p }) => (
  <svg {...base} width={size} height={size} viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
    <path d="M1.5 1.75L6 6.25l4.5-4.5" />
  </svg>
);

export const PlusMinus = ({ open, size = 16 }) => (
  <svg {...base} width={size} height={size} viewBox="0 0 16 16" fill="currentColor" className="pm-icon">
    <rect x="1" y="6.4" width="14" height="3.2" rx="1" />
    <rect className="pm-icon__v" x="6.4" y="1" width="3.2" height="14" rx="1" style={{ transform: open ? 'scaleY(0)' : 'none' }} />
  </svg>
);

export const QuoteMark = (p) => (
  <svg {...base} width="75" height="64" viewBox="0 0 75 64" {...p}>
    <path fill="var(--c-lime)" fillOpacity=".56" d="M3.956 63.864L9.308 33.299H0V0h31.182v34.044l-8.145 29.82H3.956zm43.747 0l5.352-30.565h-9.308V0h31.182v34.044l-8.144 29.82H47.703z" />
  </svg>
);

export const YouTubePlay = (p) => (
  <svg {...base} viewBox="0 0 87 61" {...p}>
    <path fill="#E80404" d="M85.2 9.5A10.9 10.9 0 0077.5 1.8C70.7 0 43.5 0 43.5 0S16.3 0 9.5 1.8A10.9 10.9 0 001.8 9.5C0 16.3 0 30.5 0 30.5s0 14.2 1.8 21a10.9 10.9 0 007.7 7.7c6.8 1.8 34 1.8 34 1.8s27.2 0 34-1.8a10.9 10.9 0 007.7-7.7c1.8-6.8 1.8-21 1.8-21s0-14.2-1.8-21z" />
    <path fill="#fff" d="M34.6 43.5V17.5l22.7 13-22.7 13z" />
  </svg>
);

export const SocialIcon = ({ id, size = 19, ...p }) => {
  const paths = {
    facebook: <path d="M13.5 3.5h-2a3.5 3.5 0 00-3.5 3.5v2.5H6v3h2v6.5h3V12.5h2.3l.7-3h-3V7.3c0-.5.4-.8.8-.8h1.7z" />,
    instagram: (
      <>
        <rect x="2.5" y="2.5" width="14" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="9.5" cy="9.5" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="13.6" cy="5.4" r=".9" />
      </>
    ),
    x: <path d="M3 3h4.2l3.3 4.6L14.3 3h1.6l-4.7 5.6L16.5 16h-4.2l-3.6-5-4.2 5H3l5-6L3 3zm2.3 1.2l7.6 10.6h1.3L6.6 4.2H5.3z" />,
    youtube: <path d="M17.1 5.6a2.1 2.1 0 00-1.5-1.5C14.3 3.8 9.5 3.8 9.5 3.8s-4.8 0-6.1.3A2.1 2.1 0 001.9 5.6C1.6 6.9 1.6 9.5 1.6 9.5s0 2.6.3 3.9a2.1 2.1 0 001.5 1.5c1.3.3 6.1.3 6.1.3s4.8 0 6.1-.3a2.1 2.1 0 001.5-1.5c.3-1.3.3-3.9.3-3.9s0-2.6-.3-3.9zM7.9 12V7l4.1 2.5L7.9 12z" />,
  };
  return (
    <svg {...base} width={size} height={size} viewBox="0 0 19 19" fill="currentColor" {...p}>
      {paths[id]}
    </svg>
  );
};
