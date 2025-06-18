import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const deezerApi = createApi({
  reducerPath: 'deezerApi',
  // Use your new Vercel proxy URL as the base URL.
  // The '/api/deezer' part is your serverless function route.
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://deezer-proxy-arfin.vercel.app/api/deezer',
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({
      // Pass the Deezer path as the 'path' query parameter to your proxy
      query: () => '?path=chart',
    }),
    getSongsByGenre: builder.query({
      // Dynamically add the genreId to the 'path' query parameter
      query: (genreId) => `?path=editorial/${genreId}/charts`,
    }),
    getSongsByCountry: builder.query({
      // Dynamically add the countryId to the 'path' query parameter
      query: (countryId) => `?path=editorial/${countryId}/charts`,
    }),
    getSongsBySearch: builder.query({
      // Dynamically add the searchTerm, properly encoded, to the 'path' query parameter
      query: (searchTerm) => `?path=search?q=${encodeURIComponent(searchTerm)}`,
    }),
    getArtistDetails: builder.query({
      // Dynamically add the artistId to the 'path' query parameter
      query: (artistId) => `?path=artist/${artistId}`,
    }),
    getArtistTopTracks: builder.query({
      // Dynamically add the artistId and limit to the 'path' query parameter
      query: (artistId) => `?path=artist/${artistId}/top?limit=10`,
    }),
    getSongDetails: builder.query({
      // Dynamically add the songid to the 'path' query parameter
      query: (songid) => `?path=track/${songid}`,
    }),
    getSongRelated: builder.query({
      // Dynamically add the songid to the 'path' query parameter
      query: (songid) => `?path=track/${songid}/related`,
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