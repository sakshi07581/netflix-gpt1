import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/languageConstant";
import { API_OPTIONS } from "../utils/constant";
import { addGptMovieResult } from "../utils/store/gptSlice";
import GptMovieSuggestions from "./GptMovieSuggestion";

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const langKey = useSelector((store) => store.config.lang);
  const searchText = useRef(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_OPENROUTER_KEY;

  // Function to search movie in TMDB by name
  const searchMovieTMDB = async (movie) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await response?.json();
      return json.results[0]; // Get the first result for each movie
    } catch (error) {
      console.error("Error fetching movie from TMDB:", error);
      return null;
    }
  };

  const handleGptSearchClick = async () => {
    const userQuery = searchText.current.value.trim();
    if (!userQuery) return;

    console.log("User Query:", userQuery);

    const gptQuery = `Act as a Movie Recommendation system and suggest movies in multiple languages based on the query: "${searchText.current.value}". Return movie names from Bollywood, Tollywood, Kollywood, Hollywood, and other world cinemas. Provide only movie names, comma-separated. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya, Dangal, Bahubali, Drishyam, KGF`;

    setLoading(true);
    try {
      // Fetch movie names from OpenRouter AI
      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-3.5-turbo",
            messages: [{ role: "user", content: gptQuery }],
          }),
        }
      );

      const data = await response.json();
      if (!data.choices || data.choices.length === 0) {
        console.error("No recommendations from OpenRouter AI");
        return;
      }

      const gptMovies = data.choices[0].message.content
        .split(",")
        .map((movie) => movie.trim());
      console.log("Recommended Movies:", gptMovies);

      // Fetch TMDB data for each recommended movie
      const tmdbResults = await Promise.all(
        gptMovies.map((movie) => searchMovieTMDB(movie))
      );

      // Filter out any null results from TMDB
      const filteredResults = tmdbResults.filter(
        (result) => result !== undefined
      );

      console.log("TMDB Results:", filteredResults);

      // Dispatch action to save the results in Redux
      dispatch(
        addGptMovieResult({
          movieResults: filteredResults,
        })
      );

      setLoading(false);
    } catch (error) {
      console.error("Error fetching OpenRouter AI response:", error);
    }
  };

  return (
    <>
      <div className="pt-[35%] md:pt-[10%] flex justify-center">
        <form
          className="w-full md:w-1/2 bg-black grid grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            className="p-4 m-4 col-span-9"
            placeholder={lang[langKey].gptSearchPlaceHolder}
          />
          <button
            className="col-span-3 m-4 py-2 px-4 bg-red-700 text-white rounded-lg"
            onClick={handleGptSearchClick}
          >
            {lang[langKey].search}
          </button>
        </form>
      </div>
      <GptMovieSuggestions loading={loading} />
    </>
  );
};

export default GptSearchBar;
