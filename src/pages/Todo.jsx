import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [lateCompletedTasks, setLateCompletedTasks] = useState([]);
  const [dueTasks, setDueTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todo/");
      const allTasks = response.data;
      const currentDate = new Date();

      setTasks(
        allTasks.filter(
          (task) =>
            task.status === "Pending" && new Date(task.deadline) >= currentDate
        )
      );
      setDueTasks(
        allTasks.filter(
          (task) =>
            task.status === "Pending" && new Date(task.deadline) < currentDate
        )
      );
      setCompletedTasks(
        allTasks.filter((task) => task.status === "Completed")
      );
      setLateCompletedTasks(
        allTasks.filter((task) => task.status === "Late Completed")
      );
    } catch (error) {
      setMessage("Error fetching tasks");
    }
  };

  const formatDate = (date) => {
    const options = { weekday: "long", year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const handleAddTask = async () => {
    try {
      await axios.post("http://localhost:5000/api/todo/", {
        task: newTask,
        deadline,
        status: "Pending",
      });
      setNewTask("");
      setDeadline("");
      fetchTasks();
      setIsModalOpen(false);
    } catch (error) {
      setMessage("Error adding task");
    }
  };

  const handleStatusChange = async (id, isDue = false) => {
    try {
      const updatedStatus = isDue ? "Late Completed" : "Completed";
      await axios.put(`http://localhost:5000/api/todo/${id}`, { status: updatedStatus });
      fetchTasks();
    } catch (error) {
      setMessage("Error updating task status");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/${id}`);
      fetchTasks();
    } catch (error) {
      setMessage("Error deleting task");
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Title and Add Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">To-Do List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Add Task
        </button>
      </div>

      {/* Modal for Adding a Task */}
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Add a New Task</h2>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task description"
              className="p-2 border border-gray-300 rounded w-full mb-4"
            />
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="p-2 border border-gray-300 rounded w-full mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Pending Tasks */}
      <h2 className="text-2xl font-semibold mb-2">Pending Tasks</h2>
      <TaskTable
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteTask}
      />

      {/* Due Tasks */}
      <h2 className="text-2xl font-semibold mb-2">Due Tasks</h2>
      <TaskTable
        tasks={dueTasks}
        onStatusChange={(id) => handleStatusChange(id, true)}
        onDelete={handleDeleteTask}
      />

      {/* Completed Tasks */}
      <h2 className="text-2xl font-semibold mb-2">Completed Tasks</h2>
      <TaskTable tasks={completedTasks} onDelete={handleDeleteTask} />

      {/* Late Completed Tasks */}
      <h2 className="text-2xl font-semibold mb-2">Late Completed Tasks</h2>
      <TaskTable tasks={lateCompletedTasks} onDelete={handleDeleteTask} />
    </div>
  );
};

const TaskTable = ({ tasks, onStatusChange, onDelete }) => {
  return (
    <table className="min-w-full bg-white border border-gray-300 mb-6">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Task</th>
          <th className="p-2 text-left">Deadline</th>
          {onStatusChange && <th className="p-2 text-left">Status</th>}
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.length === 0 ? (
          <tr>
            <td colSpan={onStatusChange ? 4 : 3} className="p-4 text-center">
              No tasks available.
            </td>
          </tr>
        ) : (
          tasks.map((task) => (
            <tr key={task.id} className="border-b">
              <td className="p-2">{task.task}</td>
              <td className="p-2">{new Date(task.deadline).toLocaleDateString()}</td>
              {onStatusChange && (
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={task.status === "Completed" || task.status === "Late Completed"}
                    onChange={() => onStatusChange(task.id)}
                    className="form-checkbox"
                  />
                </td>
              )}
              <td className="p-2 flex items-center space-x-2">
                <FaTrash
                  onClick={() => onDelete(task.id)}
                  className="text-red-500 cursor-pointer hover:text-red-600"
                />
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Todo;
