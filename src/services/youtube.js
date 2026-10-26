/**
 * YouTube IFrame Player API, loaded once on first use.
 * Docs: https://developers.google.com/youtube/iframe_api_reference
 */
let loading;

export function loadYouTube() {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(window.YT); };
      const js = document.createElement('script');
      js.src = 'https://www.youtube.com/iframe_api';
      js.async = true;
      js.onerror = () => { loading = null; reject(new Error('YouTube API failed to load')); };
      document.head.appendChild(js);
    });
  }
  return loading;
}
