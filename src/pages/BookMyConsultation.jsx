import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import bohoChicImg from "../assets/boho-chic.jpeg";
import yellowFloralImg from "../assets/yellow-floral.jpeg";
import gardenImg from "../assets/garden.jpeg";
import glamNightImg from "../assets/glam-night.jpeg";
import bollywoodImg from "../assets/bollywood.jpeg";
import royalPalaceImg from "../assets/royal-palace.jpeg";
import classicMandapImg from "../assets/classic-mandap.jpeg";
import modernLuxeImg from "../assets/modern-luxe.jpeg";
import romanticImg from "../assets/romantic.jpeg";
import lavenderImg from "../assets/lavender.jpeg";

const ceremonyCosts = {
  Haldi: 20000,
  Mehendi: 25000,
  Sangeet: 40000,
  Wedding: 100000,
  Reception: 60000,
};

const decorThemesPerCeremony = {
  Haldi: ["Yellow Floral", "Lavender"],
  Mehendi: ["Boho Chic", "Garden"],
  Sangeet: ["Glam Night", "Bollywood"],
  Wedding: ["Royal Palace", "Classic Mandap"],
  Reception: ["Modern Luxe", "Romantic"],
};

const decorOptions = {
  "Yellow Floral": 15000,
  Lavender: 20000,
  "Boho Chic": 25000,
  Garden: 22000,
  "Glam Night": 30000,
  Bollywood: 28000,
  "Royal Palace": 40000,
  "Classic Mandap": 35000,
  "Modern Luxe": 37000,
  Romantic: 34000,
};

const themeImages = {
  "Yellow Floral": yellowFloralImg,
  Lavender: lavenderImg,
  "Boho Chic": bohoChicImg,
  Garden: gardenImg,
  "Glam Night": glamNightImg,
  Bollywood: bollywoodImg,
  "Royal Palace": royalPalaceImg,
  "Classic Mandap": classicMandapImg,
  "Modern Luxe": modernLuxeImg,
  Romantic: romanticImg,
};

const cateringOptions = {
  "Veg Only": 50000,
  "Veg + Non-Veg": 80000,
  "Multi-Cuisine Premium": 120000,
};

const musicOptions = {
  "Basic DJ": 20000,
  "Live Band": 40000,
  "Celebrity DJ": 80000,
};

const locationCosts = {
  Goa: 50000,
  Udaipur: 70000,
  Jaipur: 60000,
  Kerala: 55000,
};

export default function ConsultationForm() {
  const location = useLocation();
  const selectedPackage = location.state?.selectedPackage;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    customLocation: "",
    guests: "",
    dates: null,
    ceremonies: [],
    decorThemes: {},
    customThemes: {},
    catering: "",
    music: "",
    estimatedBudget: "",
    notes: "",
  });

  const [showBudgetBox, setShowBudgetBox] = useState(false);
  const [showThemes, setShowThemes] = useState({});

  const toggleThemeVisibility = (ceremony) => {
    setShowThemes((prev) => ({
      ...prev,
      [ceremony]: !prev[ceremony],
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "ceremonies") {
      setFormData((prev) => {
        const ceremonies = prev.ceremonies.includes(value)
          ? prev.ceremonies.filter((c) => c !== value)
          : [...prev.ceremonies, value];

        return {
          ...prev,
          ceremonies,
        };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleThemeChange = (ceremony, theme) => {
    setFormData((prev) => ({
      ...prev,
      decorThemes: {
        ...prev.decorThemes,
        [ceremony]: theme,
      },
    }));
  };

  const handleCustomThemeChange = (ceremony, theme) => {
    setFormData((prev) => ({
      ...prev,
      customThemes: {
        ...prev.customThemes,
        [ceremony]: theme,
      },
      decorThemes: {
        ...prev.decorThemes,
        [ceremony]: theme,
      },
    }));
  };

  const calculateTotalBudget = () => {
    let total = 0;
    formData.ceremonies.forEach((c) => {
      total += ceremonyCosts[c] || 0;
      const theme = formData.decorThemes[c];
      if (theme) total += decorOptions[theme] || 0;
    });
    if (formData.location) total += locationCosts[formData.location] || 0;
    if (formData.catering) total += cateringOptions[formData.catering] || 0;
    if (formData.music) total += musicOptions[formData.music] || 0;
    return total;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you! Our team will reach out soon.");
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gradient-to-b from-[#FFFDF5] to-[#fffaf0] min-h-screen">
      <h1 className="text-4xl font-extrabold text-center text-[#B7410E] mb-6 tracking-wide">
        Customize Your Wedding
      </h1>

      {selectedPackage && (
        <div className="bg-orange-100 p-4 rounded-xl mb-6 shadow-md">
          <h2 className="text-xl font-semibold text-[#8B3A1E]">
            Selected Package: {selectedPackage.name}
          </h2>
          <p className="text-[#555] mt-1">{selectedPackage.price}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <input name="name" onChange={handleChange} value={formData.name} className="w-full p-3 border rounded-lg" placeholder="Your Name" required />
        <input name="email" onChange={handleChange} value={formData.email} className="w-full p-3 border rounded-lg" placeholder="Email Address" required />

        <label className="block font-medium text-[#B7410E]">Preferred Location:</label>
        <select name="location" value={formData.location} onChange={handleChange} className="w-full border p-3 rounded-lg">
          <option value="">Select Location</option>
          {Object.keys(locationCosts).map((loc) => (
            <option key={loc} value={loc}>{loc} (+₹{locationCosts[loc].toLocaleString()})</option>
          ))}
          <option value="custom">Other</option>
        </select>

        {formData.location === "custom" && (
          <input
            type="text"
            name="customLocation"
            value={formData.customLocation}
            onChange={handleChange}
            className="w-full mt-2 p-3 border rounded-lg"
            placeholder="Enter your destination"
          />
        )}

        <input name="guests" onChange={handleChange} value={formData.guests} className="w-full p-3 border rounded-lg" placeholder="No. of Guests" />

        <label className="block font-medium text-[#B7410E]">Preferred Date:</label>
        <DatePicker
          selected={formData.dates}
          onChange={(date) => setFormData((prev) => ({ ...prev, dates: date }))}
          className="w-full p-3 border rounded-lg"
          placeholderText="Select Wedding Date"
        />

        <label className="block font-medium text-[#B7410E] mt-4">Ceremonies to Include:</label>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(ceremonyCosts).map((ceremony) => (
            <div key={ceremony} className="bg-white border rounded-lg p-3 shadow-sm">
              <label className="flex items-center font-medium">
                <input
                  type="checkbox"
                  name="ceremonies"
                  value={ceremony}
                  checked={formData.ceremonies.includes(ceremony)}
                  onChange={handleChange}
                  className="mr-2"
                />
                {ceremony} (+₹{ceremonyCosts[ceremony].toLocaleString()})
              </label>

              {formData.ceremonies.includes(ceremony) && (
                <button
                  type="button"
                  className="mt-2 text-sm text-[#B7410E] underline"
                  onClick={() => toggleThemeVisibility(ceremony)}
                >
                  {showThemes[ceremony] ? "Hide Theme Selection" : "Select Theme"}
                </button>
              )}

              {formData.ceremonies.includes(ceremony) && showThemes[ceremony] && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  {decorThemesPerCeremony[ceremony].map((theme) => (
                    <div
                      key={theme}
                      className={`border rounded-lg p-2 cursor-pointer transition-transform transform hover:scale-105 ${
                        formData.decorThemes[ceremony] === theme ? "ring-2 ring-[#B7410E]" : ""
                      }`}
                      onClick={() => handleThemeChange(ceremony, theme)}
                    >
                      <img
                        src={themeImages[theme]}
                        alt={theme}
                        className="w-full h-32 object-cover rounded-md mb-2"
                      />
                      <p className="text-sm font-medium text-center">
                        {theme} (+₹{decorOptions[theme]?.toLocaleString() || "0"})
                      </p>
                    </div>
                  ))}
                  <input
                    type="text"
                    placeholder="Custom Theme"
                    className="col-span-2 mt-2 p-2 border rounded-md"
                    value={
                      decorThemesPerCeremony[ceremony].includes(formData.decorThemes[ceremony])
                        ? ""
                        : formData.decorThemes[ceremony] || ""
                    }
                    onChange={(e) => handleCustomThemeChange(ceremony, e.target.value)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <label className="block font-medium text-[#B7410E] mt-4">Catering:</label>
        <select name="catering" value={formData.catering} onChange={handleChange} className="w-full border p-3 rounded-lg">
          <option value="">Select Catering Option</option>
          {Object.keys(cateringOptions).map((option) => (
            <option key={option} value={option}>
              {option} (+₹{cateringOptions[option].toLocaleString()})
            </option>
          ))}
        </select>

        <label className="block font-medium text-[#B7410E] mt-4">Music / DJ:</label>
        <select name="music" value={formData.music} onChange={handleChange} className="w-full border p-3 rounded-lg">
          <option value="">Select Music Option</option>
          {Object.keys(musicOptions).map((option) => (
            <option key={option} value={option}>
              {option} (+₹{musicOptions[option].toLocaleString()})
            </option>
          ))}
        </select>

        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg"
          placeholder="Any special requests or details"
        ></textarea>

        <div className="mt-6 p-4 bg-[#FFF7EB] border border-[#e8d2b5] rounded-xl text-center">
          <p className="text-lg font-semibold text-[#B7410E]">
            Estimated Add-on Cost: ₹{calculateTotalBudget().toLocaleString()}
          </p>
        </div>

        <p className="text-sm mt-6 text-gray-700">
          If you are facing trouble with the budget, <span className="text-[#B7410E] underline cursor-pointer" onClick={() => setShowBudgetBox(!showBudgetBox)}>give your estimated budget</span>.
        </p>
        {showBudgetBox && (
          <input
            name="estimatedBudget"
            value={formData.estimatedBudget}
            onChange={handleChange}
            className="w-full p-3 mt-2 border rounded-lg"
            placeholder="Enter your estimated budget (₹)"
          />
        )}

        <button type="submit" className="w-full mt-4 bg-[#E2725B] hover:bg-[#c65b45] text-white px-6 py-3 rounded-full font-semibold">
          Submit Consultation Request
        </button>
      </form>
    </div>
  );
}