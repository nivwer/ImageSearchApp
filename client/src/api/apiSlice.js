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
  }),
});

export const { useGetImagesResultsQuery } = apiSlice;
