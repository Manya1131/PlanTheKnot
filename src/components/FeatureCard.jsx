import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export default function FeatureCard({ title, desc,to }) {
  return (
    <Link to={to || "#"}>
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="bg-pink-50 p-6 rounded-xl shadow hover:shadow-lg transition"
    >
      <h4 className="text-xl font-semibold text-pink-600">{title}</h4>
      <p className="text-gray-600 mt-2">{desc}</p>
    </motion.div>
    </Link>
  );
}
