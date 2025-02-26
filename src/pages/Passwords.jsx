import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // Import trash icon

const Passwords = () => {
  const [passwords, setPasswords] = useState([]);
  const [newPassword, setNewPassword] = useState({
    passName: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch passwords from the backend
  const fetchPasswords = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/passwords");
      setPasswords(response.data);
    } catch (err) {
      setError("Failed to fetch passwords. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add a new password to the backend
  const addPassword = async () => {
    if (
      !newPassword.passName.trim() ||
      !newPassword.username.trim() ||
      !newPassword.password.trim()
    ) {
      setError("All fields are required.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/passwords", newPassword);
      setPasswords([...passwords, response.data]);
      setNewPassword({ passName: "", username: "", password: "" }); // Clear form
    } catch (err) {
      setError("Failed to add password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete a password
  const deletePassword = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/passwords/${id}`);
      setPasswords(passwords.filter((password) => password.id !== id)); // Remove from UI
    } catch (err) {
      setError("Failed to delete password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch passwords on component mount
  useEffect(() => {
    fetchPasswords();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Passwords Manager</h1>

        {/* Display loading/error messages */}
        {loading && <p className="text-blue-500">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Passwords table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Username</th>
                <th className="py-2 px-4 border-b">Password</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {passwords.map((password) => (
                <tr key={password.id} className="hover:bg-gray-50 transition duration-200">
                  <td className="py-2 px-4 border-b">{password.passName}</td>
                  <td className="py-2 px-4 border-b">{password.username}</td>
                  <td className="py-2 px-4 border-b">{password.password}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => deletePassword(password.id)}
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

        {/* Input for new password */}
        <div className="mt-6 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Add New Password</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Name (e.g., Gmail)"
              value={newPassword.passName}
              onChange={(e) => setNewPassword({ ...newPassword, passName: e.target.value })}
            />
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Username"
              value={newPassword.username}
              onChange={(e) => setNewPassword({ ...newPassword, username: e.target.value })}
            />
            <input
              type="password"
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              value={newPassword.password}
              onChange={(e) => setNewPassword({ ...newPassword, password: e.target.value })}
            />
          </div>
          <button
            onClick={addPassword}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            Add Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Passwords;