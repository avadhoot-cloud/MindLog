import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const BucketList = () => {
  const [items, setItems] = useState([]);
  const [completedItems, setCompletedItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [status, setStatus] = useState('Pending');
  const [message, setMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // For toggling modal visibility

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/bucketlist/');
      const allItems = response.data;
      setItems(allItems.filter(item => item.status === 'Pending'));
      setCompletedItems(allItems.filter(item => item.status === 'Completed'));
    } catch (error) {
      setMessage('Error fetching items');
    }
  };

  const handleAddItem = async () => {
    try {
      await axios.post('http://localhost:5000/api/bucketlist/', { item: newItem, status });
      setNewItem('');
      fetchItems();
      setIsModalOpen(false); // Close the modal after adding item
    } catch (error) {
      setMessage('Error adding item');
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bucketlist/${id}`, { status });
      fetchItems();
    } catch (error) {
      setMessage('Error updating status');
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bucketlist/${id}`);
      fetchItems();
    } catch (error) {
      setMessage('Error deleting item');
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Adjusted Row for Title and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Bucket List</h1>
        <button
          onClick={() => setIsModalOpen(true)} // Open modal when button is clicked
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Add Item
        </button>
      </div>

      {/* Modal for adding an item */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Add a New Item</h2>
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="Enter item text"
              className="p-2 border border-gray-300 rounded w-full mb-4"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full mb-4"
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)} // Close modal without saving
                className="p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem} // Add item
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pending Items Table */}
      <table className="min-w-full bg-white border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Item</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-4 text-center">No items in the bucket list.</td>
            </tr>
          ) : (
            items.map(item => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.item}</td>
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={item.status === 'Completed'}
                    onChange={() => handleStatusChange(item.id, item.status === 'Completed' ? 'Pending' : 'Completed')}
                    className="form-checkbox"
                  />
                </td>
                <td className="p-2 flex items-center space-x-2">
                  <FaTrash
                    onClick={() => handleDeleteItem(item.id)}
                    className="text-red-500 cursor-pointer hover:text-red-600"
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Completed Items Table */}
      <h2 className="text-2xl font-semibold mb-2">Completed Items</h2>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Item</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {completedItems.length === 0 ? (
            <tr>
              <td colSpan="2" className="p-4 text-center">No completed items.</td>
            </tr>
          ) : (
            completedItems.map(item => (
              <tr key={item.id} className="border-b">
                <td className="p-2">{item.item}</td>
                <td className="p-2">{item.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BucketList;
