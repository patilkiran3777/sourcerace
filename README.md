# SourceTrace — React + GSAP homepage

A React (Vite) build of the Figma frame `sourcetrace-mockup-v6` (1920 × 10,729) from `../Untitled.fig`, with GSAP ScrollTrigger animations.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the build
npm run build:preview  # dist-preview/index.html — one self-contained file, opens with a double-click
```

`preview.html` in the project root is a ready-made copy of that single-file build.

Requires Node 18+.

## Structure

```
public/
  brand/       logo (real vector exported from Figma), favicon
  images/      every raster from the .fig, cropped exactly as framed in Figma, WebP, 2× display size
  maps/        dot maps (world + USA/India/Bangladesh/Kenya) exported from the Figma vectors as SVG
src/
  animations/gsapConfig.js   GSAP + ScrollTrigger setup, motion tokens, data-attribute reveal system
  hooks/                     useSectionReveal, useReducedMotion
  data/content.js            ALL copy, links, logos and office details — edit text here
  services/newsletter.js     newsletter integration point
  components/layout/         Header, Navigation (dropdowns), MobileMenu, MeetingTab, Footer, NewsletterForm
  components/sections/       Hero, ImpactStats, TrustedBrands, FirstMile, PlatformFeatures,
                             SoftwareSolutions, Locations, Experience, Certifications, CaseStudies, Testimonials
  components/ui/             Button, ExplorePill, RoundArrowButton, SplitText, Counter, Marquee, VideoModal, Icons, useCarousel
  styles/                    variables.css (design tokens), global.css, components.css, layout/*, sections/*
```

## Animation map

| Section | Animation |
|---|---|
| Header | Staggered entrance; compacts after 80px; hides on scroll-down, returns on scroll-up; GSAP dropdowns; clip-path mobile menu with staggered links |
| Hero | Background settles from 1.18× scale; word-by-word masked headline; hand-drawn green underline draws under "Value Chain."; copy + CTAs stagger in; scrubbed parallax on the photo |
| Impact bento | Cards rise in sequence; counters (2 / 37 / 3 / 350) count up once; desktop depth parallax (outer columns travel further) |
| Trusted / Certifications | Seamless GSAP marquee, eases to a stop on hover/focus |
| First mile | Masked heading reveal; image wipes open from an inset clip; divider lines draw; benefit cards stagger |
| Platform | Card deck: front card rises, back card trails with scroll parallax; leaf icons spin in; features stagger |
| Software solutions | Cards rise in sequence; inner image parallax; the card crossing viewport centre becomes "active"; cursor-follow spotlight on hover |
| Locations | World map + pulsing office markers; opening an office morphs the map into that country's dot map via an expanding circular clip from its marker; GSAP accordion |
| Experience | Heading reveal, list rules draw in, video thumbnail wipe + parallax, pulsing play ring, `<dialog>` video lightbox |
| Case studies / Testimonials | Staggered entrance; native scroll-snap carousels (swipe, buttons, dots, arrow keys) |
| Footer | Staggered reveals, dashed rules draw in |

Every animation runs inside `gsap.matchMedia()` and is skipped under `prefers-reduced-motion: reduce`. Content is visible by default and GSAP only animates *from* hidden, so nothing stays invisible if scripts fail. Hover lifts use the CSS `translate`/`scale` properties so they never fight GSAP's `transform`.

## Integration points

- **Newsletter**: set `VITE_NEWSLETTER_ENDPOINT` in `.env` (see `.env.example`). It receives `POST { email }`. Without it, the form validates and clearly says sign-ups aren't connected yet.
- **Video**: put the YouTube ID in `experience.video.youtubeId` in `src/data/content.js`.
- **Links**: all routes are listed in `ROUTES` / navigation data in `content.js` (e.g. `/request-a-demo`). Point them at real URLs or add React Router.
- **Social URLs**: placeholders (`facebook.com/` etc.) in `content.js` → `social`.

## Content flagged from the Figma source

Items with `placeholder: true` in `content.js` need real copy:

1. Lorem ipsum in four stat cards (2 Million+, 37 Countries, 3 Million, 350+).
2. India, Bangladesh and Kenya office phone/address — Figma repeats the US HQ details for every office.
3. The 4th testimonial duplicated Uzair Javeed — replaced with a lorem placeholder card.
4. Fixed typos: "Accredations" → "Accreditations", "Effecient" → "Efficient".
5. Footer listed Facebook twice — the duplicate was removed.
6. Fonts: Figma uses **SF Pro** for buttons, which Apple doesn't license for web embedding — **Inter** is used instead. Cal Sans, Poppins and Montserrat are bundled (open licences).
7. Case-study logos in the source are low resolution (225px); swap in higher-res files when available.
8. The Bangladesh variant of the locations component in Figma has overlapping layers (designer error); the build follows the intended pattern of the other variants.
