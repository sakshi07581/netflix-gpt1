import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../utils/firebase";
import AdminHeader from "./AdminHeader";
import { useState } from "react";
import { useSelector } from "react-redux";

const AddMovies = () => {
  const user = useSelector((state) => state.user);
  const [input, setInput] = useState({
    title: "",
    description: "",
    genre: "",
    poster: "",
    rating: "",
    year: "",
  });

  const handleAddMovies = async (e) => {
    e.preventDefault();

    const movie = {
      ...input,
      rating: parseFloat(input.rating),
      genre: input.genre?.toLowerCase(),
      createdBy: user?.displayName || "unknown",
      timestamp: serverTimestamp(),
    };
    try {
      const res = await addDoc(collection(db, "movies"), movie);
      alert("Movie added successfully!");
      setInput({
        title: "",
        description: "",
        genre: "",
        poster: "",
        rating: "",
        year: "",
      });
      console.log("res", res);
    } catch (error) {
      console.error("Error adding movie:", error);
      alert("Failed to add movie.");
    }
  };

  const genres = ["Action", "Comedy", "Horror", "Romance", "Sci-Fi"];

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <AdminHeader />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-[#1f1f1f] p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center mb-8 text-white">
            Add Movie
          </h1>

          <form className="space-y-6" onSubmit={handleAddMovies}>
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300"
              >
                Title<span className="text-red-700 px-1 text-md">*</span>
              </label>
              <input
                name="title"
                type="text"
                value={input.title}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                id="title"
                required
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white p-2"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300"
              >
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={input.description}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                rows="3"
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white p-2"
              />
            </div>

            <div>
              <label
                htmlFor="genre"
                className="block text-sm font-medium text-gray-300"
              >
                Genre<span className="text-red-700 px-1 text-md">*</span>
              </label>
              <select
                id="genre"
                value={input.genre}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                name="genre"
                required
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white p-2"
              >
                <option value="">-- Select Genre --</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="poster"
                className="block text-sm font-medium text-gray-300"
              >
                Poster URL
              </label>
              <input
                name="poster"
                value={input.poster}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                type="text"
                id="poster"
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white p-2"
              />
            </div>

            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-300"
              >
                Rating
              </label>
              <input
                type="number"
                value={input.rating}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                name="rating"
                step="0.1"
                id="rating"
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white p-2"
              />
            </div>

            <div>
              <label
                htmlFor="year"
                className="block text-sm font-medium text-gray-300"
              >
                Year
              </label>
              <input
                name="year"
                value={input.year}
                onChange={(e) =>
                  setInput((prev) => ({
                    ...prev,
                    [e.target.name]: e.target.value,
                  }))
                }
                type="date"
                id="year"
                className="mt-1 block w-full rounded-md bg-gray-800 border border-gray-600 text-white p-2"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Add Movie
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovies;
