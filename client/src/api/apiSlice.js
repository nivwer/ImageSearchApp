import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/images",
  }),
  endpoints: (builder) => ({
    getImagesResults: builder.query({
      query: (params) => `/api/v1/search/?query=${params.query}&page=${params.page}`,
    }),
    getPopularSearches: builder.query({
      query: (limit) => `/api/v1/searches/popular/?limit=${limit}`,
    }),
  }),
});

export const { useGetImagesResultsQuery, useGetPopularSearchesQuery } = apiSlice;
