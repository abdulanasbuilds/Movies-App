import type { MediaItem } from '../types';

const BASE_URL = 'https://graphql.anilist.co';

const fetchFromAniList = async (query: string, variables: Record<string, any> = {}) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();
  if (result.errors) {
    throw new Error(result.errors[0].message);
  }
  return result.data;
};

export const mapAniListToMedia = (media: any): MediaItem => ({
  id: `anilist-${media.id}`,
  title: media.title.english || media.title.romaji,
  description: media.description?.replace(/<[^>]*>?/gm, '') || '', // Strip HTML tags
  type: 'anime',
  rating: media.averageScore ? media.averageScore / 10 : 0,
  releaseYear: media.seasonYear || media.startDate?.year || 0,
  backdropUrl: media.bannerImage || 'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=1200',
  posterUrl: media.coverImage.extraLarge || media.coverImage.large,
  episodes: media.episodes,
  genres: media.genres || [],
  isPopular: true,
});

const TRENDING_ANIME_QUERY = `
  query ($page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
      media (sort: TRENDING_DESC, type: ANIME) {
        id
        title {
          romaji
          english
        }
        description
        coverImage {
          extraLarge
          large
        }
        bannerImage
        averageScore
        seasonYear
        startDate {
          year
        }
        episodes
        genres
      }
    }
  }
`;

const SEARCH_ANIME_QUERY = `
  query ($search: String) {
    Page (perPage: 20) {
      media (search: $search, type: ANIME) {
        id
        title {
          romaji
          english
        }
        description
        coverImage {
          extraLarge
          large
        }
        bannerImage
        averageScore
        seasonYear
        episodes
        genres
      }
    }
  }
`;

export const aniListService = {
  getTrending: async () => {
    const data = await fetchFromAniList(TRENDING_ANIME_QUERY, { page: 1, perPage: 20 });
    return data.Page.media.map(mapAniListToMedia);
  },
  search: async (search: string) => {
    const data = await fetchFromAniList(SEARCH_ANIME_QUERY, { search });
    return data.Page.media.map(mapAniListToMedia);
  }
};
