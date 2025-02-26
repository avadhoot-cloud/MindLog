import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // Import trash icon

const Fantasies = () => {
  const [fantasies, setFantasies] = useState([]);
  const [newFantasy, setNewFantasy] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch fantasies from the backend
  const fetchFantasies = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/fantasies");
      setFantasies(response.data);
    } catch (err) {
      setError("Failed to fetch fantasies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new fantasy to the backend
  const addFantasy = async () => {
    if (!newFantasy.trim()) return; // Prevent empty submissions
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/fantasies", {
        text: newFantasy,
      });
      setFantasies([...fantasies, response.data]);
      setNewFantasy(""); // Clear input after submission
    } catch (err) {
      setError("Failed to add fantasy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a fantasy
  const deleteFantasy = async (id) => {
    setLoading(true);
    try {
      console.log(`Deleting fantasy with ID: ${id}`); // Debugging
      const response = await axios.delete(`http://localhost:5000/api/fantasies/${id}`);
      console.log('Delete response:', response.data); // Debugging
      setFantasies(fantasies.filter((fantasy) => fantasy.id !== id)); // Remove from UI
    } catch (err) {
      console.error('Delete error:', err); // Debugging
      setError("Failed to delete fantasy. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch fantasies on component mount
  useEffect(() => {
    fetchFantasies();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Your Fantasies
        </h1>

        {/* Display loading/error messages */}
        {loading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Fantasy list */}
        <div className="space-y-4 mb-6">
          {fantasies.map((fantasy) => (
            <div
              key={fantasy.id}
              className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200 flex justify-between items-center"
            >
              <p className="text-gray-700">{fantasy.fantasy}</p>
              <button
                onClick={() => deleteFantasy(fantasy.id)}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* Input for new fantasy */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Add your fantasy..."
            value={newFantasy}
            onChange={(e) => setNewFantasy(e.target.value)}
          />
          <button
            onClick={addFantasy}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-700 transition duration-200"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Fantasies;