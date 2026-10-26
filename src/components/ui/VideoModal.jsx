import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gsap } from '../../animations/gsapConfig.js';
import { lockScroll } from '../../animations/smoothScroll.js';

/**
 * Accessible video lightbox built on <dialog>. Set `youtubeId` in
 * src/data/content.js (experience.video.youtubeId) to enable playback.
 */
export default function VideoModal({ open, onClose, youtubeId, title, start, end }) {
  const ref = useRef(null);
  // Optional clip range in seconds (YouTube `start` / `end` player params).
  const range = `${start ? `&start=${start}` : ''}${end ? `&end=${end}` : ''}`;

  useEffect(() => {
    const d = ref.current;
    if (open && !d.open) {
      d.showModal();
      lockScroll(true);
      gsap.fromTo(d, { autoAlpha: 0, scale: 0.94, y: 20 }, { autoAlpha: 1, scale: 1, y: 0, duration: 0.6, ease: 'expo.out' });
    } else if (!open && d.open) {
      gsap.to(d, { autoAlpha: 0, scale: 0.97, duration: 0.25, ease: 'power2.in', onComplete: () => d.close() });
      lockScroll(false);
    }
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="video-modal"
      data-lenis-prevent
      aria-label={title}
      onCancel={(e) => { e.preventDefault(); onClose(); }}
      onClick={(e) => { if (e.target === ref.current) onClose(); }}
    >
      <button className="video-modal__close" onClick={onClose} aria-label="Close video"><X size={22} /></button>
      <div className="video-modal__frame">
        {open && youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0${range}`}
            title={title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <p className="video-modal__empty">
            Video coming soon.
            <small>Integration point: add the YouTube ID to <code>experience.video.youtubeId</code> in <code>src/data/content.js</code>.</small>
          </p>
        )}
      </div>
    </dialog>
  );
}
