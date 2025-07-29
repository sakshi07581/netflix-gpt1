import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: [],
  },
  reducers: {
    toggleGptSearch: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    addGptMovieResult: (state, action) => {
      state.movieResults = action.payload.movieResults;
    },
  },
});

export const { toggleGptSearch, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;
