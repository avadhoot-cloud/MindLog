import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineFire } from 'react-icons/ai';
import { MdCheck, MdDelete, MdClose } from 'react-icons/md';

const Diary = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [streak, setStreak] = useState(0);
  const [entries, setEntries] = useState({});
  const [modalContent, setModalContent] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/diary?month=${month + 1}&year=${year}`);
        setEntries(response.data.entries);
        setStreak(response.data.streak);
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      }
    };

    const calculateDaysInMonth = () => {
      const date = new Date(year, month + 1, 0);
      const days = Array.from({ length: date.getDate() }, (_, i) => i + 1);
      setDaysInMonth(days);
    };

    fetchEntries();
    calculateDaysInMonth();
  }, [month, year]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setModalContent(entries[date] || '');
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:5000/api/diary`, {
        date: `${year}-${month + 1}-${selectedDate}`,
        content: modalContent,
      });
      setEntries((prev) => ({ ...prev, [selectedDate]: modalContent }));
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving diary entry:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/diary`, {
        data: { date: `${year}-${month + 1}-${selectedDate}` },
      });
      setEntries((prev) => {
        const updatedEntries = { ...prev };
        delete updatedEntries[selectedDate];
        return updatedEntries;
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error deleting diary entry:', error);
    }
  };

  const nextMonth = () => setMonth((prev) => (prev + 1) % 12);
  const prevMonth = () => setMonth((prev) => (prev === 0 ? 11 : prev - 1));

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* Header with Month, Year Selectors, and Streak */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <button className="btn" onClick={prevMonth}> &lt; </button>
          <span className="text-xl font-semibold">{new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
          <button className="btn" onClick={nextMonth}> &gt; </button>
        </div>
        <div className="flex items-center text-orange-500 font-bold">
          <AiOutlineFire className="mr-2" size={24} /> {streak}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4 border border-gray-200 rounded-lg p-4">
        {daysInMonth.map((day) => (
          <div
            key={day}
            onClick={() => handleDateClick(day)}
            className={`border p-2 rounded-lg cursor-pointer text-center ${entries[day] ? 'bg-blue-100' : 'bg-gray-100'}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gradient-to-r from-purple-200 via-pink-100 to-blue-200 rounded-lg p-8 max-w-3xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Diary Entry for {selectedDate}/{month + 1}/{year}</h2>
              <MdClose
                className="text-gray-500 cursor-pointer text-3xl"
                title="Close"
                onClick={() => setIsModalOpen(false)}
              />
            </div>
            <textarea
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:outline-none text-lg"
              placeholder="Write your diary entry here..."
              value={modalContent}
              onChange={(e) => setModalContent(e.target.value)}
            ></textarea>
            <div className="mt-6 flex justify-between items-center">
              <MdDelete
                className="text-red-500 cursor-pointer text-3xl"
                title="Delete"
                onClick={handleDelete}
              />
              <MdCheck
                className="text-green-500 cursor-pointer text-3xl"
                title="Save"
                onClick={handleSave}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Diary;
