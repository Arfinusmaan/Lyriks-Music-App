import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deezerApi = createApi({
  reducerPath: 'deezerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cors-anywhere-production-d96e.up.railway.app/https://api.deezer.com/',
  }),
  endpoints: (builder) => ({
    // Global Top Charts
    getTopCharts: builder.query({
      query: () => 'chart',
    }),

    // Genre-based Editorial Charts (e.g., 132 = Pop, 116 = Rap/Hip-Hop, etc.)
    getSongsByGenre: builder.query({
      query: (genreId) => `editorial/${genreId}/charts`,
    }),

    // Country-based Charts (e.g., 75 = India)
    getSongsByCountry: builder.query({
      query: (countryId) => `editorial/${countryId}/charts`,
    }),

    // Deezer's built-in search
    getSongsBySearch: builder.query({
      query: (searchTerm) => `search?q=${encodeURIComponent(searchTerm)}`,
    }),

    // Artist Details (name, picture, followers, etc.)
    getArtistDetails: builder.query({
      query: (artistId) => `artist/${artistId}`,
    }),

    // Artist Top Tracks (for use in ArtistDetails.jsx)
    getArtistTopTracks: builder.query({
      query: (artistId) => `artist/${artistId}/top?limit=10`,
    }),

    // Single Track Details
    getSongDetails: builder.query({
      query: (songid) => `track/${songid}`,
    }),

    // Related Tracks (same mood/genre)
    getSongRelated: builder.query({
      query: (songid) => `track/${songid}/related`,
    }),
  }),
});

export const {
  useGetTopChartsQuery,
  useGetSongsByGenreQuery,
  useGetSongsByCountryQuery,
  useGetSongsBySearchQuery,
  useGetArtistDetailsQuery,
  useGetArtistTopTracksQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
} = deezerApi;