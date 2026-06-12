export const streamResolver = {
  getStreamUrl: (id: string, type: 'movie' | 'anime', _episode?: number, _season?: number) => {
    // Check if there is a manual override in localStorage for testing
    const override = localStorage.getItem(`override-${id}`);
    if (override) return override;

    // Placeholder logic: In a real app, this would call a backend or a known provider
    // For this shell, we'll return some high-quality demo streams
    
    if (type === 'anime') {
      // Big Buck Bunny HLS for anime demo
      return 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
    }

    // Sintel MP4 for movie demo
    return 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4';
  },
  
  setOverride: (id: string, url: string) => {
    localStorage.setItem(`override-${id}`, url);
  }
};
