import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // Import trash icon

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    genre: "",
    rating: "",
    release_year: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch movies from the backend
  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/movies");
      setMovies(response.data);
    } catch (err) {
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new movie to the backend
  const addMovie = async () => {
    if (
      !newMovie.title.trim() ||
      !newMovie.genre.trim() ||
      !newMovie.rating.trim() ||
      !newMovie.release_year.trim()
    ) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/movies", newMovie);
      setMovies([...movies, response.data]);
      setNewMovie({ title: "", genre: "", rating: "", release_year: "" }); // Clear form
    } catch (err) {
      setError("Failed to add movie. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a movie
  const deleteMovie = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/movies/${id}`);
      setMovies(movies.filter((movie) => movie.id !== id)); // Remove from UI
    } catch (err) {
      setError("Failed to delete movie. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch movies on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Movies List</h1>

        {/* Display loading/error messages */}
        {loading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Movies table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Genre</th>
                <th className="py-2 px-4 border-b">Rating</th>
                <th className="py-2 px-4 border-b">Release Year</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id} className="hover:bg-gray-50 transition duration-200">
                  <td className="py-2 px-4 border-b">{movie.title}</td>
                  <td className="py-2 px-4 border-b">{movie.genre}</td>
                  <td className="py-2 px-4 border-b">{movie.rating}</td>
                  <td className="py-2 px-4 border-b">{movie.release_year}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => deleteMovie(movie.id)}
                      className="text-red-500 hover:text-red-700 transition duration-200"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Input for new movie */}
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Movie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Title"
              value={newMovie.title}
              onChange={(e) => setNewMovie({ ...newMovie, title: e.target.value })}
            />
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Genre"
              value={newMovie.genre}
              onChange={(e) => setNewMovie({ ...newMovie, genre: e.target.value })}
            />
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Rating"
              value={newMovie.rating}
              onChange={(e) => setNewMovie({ ...newMovie, rating: e.target.value })}
            />
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Release Year"
              value={newMovie.release_year}
              onChange={(e) => setNewMovie({ ...newMovie, release_year: e.target.value })}
            />
          </div>
          <button
            onClick={addMovie}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition duration-200"
          >
            Add Movie
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movies;