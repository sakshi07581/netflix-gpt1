import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movie }) => {
  if (!movie || movie.length === 0) return null; // Handle empty or undefined movie lists

  return (
    <div className="ml-6 text-white">
      <h1 className="text-3xl font-bold ml-2">{title}</h1>
      <div className="flex py-8 overflow-x-scroll scrollbar-hide">
        <div className="flex space-x-4">
          {movie.map((movieItem) => (
            <div key={movieItem.id} className="flex flex-col min-w-[200px]">
              <MovieCard posterPath={movieItem.backdrop_path} />
              <p className="font-bold pl-2 pt-2">{movieItem.title}</p>
              <p className="font-bold pl-2 pt-2">
                {movieItem.vote_average} IMDB rating
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
