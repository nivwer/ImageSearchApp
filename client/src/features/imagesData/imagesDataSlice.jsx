import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const imagesDataSlice = createSlice({
  name: "ImagesData",
  initialState,
  reducers: {
    // Add and Update the state of the Images Data.
    AddImages: (state, action) => {
      if (action.payload) {
        state.total_pages = action.payload.total_pages;
        state.total = action.payload.total;
        state.results = action.payload.results;
      }
    },
  },
});

export const { AddImages } = imagesDataSlice.actions;

export default imagesDataSlice.reducer;
