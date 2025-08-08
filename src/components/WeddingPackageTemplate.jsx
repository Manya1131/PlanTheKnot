// src/components/WeddingPackageTemplate.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const WeddingPackageTemplate = ({
  title,
  basePrice,
  heroImage,
  theme,
  overviewText,
  itinerary,
  inclusions,
  addOns,
  galleryImages,
  venues,
  costBreakdown,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(venues?.[0] || null);
  const [venueCost, setVenueCost] = useState(venues?.[0]?.surcharge || 0);

  const [showBreakdown, setShowBreakdown] = useState(false);

  useEffect(() => {
    if (selectedVenue) setVenueCost(selectedVenue.surcharge);
  }, [selectedVenue]);

  const handleAddOnChange = (addonName) => {
    setSelectedAddOns((prev) =>
      prev.includes(addonName)
        ? prev.filter((name) => name !== addonName)
        : [...prev, addonName]
    );
  };
  
  const totalAddOnCost = addOns
    .filter((addon) => selectedAddOns.includes(addon.name))
    .reduce((sum, addon) => sum + addon.cost, 0);

  const totalCost = basePrice + totalAddOnCost + (venueCost || 0);

  const handleSelectPackage = (pkg) => {
  
  const token = localStorage.getItem("authToken");
  if (!token) {
    localStorage.setItem("pendingPackage", JSON.stringify(pkg));
    navigate("/login");
  } else {
    navigate(pkg.path, { state: { selectedPackage: pkg } });
  }
};

  return (
    <div className="bg-[#FFFDF5] min-h-screen">
      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[350px] md:h-[500px]"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent flex flex-col justify-center items-center text-white text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold"
          >
            {title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-2xl font-semibold"
          >
            Starting at ₹{basePrice.toLocaleString()}
          </motion.p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-5xl mx-auto py-8 px-6">
        <div className="flex justify-center gap-4 mb-8">
          {["overview", "itinerary", "inclusions", "addons"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-lg font-semibold transition ${
                activeTab === tab
                  ? `text-white`
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              style={{
                backgroundColor: activeTab === tab ? theme.primary : undefined,
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-md text-center"
          >
            <h2 className="text-3xl font-bold mb-4" style={{ color: theme.primary }}>
              About This Celebration
            </h2>
            <p className="text-gray-700">{overviewText}</p>
          </motion.div>
        )}

        {activeTab === "itinerary" && (
          <div className="space-y-6">
            {itinerary.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <h3 className="text-xl font-bold" style={{ color: theme.primary }}>
                  {event.day}
                </h3>
                <p className="mt-2 text-gray-700">{event.details}</p>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === "inclusions" && (
          <div>
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {inclusions.map((inc, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl shadow-md flex flex-col items-center text-center"
                  style={{ backgroundColor: theme.inclusionBg }}
                >
                  <div className="text-4xl mb-3" style={{ color: theme.primary }}>
                    {inc.icon}
                  </div>
                  <p className="font-medium text-gray-700">{inc.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Venue Selection */}
            {venues && venues.length > 0 && (
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-bold mb-4" style={{ color: theme.primary }}>
                  Select Your Venue
                </h3>
                <div className="space-y-4">
                  {venues.map((venue, i) => (
                    <div
                      key={i}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        selectedVenue?.name === venue.name
                          ? "border-2"
                          : "border-gray-200"
                      }`}
                      style={{
                        borderColor:
                          selectedVenue?.name === venue.name ? theme.primary : undefined,
                      }}
                      onClick={() => setSelectedVenue(venue)}
                    >
                      <h4 className="text-lg font-semibold">{venue.name}</h4>
                      <p className="text-sm text-gray-600">{venue.location}</p>
                      <p className="text-sm text-gray-600">{venue.capacity}</p>
                      <p className="mt-1 font-medium text-gray-800">
                        Additional Cost: +₹{venue.surcharge.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "addons" && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            {addOns.map((addon, i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(addon.name)}
                    onChange={() => handleAddOnChange(addon.name)}
                    className="w-5 h-5"
                    style={{ accentColor: theme.primary }}
                  />
                  <span>{addon.name}</span>
                </label>
                <span className="font-semibold" style={{ color: theme.primary }}>
                  +₹{addon.cost.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Gallery */}
      <div className="py-12" style={{ backgroundColor: theme.galleryBg }}>
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: theme.primary }}>
          Wedding Gallery
        </h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-6">
          {galleryImages.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt="wedding"
              className="rounded-xl shadow-md h-64 w-full object-cover"
              whileHover={{ scale: 1.05 }}
            />
          ))}
        </div>
      </div>

       {/* Cost Breakdown (Collapsible) */}
      <div className="max-w-3xl mx-auto px-6">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="w-full bg-white shadow-md rounded-lg p-4 text-left flex justify-between items-center font-semibold text-lg"
        >
          <span style={{ color: theme.primary }}>View Cost Breakdown</span>
          <span>{showBreakdown ? "▲" : "▼"}</span>
        </button>

        {showBreakdown && (
          <div className="bg-white mt-2 rounded-lg shadow p-6">
            {costBreakdown.map((item, i) => (
              <p key={i} className="flex justify-between text-gray-700 mb-3 text-lg">
                <span>{item.name}</span>
                <span className="font-semibold">₹{item.cost.toLocaleString()}</span>
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Total Cost */}
      <div className="text-center py-8">
        <h3 className="text-2xl font-bold text-[#333]">
          Estimated Total:{" "}
          <span style={{ color: theme.primary }}>₹{totalCost.toLocaleString()}</span>
        </h3>
      </div>


      {/* CTA */}
      <div className="text-center py-8">
        <button
          onClick={() =>
            navigate("/consultation", {
              state: {
                selectedPackage: title,
                totalCost,
                selectedVenue: selectedVenue?.name,
                addOns: selectedAddOns,
              },
            })
          }
          className="px-8 py-4 rounded-full text-lg shadow-md transition"
          style={{ backgroundColor: theme.primary, color: "#fff" }}
        >
          Book / Customize This Plan
        </button>
      </div>
    </div>
  );
};

export default WeddingPackageTemplate;
