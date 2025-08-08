import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { PlusCircle, Trash } from "lucide-react";
import { useLocation } from "react-router-dom";

const BudgetPlannerPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const selectedPackage = location.state?.selectedPackage;

  const [totalBudget] = useState(
    selectedPackage ? parseInt(selectedPackage.price.replace(/\D/g, "")) : 0
  );

  const [categories, setCategories] = useState([
    { name: "Venue & Reception", spent: 16500, budget: 18000 },
    { name: "Catering & Bar", spent: 8500, budget: 12000 },
    { name: "Photography & Video", spent: 4200, budget: 4500 },
    { name: "Flowers & Decor", spent: 2800, budget: 3500 },
    { name: "Attire & Beauty", spent: 1950, budget: 2500 },
    { name: "Music & Entertainment", spent: 1800, budget: 2000 },
    { name: "Transportation", spent: 0, budget: 1500 },
    { name: "Miscellaneous", spent: 650, budget: 1000 },
  ]);

  const [recentExpenses, setRecentExpenses] = useState([
    { desc: "Final venue payment", amount: 8500, category: "Venue & Reception", date: "2024-01-15" },
    { desc: "Engagement party catering", amount: 1200, category: "Catering & Bar", date: "2024-01-10" },
    { desc: "Save the date cards", amount: 180, category: "Miscellaneous", date: "2024-01-08" },
    { desc: "Bridal bouquet deposit", amount: 500, category: "Flowers & Decor", date: "2024-01-05" },
  ]);

  const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
  const remaining = totalBudget - totalSpent;
  const percentUsed = totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(0) : 0;

  // Quick Add Expense
  const [newExpense, setNewExpense] = useState({ desc: "", amount: "", category: "Venue & Reception" });

  const handleAddExpense = () => {
    if (!newExpense.desc || !newExpense.amount || isNaN(newExpense.amount)) return;
    const expenseAmount = parseFloat(newExpense.amount);

    // Update category spent
    setCategories((prev) =>
      prev.map((cat) =>
        cat.name === newExpense.category ? { ...cat, spent: cat.spent + expenseAmount } : cat
      )
    );

    const newEntry = {
      desc: newExpense.desc,
      amount: expenseAmount,
      category: newExpense.category,
      date: new Date().toISOString().split("T")[0],
    };
    setRecentExpenses([newEntry, ...recentExpenses]);

    setNewExpense({ desc: "", amount: "", category: "Venue & Reception" });
  };

  const handleDeleteExpense = (index) => {
    const expenseToRemove = recentExpenses[index];

    setCategories((prev) =>
      prev.map((cat) =>
        cat.name === expenseToRemove.category
          ? { ...cat, spent: cat.spent - expenseToRemove.amount }
          : cat
      )
    );

    setRecentExpenses(recentExpenses.filter((_, i) => i !== index));
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = ["Home", "About", "Services", "Contact"];

  return (
    <div className="bg-[#FFFDF5] min-h-screen">
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
          <li>
            <button className="bg-[#E2725B] hover:bg-[#c65b45] text-white px-4 py-2 rounded-full text-sm">
              Book Now
            </button>
          </li>
        </ul>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#B7410E] text-xl">
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      <div className="pt-28 px-6 max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-[#B7410E]">
          Wedding Budget <span className="text-[#708238]">Tracker</span>
        </h1>
        <p className="text-center text-[#4A4A4A] mt-2">
          Keep your dream wedding on track and within budget
        </p>

        {/* Fixed Total Budget */}
        <div className="mt-6 flex flex-col items-center">
          <p className="text-sm font-medium text-[#4A4A4A] mb-2">Total Wedding Budget</p>
          <p className="text-3xl font-bold text-[#B7410E]">
            ${totalBudget.toLocaleString()}
          </p>
          {selectedPackage && (
            <p className="text-sm text-gray-500 mt-1">(From selected package: {selectedPackage.name})</p>
          )}
        </div>

        {/* Budget Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">
          <div className="bg-[#B7410E] text-white p-6 rounded-xl shadow">
            <p>Total Budget</p>
            <h2 className="text-3xl font-bold">${totalBudget.toLocaleString()}</h2>
          </div>
          <div className="bg-[#E6F0E0] p-6 rounded-xl shadow">
            <p>Remaining</p>
            <h2 className="text-3xl font-bold text-[#708238]">${remaining.toLocaleString()}</h2>
          </div>
          <div className="bg-[#FAE4DA] p-6 rounded-xl shadow">
            <p>Total Spent</p>
            <h2 className="text-3xl font-bold text-[#B7410E]">${totalSpent.toLocaleString()}</h2>
          </div>
          <div className="bg-[#FFF0E8] p-6 rounded-xl shadow">
            <p>% Used</p>
            <h2 className="text-3xl font-bold text-[#E2725B]">{percentUsed}%</h2>
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <p className="mb-2 text-[#4A4A4A] font-medium">Overall Progress</p>
          <div className="w-full bg-stone-200 h-4 rounded-full">
            <div className="h-4 rounded-full bg-[#E2725B]" style={{ width: `${percentUsed}%` }}></div>
          </div>
          <p className="mt-2 text-sm text-[#6F6F6F]">
            ${totalSpent.toLocaleString()} of ${totalBudget.toLocaleString()}
          </p>
        </div>

        {/* Categories + Quick Add Expense */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Categories */}
          <div className="col-span-2">
            <h2 className="text-2xl font-bold text-[#B7410E] mb-6">Budget Categories</h2>
            <div className="space-y-6">
              {categories.map((cat, i) => {
                const percent = ((cat.spent / cat.budget) * 100).toFixed(0);
                return (
                  <div key={i} className="bg-white p-5 rounded-xl shadow border border-[#E6E0D0]">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-[#4A4A4A]">{cat.name}</p>
                        <p className="text-sm text-[#6F6F6F]">
                          ${cat.spent.toLocaleString()} of ${cat.budget.toLocaleString()}
                        </p>
                      </div>
                      <p className="text-[#708238] font-medium">
                        ${cat.budget - cat.spent} remaining
                      </p>
                    </div>
                    <div className="w-full bg-stone-200 h-3 rounded-full mt-3">
                      <div
                        className="h-3 rounded-full bg-gradient-to-r from-[#8B2E14] to-[#E2725B] transition-all duration-700 ease-in-out"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-[#6F6F6F] mt-1">{percent}% used</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Add Expense + Recent Expenses */}
          <div>
            <div className="bg-white p-6 rounded-xl shadow mb-8">
              <h3 className="font-semibold text-lg mb-4 text-[#B7410E]">Quick Add Expense</h3>
              <input
                type="text"
                placeholder="Expense description"
                value={newExpense.desc}
                onChange={(e) => setNewExpense({ ...newExpense, desc: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 mb-3"
              />
              <input
                type="number"
                placeholder="Amount ($)"
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 mb-3"
              />
              <select
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 mb-3"
              >
                {categories.map((cat, i) => (
                  <option key={i}>{cat.name}</option>
                ))}
              </select>
              <button
                onClick={handleAddExpense}
                className="bg-[#E2725B] hover:bg-[#c65b45] text-white w-full py-2 rounded-lg flex items-center justify-center gap-2"
              >
                <PlusCircle size={18} /> Add Expense
              </button>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-4 text-[#B7410E]">Recent Expenses</h3>
              <div className="space-y-4">
                {recentExpenses.map((exp, i) => (
                  <div key={i} className="flex justify-between text-sm items-center">
                    <div>
                      <p className="font-medium text-[#4A4A4A]">{exp.desc}</p>
                      <p className="text-[#6F6F6F]">
                        {exp.category} · {exp.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-[#B7410E] font-semibold">${exp.amount.toLocaleString()}</p>
                      <button
                        onClick={() => handleDeleteExpense(i)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Tips */}
            <div className="bg-[#FAF3E0] p-6 rounded-xl shadow mt-8">
              <h3 className="font-semibold text-lg mb-3 text-[#B7410E]">💡 Budget Tips</h3>
              <ul className="list-disc pl-5 text-sm text-[#4A4A4A] space-y-2">
                <li>Set aside 5–10% for unexpected costs</li>
                <li>Book vendors early for better rates</li>
                <li>Consider weekday weddings for savings</li>
                <li>DIY decorations can cut costs significantly</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPlannerPage;
