import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaCrown,
  FaHeart,
  FaStar,
  FaGem,
  FaLeaf,
  FaSun,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SeePackages=() => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

 const handlePackageClick = (pkg) => {
  setSelectedPackage(pkg);
  const { icon, ...safePkg } = pkg; 

  const token = localStorage.getItem("authToken");
  if (token) {
    navigate(pkg.route, { state: { selectedPackage: safePkg } }); 
  } else {
    localStorage.setItem("pendingPackage", JSON.stringify(safePkg));
    setShowModal(true);
  }
};


  const packages = [
  {
    icon: <FaStar className="text-yellow-500 text-3xl" />,
    name: "Hilltop Shimla Celebration",
    price: "₹4,80,000",
     route: "/hilltop",
    features: [
      "Snowy mountain venue",
      "Bonfire & acoustic night",
      "Luxury homestays for guests",
      "Winter theme decor",
    ],
  },
  {
    icon: <FaSun className="text-orange-400 text-3xl" />,
    name: "Goa Beach Wedding",
    price: "₹5,00,000",
    route:"/goabeach",
    features: [
      "Beachfront venue setup",
      "Sundowner mehendi & sangeet",
      "Live DJ & cocktail coordination",
      "Professional beach photography",
    ],
  },
  {
    icon: <FaLeaf className="text-green-500 text-3xl" />,
    name: "Kerala Backwater Bliss",
    price: "₹6,50,000",
    features: [
      "Houseboat wedding setup",
    "Banana leaf catering",
    "Temple-style traditional rituals",
    "Classical music & kathakali dance show",
    ],
  },
  {
    icon: <FaHeart className="text-pink-600 text-3xl" />,
    name: "Jaipur Regal Affair",
    price: "₹9,00,000",
    features: [
      "Haveli venue with royal procession",
      "Mehendi & haldi in courtyard setup",
      "Camel ride + folk musicians",
      "Custom bridal entry & fireworks",
    ],
  },
  {
    icon: <FaGem className="text-blue-500 text-3xl" />,
    name: "Udaipur Royal Palace",
    price: "₹12,00,000",
    features: [
      "Heritage palace venue booking",
      "Traditional Rajputana decor",
      "Elephant or horse baraat",
      "Custom theme & 3-day itinerary",
    ],
  },
  {
    icon: <FaCrown className="text-purple-600 text-3xl" />,
    name: "Custom Destination Dream",
    price: "Starts from ₹3,50,000",
    route:"/consultation",
    features: [
      "Plan anywhere: Goa, Udaipur, Jaipur, Kerala, more",
      "100% customized itinerary & theme",
      "Logistics, guests, decor – fully managed",
    ],
  },
];


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#FFFDF5] text-[#333] min-h-screen py-20 px-6 md:px-12"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-[#B7410E]">
          Explore Our Wedding Packages
        </h1>
        <p className="mt-4 text-[#555] text-lg">
          Thoughtfully crafted packages for every kind of celebration.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {packages.map((pkg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            whileHover={{ scale: 1.03 }}
            className="bg-white rounded-3xl shadow-xl p-8 text-center border border-[#f1e9d7] hover:shadow-2xl hover:border-[#e5d4ba] transition-all duration-300"
          >
            <div className="mb-4">{pkg.icon}</div>
            <h2 className="text-2xl font-bold text-[#B7410E]">{pkg.name}</h2>
            <p className="text-xl font-semibold text-[#708238] my-2">
              {pkg.price}
            </p>
            <ul className="text-sm text-[#4A4A4A] space-y-2 my-4">
              {pkg.features.map((feature, idx) => (
                <li key={idx}>• {feature}</li>
              ))}
            </ul>
            <motion.button
  whileTap={{ scale: 0.95 }}
  onClick={() => handlePackageClick(pkg)}
  className="mt-4 bg-[#E2725B] hover:bg-[#c65b45] text-white px-6 py-2 rounded-full transition"
>
  {pkg.name === "Custom Destination Dream" ? "Customize" : "Choose This Plan"}
</motion.button>
          </motion.div>
        ))}
      </div>

      {/* Login Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 p-4">
          <div className="bg-[#FFFDF5] p-8 rounded-2xl shadow-2xl max-w-sm w-full">
            <h2 className="text-2xl font-bold text-[#B7410E] mb-2">
              Login Required
            </h2>
            <p className="text-sm text-gray-700 mb-6">
              To continue with{" "}
              <strong className="text-[#B7410E]">
                {selectedPackage?.name}
              </strong>
              , please login or sign up first.
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  navigate("/login");
                }}
                className="w-full px-6 py-3 bg-[#B7410E] text-white font-medium rounded-lg hover:bg-[#a13a0c] transition"
              >
                Login / Signup
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full px-6 py-3 bg-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
export default SeePackages;