import { createSlice } from "@reduxjs/toolkit";

const initialState = { popular_searches: [] };

export const popularSearchesSlice = createSlice({
  name: "PopularSearches",
  initialState,
  reducers: {
    // Add the state of Popular Searches
    AddPopularSearches: (state, action) => {
      if (action.payload) {
        state.popular_searches = action.payload.popular_searches;
      }
    },
  },
});

export const { AddPopularSearches } = popularSearchesSlice.actions;

export default popularSearchesSlice.reducer;
