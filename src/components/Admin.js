import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase"; // adjust the path to your config
import AdminHeader from "./AdminHeader";

const Admin = () => {
  const navigate = useNavigate();
  const [totalMovies, setTotalMovies] = useState(0);
  const [genreCounts, setGenreCounts] = useState({
    action: 0,
    comedy: 0,
    romance: 0,
    horror: 0,
    "sci-fi": 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const movieRef = collection(db, "movies");

      // Total Movies Count
      const allMoviesSnapshot = await getDocs(movieRef);
      setTotalMovies(allMoviesSnapshot.size);

      // Fetch Genre-Specific Counts
      const genres = ["action", "comedy", "romance", "horror", "sci-fi"];
      const genreData = {};

      for (const genre of genres) {
        const genreQuery = query(movieRef, where("genre", "==", genre));
        const genreSnap = await getDocs(genreQuery);
        genreData[genre] = genreSnap.size;
      }

      setGenreCounts(genreData);
    };

    fetchCounts();
  }, []);

  return (
    <div className="min-h-screen bg-[#141414] text-white">
      <AdminHeader />

      <div className="px-6 py-4">
        <h1 className="text-3xl font-semibold text-white">
          Dashboard Overview
        </h1>

        <button
          onClick={() => navigate("/add-movies")}
          className="p-4 mt-4 bg-red-500 rounded-lg hover:bg-red-300 hover:text-black transition duration-300"
        >
          Add Movies
        </button>

        <div className="stats grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <StatCard label="Total Movies" count={totalMovies} />
          <StatCard label="Comedy Movies" count={genreCounts.comedy} />
          <StatCard label="Action Movies" count={genreCounts.action} />
          <StatCard label="Romance Movies" count={genreCounts.romance} />
          <StatCard label="Horror Movies" count={genreCounts.horror} />
          <StatCard label="Sci-fi Movies" count={genreCounts["sci-fi"]} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, count }) => (
  <div className="stat-item bg-[#333] p-6 rounded-lg shadow-md">
    <h2 className="text-lg font-bold text-red-500">{label}</h2>
    <p className="text-xl">{count}</p>
  </div>
);

export default Admin;
