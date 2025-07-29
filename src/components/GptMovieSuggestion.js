import { useSelector } from "react-redux";

const Shimmer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {Array(6)
        .fill("")
        .map((_, index) => (
          <div key={index} className="bg-gray-700 p-4 rounded-lg animate-pulse">
            <div className="w-full h-40 bg-gray-600 rounded-lg"></div>
            <div className="h-4 bg-gray-500 rounded mt-2"></div>
            <div className="h-4 bg-gray-500 rounded mt-2 w-1/2"></div>
          </div>
        ))}
    </div>
  );
};

const GptMovieSuggestions = ({ loading }) => {
  const movieResults = useSelector((store) => store.gpt?.movieResults);

  return (
    <div className="p-4 m-auto mt-10 bg-black text-white bg-opacity-90 text-center w-full md:w-1/2">
      <h2 className="text-lg font-bold text-white">Recommended Movies</h2>

      {loading ? (
        <Shimmer />
      ) : movieResults && movieResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {movieResults.map((movie, index) => (
            <div key={index} className="bg-gray-800 text-white p-4 rounded-lg">
              <h3 className="font-bold">{movie?.title}</h3>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
                alt={movie?.title}
                className="w-full h-auto rounded-lg mt-2"
              />
              <p className="text-sm mt-2">Rating: {movie?.vote_average}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-4">No movies found. Try another search.</p>
      )}
    </div>
  );
};

export default GptMovieSuggestions;
