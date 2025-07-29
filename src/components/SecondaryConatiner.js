import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryConatiner = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <>
      <div className="-mt-60 bg-black relative z-20">
        <MovieList title={"Now Playing"} movie={movies.nowPlayingMovies} />
      </div>
      <div className="bg-black ">
        <MovieList title={"Top Rated Movies"} movie={movies.topRatedMovies} />
        <MovieList title={"Popular"} movie={movies.popularMovies} />
        <MovieList title={"Upcoming Movies"} movie={movies.upComingMovies} />
        <MovieList title={"Now Playing"} movie={movies.nowPlayingMovies} />
        <MovieList title={"Tv Series"} movie={movies.tvSeries} />
      </div>
    </>
  );
};

export default SecondaryConatiner;
