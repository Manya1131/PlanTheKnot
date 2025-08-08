import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-pink-600">Smart Wedding Planner</h1>
      <nav className="space-x-6">
        <Link to="/budget" className="text-gray-600 hover:text-pink-500">Budget</Link>
        <a href="#features" className="text-gray-600 hover:text-pink-500">Features</a>
        <a href="#ai-planner" className="text-gray-600 hover:text-pink-500">AI Planner</a>
        <a href="#" className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition">Get Started</a>
      </nav>
    </header>
  );
}
