import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deezerApi = createApi({
  reducerPath: 'deezerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.allorigins.win/raw?url=https://api.deezer.com/',
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      query: () => 'chart',
    }),
    getSongsByGenre: builder.query({
      query: (genreId) => `editorial/${genreId}/charts`,
    }),
    getSongsByCountry: builder.query({
      query: (countryId) => `editorial/${countryId}/charts`,
    }),
    getSongsBySearch: builder.query({
      query: (searchTerm) => `search?q=${encodeURIComponent(searchTerm)}`,
    }),
    getArtistDetails: builder.query({
      query: (artistId) => `artist/${artistId}`,
    }),
    getArtistTopTracks: builder.query({
      query: (artistId) => `artist/${artistId}/top?limit=10`,
    }),
    getSongDetails: builder.query({
      query: (songid) => `track/${songid}`,
    }),
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
