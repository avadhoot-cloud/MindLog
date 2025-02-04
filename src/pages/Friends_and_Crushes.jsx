import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const Friends_and_Crushes = () => {
  const [friends, setFriends] = useState([]);
  const [crushes, setCrushes] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("Friend"); // Default type
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/friends/");
      const allEntries = response.data;
      setFriends(allEntries.filter((entry) => entry.type === "Friend"));
      setCrushes(allEntries.filter((entry) => entry.type === "Crush"));
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleAddEntry = async () => {
    try {
      await axios.post("http://localhost:5000/api/friends/", { name, type, description });
      setName("");
      setDescription("");
      setType("Friend"); // Reset to default
      fetchData();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding entry", error);
    }
  };

  const handleDeleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/friends/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting entry", error);
    }
  };

  const EntryTable = ({ title, entries, type }) => (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Description</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-4 text-center">
                No {type.toLowerCase()} yet.
              </td>
            </tr>
          ) : (
            entries.map((entry) => (
              <tr key={entry.id} className="border-b">
                <td className="p-2">{entry.name}</td>
                <td className="p-2">{entry.description}</td>
                <td className="p-2 flex items-center space-x-2">
                  <FaTrash
                    onClick={() => handleDeleteEntry(entry.id)}
                    className="text-red-500 cursor-pointer hover:text-red-600"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      {/* Row for Title and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Friends & Crushes</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add Entry
        </button>
      </div>

      {/* Modal for adding an entry */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Add New Entry</h2>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
              className="p-2 border border-gray-300 rounded w-full mb-4"
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              className="p-2 border border-gray-300 rounded w-full mb-4"
            ></textarea>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full mb-4"
            >
              <option value="Friend">Friend</option>
              <option value="Crush">Crush</option>
            </select>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEntry}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Friend Table */}
      <EntryTable title="Friends" entries={friends} type="Friend" />

      {/* Crush Table */}
      <EntryTable title="Crushes" entries={crushes} type="Crush" />
    </div>
  );
};

export default Friends_and_Crushes;
