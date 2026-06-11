export interface MediaItem {
  id: string;
  title: string;
  description: string;
  type: 'movie' | 'anime';
  rating: number;
  releaseYear: number;
  backdropUrl: string;
  posterUrl: string;
  duration?: string;
  episodes?: number;
  genres: string[];
  isTrending?: boolean;
  isPopular?: boolean;
  isTV?: boolean;
}

export interface UserProgress {
  mediaId: string;
  progress: number; // percentage
  lastWatched: string;
}
