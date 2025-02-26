import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // Import trash icon

const Motivational_quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch quotes from the backend
  const fetchQuotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/quotes");
      setQuotes(response.data);
    } catch (err) {
      setError("Failed to fetch quotes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new quote to the backend
  const addQuote = async () => {
    if (!newQuote.trim() || !newAuthor.trim()) return; // Prevent empty submissions
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/quotes", {
        quote: newQuote,
        author: newAuthor,
      });
      setQuotes([...quotes, response.data]);
      setNewQuote(""); // Clear input after submission
      setNewAuthor(""); // Clear input after submission
    } catch (err) {
      setError("Failed to add quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a quote
  const deleteQuote = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/quotes/${id}`);
      setQuotes(quotes.filter((quote) => quote.id !== id)); // Remove from UI
    } catch (err) {
      setError("Failed to delete quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch quotes on component mount
  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Motivational Quotes
        </h1>

        {/* Display loading/error messages */}
        {loading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Quotes list */}
        <div className="space-y-4 mb-6">
          {quotes.map((quote) => (
            <div
              key={quote.id}
              className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition duration-200 flex justify-between items-center"
            >
              <div>
                <p className="text-gray-700 font-semibold">"{quote.quote}"</p>
                <p className="text-gray-500 text-sm">- {quote.author}</p>
              </div>
              <button
                onClick={() => deleteQuote(quote.id)}
                className="text-red-500 hover:text-red-700 transition duration-200"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* Input for new quote */}
        <div className="space-y-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Add a new quote..."
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
          />
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Add the author..."
            value={newAuthor}
            onChange={(e) => setNewAuthor(e.target.value)}
          />
          <button
            onClick={addQuote}
            className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg shadow hover:bg-orange-700 transition duration-200"
          >
            Add Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default Motivational_quotes;