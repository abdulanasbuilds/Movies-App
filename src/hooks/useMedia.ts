import { useQuery } from '@tanstack/react-query';
import { tmdbService } from '../services/tmdb';
import { aniListService } from '../services/anilist';

export const useHomeMedia = () => {
  const tmdbTrending = useQuery({
    queryKey: ['tmdb-trending'],
    queryFn: tmdbService.getTrending,
    enabled: !!localStorage.getItem('tmdb_api_key'),
  });

  const aniListTrending = useQuery({
    queryKey: ['anilist-trending'],
    queryFn: aniListService.getTrending,
  });

  return {
    trending: tmdbTrending.data || [],
    anime: aniListTrending.data || [],
    isLoading: tmdbTrending.isLoading || aniListTrending.isLoading,
    isError: tmdbTrending.isError || aniListTrending.isError,
    error: tmdbTrending.error || aniListTrending.error,
  };
};

export const useSearchMedia = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: async () => {
      if (!query) return [];
      
      const [tmdbResults, aniListResults] = await Promise.allSettled([
        tmdbService.search(query),
        aniListService.search(query),
      ]);

      const results = [];
      if (tmdbResults.status === 'fulfilled') results.push(...tmdbResults.value);
      if (aniListResults.status === 'fulfilled') results.push(...aniListResults.value);

      return results;
    },
    enabled: query.length > 2,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
