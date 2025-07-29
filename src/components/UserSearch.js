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
    const genreInput = rawInput.toLowerCase(); // fix: match Firestore genre format

    if (!genreInput) {
      alert("Please enter a genre to search.");
      return;
    }

    try {
      setLoading(true);
      setResults([]);

      const moviesRef = collection(db, "movies");
      const q = query(moviesRef, where("genre", "==", genreInput));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        alert(`No movies found for genre: ${genreInput}`);
        return;
      }

      const movieResults = [];
      snapshot.forEach((doc) => {
        movieResults.push({ id: doc.id, ...doc.data() });
      });

      setResults(movieResults);
    } catch (err) {
      console.error("Movie search error:", err);
      alert("Something went wrong while searching.");
    } finally {
      setLoading(false);
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
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
