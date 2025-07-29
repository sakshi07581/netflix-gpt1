import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../constant";
import { addGetTrailerVideo } from "../store/movieSlice";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();
  const getMovieVideo = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/videos?language=en-US",
      API_OPTIONS
    );
    const data = await response.json(); // Assuming the first video is the best quality available
    const filterData = data.results.filter((video) => video.type === "Trailer");
    const trailer =
      filterData.length > 0
        ? filterData[Math.floor(Math.random() * filterData.length)]
        : data.results[0];

    dispatch(addGetTrailerVideo(trailer.key));
  };

  useEffect(() => {
    getMovieVideo();
  }, []);
};

export default useMovieTrailer;
