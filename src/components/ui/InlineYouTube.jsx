import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { loadYouTube } from '../../services/youtube.js';

/**
 * Muted, looping YouTube clip that fills its (positioned) parent like object-fit: cover.
 * Starts when the box nears the viewport, pauses when it leaves. Browsers only allow
 * autoplay while muted, so sound is opt-in via the button. Loops `start` → `end` (seconds).
 */
export default function InlineYouTube({ id, start = 0, end, title }) {
  const host = useRef(null);
  const player = useRef(null);
  const userPaused = useRef(false);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const box = host.current;
    let cancelled = false;
    let inView = false;

    const create = async () => {
      let YT;
      try { YT = await loadYouTube(); } catch { return; } // poster image stays visible
      if (cancelled || player.current) return;
      const clip = { videoId: id, startSeconds: start, ...(end ? { endSeconds: end } : {}) };
      // YT.Player replaces its target node, so give it one React doesn't own.
      const target = document.createElement('div');
      host.current.appendChild(target);
      player.current = new YT.Player(target, {
        host: 'https://www.youtube-nocookie.com',
        videoId: id,
        playerVars: {
          autoplay: 1, mute: 1, controls: 0, playsinline: 1, rel: 0, fs: 0, disablekb: 1,
          iv_load_policy: 3, modestbranding: 1, cc_load_policy: 0, start, ...(end ? { end } : {}),
        },
        events: {
          onReady: (e) => {
            const frame = e.target.getIframe();
            frame.title = title;
            frame.tabIndex = -1; // decorative; the buttons below are the controls
            e.target.mute();
            if (inView) e.target.playVideo();
          },
          onStateChange: (e) => {
            if (e.data === YT.PlayerState.PLAYING) {
              // YouTube may auto-enable captions on muted playback; they clutter a background clip.
              e.target.unloadModule?.('captions');
              e.target.unloadModule?.('cc');
              setReady(true); setPlaying(true);
            }
            if (e.data === YT.PlayerState.PAUSED) setPlaying(false);
            // `end` stops playback; reload the clip so it loops from `start`, not 0:00.
            if (e.data === YT.PlayerState.ENDED) e.target.loadVideoById(clip);
          },
        },
      });
    };

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      const p = player.current;
      if (inView && !p) create();
      else if (p?.playVideo) {
        if (inView && !userPaused.current) p.playVideo();
        if (!inView) p.pauseVideo();
      }
    }, { rootMargin: '200px 0px' });
    io.observe(box);

    return () => { cancelled = true; io.disconnect(); player.current?.destroy?.(); player.current = null; };
  }, [id, start, end, title]);

  const togglePlay = () => {
    const p = player.current;
    if (!p) return;
    if (playing) { userPaused.current = true; p.pauseVideo(); } else { userPaused.current = false; p.playVideo(); }
  };
  const toggleSound = () => {
    const p = player.current;
    if (!p) return;
    if (muted) p.unMute(); else p.mute();
    setMuted(!muted);
  };

  return (
    <>
      <div ref={host} className={`inline-yt ${ready ? 'is-ready' : ''}`} aria-hidden="true" />
      {ready && (
        <div className="inline-yt__controls">
          <button type="button" onClick={togglePlay} aria-label={playing ? 'Pause video' : 'Play video'}>
            {playing ? <Pause size={18} /> : <Play size={18} />}
          </button>
          <button type="button" onClick={toggleSound} aria-label={muted ? 'Turn sound on' : 'Turn sound off'} aria-pressed={!muted}>
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      )}
    </>
  );
}
