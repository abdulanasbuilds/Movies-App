import type { MediaItem } from '../types';

const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const getApiKey = () => localStorage.getItem('tmdb_api_key');

const fetchFromTMDB = async (endpoint: string, params: Record<string, string> = {}) => {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('TMDB API Key missing');

  const queryParams = new URLSearchParams({
    api_key: apiKey,
    ...params,
  });

  const response = await fetch(`${BASE_URL}${endpoint}?${queryParams}`);
  if (!response.ok) {
    if (response.status === 401) throw new Error('Invalid TMDB API Key');
    throw new Error('TMDB API Error');
  }
  return response.json();
};

export const mapTMDBToMedia = (item: any): MediaItem => ({
  id: `tmdb-${item.id}`,
  title: item.title || item.name || 'Unknown Title',
  description: item.overview || '',
  type: item.media_type === 'tv' || item.first_air_date ? 'movie' : 'movie', // Keep as 'movie' for general shell type, but can be refined
  rating: parseFloat(item.vote_average?.toFixed(1)) || 0,
  releaseYear: new Date(item.release_date || item.first_air_date || Date.now()).getFullYear(),
  backdropUrl: item.backdrop_path ? `${IMAGE_BASE_URL}/original${item.backdrop_path}` : 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200',
  posterUrl: item.poster_path ? `${IMAGE_BASE_URL}/w500${item.poster_path}` : 'https://images.unsplash.com/photo-1614728263952-84ea206f99b6?auto=format&fit=crop&q=80&w=400',
  genres: [],
  isTrending: true,
  isTV: item.media_type === 'tv' || !!item.first_air_date,
});

export const tmdbService = {
  getTrending: async () => {
    const data = await fetchFromTMDB('/trending/all/day');
    return data.results.map(mapTMDBToMedia);
  },
  search: async (query: string) => {
    const data = await fetchFromTMDB('/search/multi', { query });
    return data.results.map(mapTMDBToMedia);
  },
  getDetails: async (id: string, type: 'movie' | 'tv') => {
    const data = await fetchFromTMDB(`/${type}/${id.replace('tmdb-', '')}`);
    return data;
  },
  getTVSeason: async (id: string, seasonNumber: number) => {
    const data = await fetchFromTMDB(`/tv/${id.replace('tmdb-', '')}/season/${seasonNumber}`);
    return data;
  }
};
