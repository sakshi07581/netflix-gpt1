import React from "react";
import { IMAGE_URL } from "../utils/constant";

const MovieCard = ({ posterPath, title }) => {
  return (
    <div className="w-60 pl-2">
      <img src={IMAGE_URL + posterPath} alt="movie poster" />
      <p>{title}</p>
    </div>
  );
};

export default MovieCard;
