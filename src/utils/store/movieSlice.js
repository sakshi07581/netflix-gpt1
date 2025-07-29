import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlayingMovies: null,
    popularMovies: null,
    topRatedMovies: null,
    upComingMovies: null,
    trailerVideo: null,
    tvSeries: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    addTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    addUpcomgMovies: (state, action) => {
      state.upComingMovies = action.payload;
    },
    addGetTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addTvSeries: (state, action) => {
      state.tvSeries = action.payload;
    },
  },
});

export const {
  addNowPlayingMovies,
  addPopularMovies,
  addTopRatedMovies,
  addUpcomgMovies,
  addGetTrailerVideo,
  addTvSeries,
} = movieSlice.actions;

export default movieSlice.reducer;
