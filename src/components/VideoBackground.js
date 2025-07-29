import React from "react";
import { useSelector } from "react-redux";
import useMovieTrailer from "../utils/hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const videoId = useSelector((store) => store.movies?.trailerVideo);
  useMovieTrailer(movieId);
  return (
    <div className="w-full">
      <iframe
        className="w-full aspect-video"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&si=oiFdMBA1_dYqYToL`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
