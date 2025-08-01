import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../utils/firebase";
import { LOGO } from "../utils/constant";
import lang from "../utils/languageConstant";

const UserSearch = () => {
  const navigate = useNavigate();
  const searchText = useRef();
  const langKey = useSelector((store) => store.config.lang);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleHomepage = () => navigate("/browse");

  const handleUserSearchClick = async () => {
    const rawInput = searchText.current.value.trim();
    const g = rawInput.toLowerCase(); // g = user-provided genre input

    if (!g) {
      alert("Please enter a genre to search.");
      return;
    }

    try {
      setLoading(true);

      // Step 1: Fetch all documents D from the "movies" collection
      const D = await getDocs(collection(db, "movies")); // D = set of all movies

      // Step 2: Apply the filtering formula:
      // Result = { d ∈ D | genreofD = g }
      const Result = [];

      D.forEach((doc) => {
        const d = { id: doc.id, ...doc.data() }; // d ∈ D
        const genreOfD = d.genre?.toLowerCase(); // genreofD

        if (genreOfD === g) {
          Result.push(d); // if genre(d) = g, include in Result
        }
      });

      // Step 3: Display the filtered result
      if (Result.length === 0) {
        alert(`No movies found for genre: ${g}`);
        return;
      }

      setResults(Result);
    } catch (err) {
      console.error("Movie search error:", err);
      alert("Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (watchUrl) => {
    // Convert YouTube watch URL to embed URL
    const convertToEmbedUrl = (url) => {
      const match = url.match(/v=([^&]+)/);
      return match
        ? `https://www.youtube.com/embed/${match[1]}?autoplay=1`
        : null;
    };

    const embedUrl = convertToEmbedUrl(watchUrl);

    if (embedUrl) {
      navigate("/video-trailer", { state: { videoUrl: embedUrl } });
    } else {
      alert("Invalid YouTube URL");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex justify-between items-center py-4 px-6 md:px-20">
        <img src={LOGO} alt="logo" className="w-32 md:w-48" />
        <button
          onClick={handleHomepage}
          className="px-6 py-2 bg-red-700 hover:bg-red-600 rounded-lg font-semibold"
        >
          Homepage
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center pt-24">
        <form
          className="w-full md:w-1/2 grid grid-cols-12 px-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            placeholder={
              lang[langKey].gptSearchPlaceHolder || "Search by genre..."
            }
            className="col-span-9 p-4 rounded-l-md text-black"
          />
          <button
            onClick={handleUserSearchClick}
            className="col-span-3 bg-red-700 hover:bg-red-600 text-white font-bold rounded-r-md"
          >
            {lang[langKey].search || "Search"}
          </button>
        </form>
      </div>

      {/* Results */}
      <div className="mt-12 px-6 md:px-20">
        {loading && <p className="text-center text-gray-400">Searching...</p>}

        {!loading && results.length > 0 && (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 cursor-pointer">
            {results.map((movie) => (
              <div
                key={movie.id}
                className="bg-[#1f1f1f] p-4 rounded-lg shadow-md border border-gray-700"
              >
                {movie.poster && (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-60 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-xl font-bold mb-2">{movie.title}</h2>
                {movie.description && (
                  <p className="text-sm text-gray-300 mb-2">
                    {movie.description}
                  </p>
                )}
                <p className="text-sm">
                  <strong>Genre:</strong> {movie.genre}
                </p>
                <p className="text-sm">
                  <strong>Rating:</strong> {movie.rating || "N/A"}
                </p>
                <p className="text-sm">
                  <strong>Year:</strong> {movie.year || "N/A"}
                </p>
                <button
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-md flex items-center gap-2 transition duration-200"
                  onClick={() => handleCardClick(movie.videoUrl)}
                >
                  Watch Video
                </button>
              </div>
            ))}
          </div>
        )}

        {!loading && results.length === 0 && (
          <p className="text-center text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default UserSearch;