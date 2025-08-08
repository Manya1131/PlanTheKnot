import React, { useState } from "react";
import { CheckCircle, Circle, ChevronDown, ChevronUp } from "lucide-react";
import { FaBars, FaTimes } from "react-icons/fa";

const SmartChecklist = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Set wedding date & budget", desc: "Decide on your wedding date and set a realistic budget.", due: "2025-09-01", priority: "High", months: "12+ months", completed: true },
    { id: 2, title: "Book ceremony & reception venues", desc: "Research and book venues for ceremony and reception.", due: "2025-10-01", priority: "High", months: "12+ months", completed: true },
    { id: 3, title: "Create guest list draft", desc: "Compile initial guest list with both families' input.", due: "2025-10-15", priority: "Medium", months: "9-11 months", completed: false },
    { id: 4, title: "Book wedding photographer", desc: "Hire a photographer and videographer for your big day.", due: "2025-11-01", priority: "High", months: "9-11 months", completed: false },
    { id: 5, title: "Order wedding attire", desc: "Shop for and order wedding dress & suits.", due: "2025-12-01", priority: "Medium", months: "6-8 months", completed: false },
  ]);

  const completedTasks = tasks.filter((t) => t.completed).length;
  const progress = ((completedTasks / tasks.length) * 100).toFixed(0);

  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ title: "", desc: "", due: "", priority: "Medium", months: "6-8 months" });
  const [expandedSections, setExpandedSections] = useState({
    "12+ months": true,
    "9-11 months": true,
    "6-8 months": true,
    "3-5 months": true,
  });

  const navLinks = ["Home", "About", "Services", "Contact"];

  const toggleTask = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleAddTask = () => {
    if (!newTask.title || !newTask.due) return;
    setTasks([...tasks, { ...newTask, id: Date.now(), completed: false }]);
    setNewTask({ title: "", desc: "", due: "", priority: "Medium", months: "6-8 months" });
    setShowAddTask(false);
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const groupedTasks = {
    "12+ months": tasks.filter((t) => t.months === "12+ months"),
    "9-11 months": tasks.filter((t) => t.months === "9-11 months"),
    "6-8 months": tasks.filter((t) => t.months === "6-8 months"),
    "3-5 months": tasks.filter((t) => t.months === "3-5 months"),
  };

  return (
    <div className="bg-[#FFFDF5] min-h-screen p-6">
      {/* Navbar */}
      <nav
        className={`flex items-center justify-between px-6 py-4 fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/60 backdrop-blur-sm shadow-sm" : "bg-white"
        }`}
      >
        <h1 className="text-2xl font-bold text-[#B7410E]">PlanTheKnot</h1>
        <ul className="hidden md:flex space-x-6 items-center font-medium text-[#708238]">
          {navLinks.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase()}`} className="hover:text-[#B7410E] transition">
                {link}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#B7410E] text-xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <div className="pt-27.5 px-6 max-w-6xl mx-auto">
        {/* Title */}
        {/* <h1 className="text-4xl font-bold text-[#B7410E] text-center">
          Smart Wedding Checklist
        </h1>
        <p className="text-center text-stone-600 mt-2">
          Stay organized and never miss a detail!
        </p> */}

        {/* Top Section - Dashboard Style */}
<div className="mt-6 bg-gradient-to-r from-[#FFF2E5] to-[#FFEFE8] p-8 rounded-2xl shadow flex flex-col md:flex-row justify-between items-center gap-6">
  {/* Left: Title + Overview */}
  <div className="flex-1">
    <h1 className="text-4xl font-bold text-[#B7410E]">
      Smart Wedding Checklist
    </h1>
    <p className="text-stone-600 mt-2 text-lg">
      Stay organized and track your wedding plans like a pro.
    </p>
    {/* Quick Stats */}
    <div className="mt-6 grid grid-cols-3 gap-4">
      <div className="bg-white rounded-xl p-4 text-center shadow">
        <h3 className="text-2xl font-bold text-[#B7410E]">{completedTasks}</h3>
        <p className="text-sm text-stone-600">Completed</p>
      </div>
      <div className="bg-white rounded-xl p-4 text-center shadow">
        <h3 className="text-2xl font-bold text-[#E2725B]">{tasks.length - completedTasks}</h3>
        <p className="text-sm text-stone-600">Pending</p>
      </div>
      <div className="bg-white rounded-xl p-4 text-center shadow">
        <h3 className="text-2xl font-bold text-[#FF6B6B]">
          {tasks.filter((t) => new Date(t.due) < new Date() && !t.completed).length}
        </h3>
        <p className="text-sm text-stone-600">Overdue</p>
      </div>
    </div>
  </div>

  {/* Right: Circular Progress */}
  <div className="relative w-48 h-48 flex-shrink-0">
    <svg className="w-full h-full transform -rotate-90">
      <circle cx="96" cy="96" r="80" stroke="#f3f3f3" strokeWidth="14" fill="none" />
      <circle
        cx="96"
        cy="96"
        r="80"
        stroke="#B7410E"
        strokeWidth="14"
        fill="none"
        strokeDasharray={2 * Math.PI * 80}
        strokeDashoffset={2 * Math.PI * 80 - (progress / 100) * 2 * Math.PI * 80}
        strokeLinecap="round"
      />
    </svg>
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <p className="text-3xl font-bold text-[#B7410E]">{progress}%</p>
      <span className="text-sm text-stone-600">Completed</span>
    </div>
  </div>
</div>


        {/* Add Task Button */}
        <div className="flex justify-between items-center mt-8">
          <h2 className="text-xl font-semibold text-stone-800">Your Tasks</h2>
          <button
            onClick={() => setShowAddTask(!showAddTask)}
            className="bg-gradient-to-r from-[#B7410E] to-[#E2725B] text-white px-4 py-2 rounded-lg shadow hover:opacity-90"
          >
            + Add Task
          </button>
        </div>

        {/* Add Task Form */}
        {showAddTask && (
          <div className="bg-white p-5 rounded-xl shadow mt-4 space-y-3">
            <input
              type="text"
              placeholder="Task Title"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
            <textarea
              placeholder="Task Description"
              value={newTask.desc}
              onChange={(e) => setNewTask({ ...newTask, desc: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="date"
              value={newTask.due}
              onChange={(e) => setNewTask({ ...newTask, due: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select
              value={newTask.months}
              onChange={(e) => setNewTask({ ...newTask, months: e.target.value })}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option>12+ months</option>
              <option>9-11 months</option>
              <option>6-8 months</option>
              <option>3-5 months</option>
            </select>
            <button
              onClick={handleAddTask}
              className="w-full bg-gradient-to-r from-[#B7410E] to-[#E2725B] text-white px-4 py-2 rounded-lg shadow"
            >
              Save Task
            </button>
          </div>
        )}

        {/* Grouped Checklist */}
        <div className="mt-8 space-y-6">
          {Object.keys(groupedTasks).map((section) => (
            <div key={section} className="bg-white rounded-xl shadow">
              <div
                onClick={() => toggleSection(section)}
                className="flex justify-between items-center p-4 cursor-pointer bg-[#FFF2E5]"
              >
                <h3 className="text-lg font-semibold text-[#B7410E]">{section}</h3>
                {expandedSections[section] ? <ChevronUp /> : <ChevronDown />}
              </div>
              {expandedSections[section] && (
                <div className="p-5 space-y-4">
                  {groupedTasks[section].length > 0 ? (
                    groupedTasks[section].map((task) => (
                      <div
                        key={task.id}
                        className={`bg-white p-5 rounded-xl shadow flex items-start gap-4 border ${
                          task.completed ? "opacity-70" : ""
                        }`}
                      >
                        <button onClick={() => toggleTask(task.id)}>
                          {task.completed ? (
                            <CheckCircle className="text-green-500" />
                          ) : (
                            <Circle className="text-stone-400" />
                          )}
                        </button>
                        <div>
                          <h3
                            className={`text-lg font-semibold ${
                              task.completed ? "line-through text-stone-500" : "text-stone-800"
                            }`}
                          >
                            {task.title}
                          </h3>
                          <p className="text-stone-500 text-sm">{task.desc}</p>
                          <div className="flex gap-3 mt-2 text-xs text-stone-600">
                            <span className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full">
                              {task.priority}
                            </span>
                            <span className="text-stone-500">Due: {task.due}</span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-stone-500 text-sm">No tasks in this section.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SmartChecklist;
