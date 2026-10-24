import { useState } from 'react';
import { experience } from '../../data/content.js';
import Button from '../ui/Button.jsx';
import SplitText from '../ui/SplitText.jsx';
import { Leaf, YouTubePlay } from '../ui/Icons.jsx';
import VideoModal from '../ui/VideoModal.jsx';
import useSectionReveal from '../../hooks/useSectionReveal.js';
import '../../styles/sections/experience.css';

export default function Experience() {
  const [videoOpen, setVideoOpen] = useState(false);
  const ref = useSectionReveal();
  const { video } = experience;

  return (
    <section className="experience" ref={ref} aria-labelledby="experience-title">
      <div className="container experience__grid">
        <div className="experience__copy">
          <SplitText as="h2" id="experience-title" className="h2 h2--medium" lines={[['13', 'Years', 'Of', 'Digitising'], ['The', 'First', 'Mile.']]} accentFrom={3} />
          <p className="body-lg experience__text" data-reveal="">{experience.text}</p>
          <ul className="experience__points">
            {experience.points.map((p, i) => (
              <li key={p} className="experience__point">
                <span data-reveal="left" className="experience__point-inner"><Leaf size={24} /> {p}</span>
                {i < experience.points.length - 1 && <span className="experience__rule" data-reveal-line="" aria-hidden="true" />}
              </li>
            ))}
          </ul>
          <div data-reveal="">
            <Button href={experience.cta.href}>{experience.cta.label}</Button>
          </div>
        </div>

        <div className="experience__media" data-reveal-image="">
          <img src={video.thumbnail} alt="" loading="lazy" width="670" height="629" data-parallax="8" />
          <button className="experience__play" onClick={() => setVideoOpen(true)} aria-haspopup="dialog">
            <YouTubePlay />
            <span className="sr-only">Play video: {video.title}</span>
          </button>
        </div>
      </div>
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} youtubeId={video.youtubeId} title={video.title} />
    </section>
  );
}
