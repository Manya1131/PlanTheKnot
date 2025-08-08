// src/pages/HilltopShimlaCelebration.jsx
import React from "react";
import { FaCampground, FaFire, FaBed, FaMapMarkerAlt, FaUtensils } from "react-icons/fa";
import WeddingPackageTemplate from "../components/WeddingPackageTemplate";
import heroImg from "../assets/Hilltop_hero.png";
import g1 from "../assets/hilltop_g1.png";
import g2 from "../assets/hilltop_g2.png";
import g3 from "../assets/hilltop_g3.png";
import g4 from "../assets/hilltop_g4.png";

const HilltopShimlaCelebration = () => {
  const theme = {
    primary: "#B7410E",
    inclusionBg: "#FFF1E6",
    galleryBg: "#FAF3E0",
  };

  const costBreakdown = [
  { name: "Venue & Setup", cost: 200000 },
  { name: "Catering (150 guests)", cost: 120000 },
  { name: "Photography & Videography", cost: 40000 },
  { name: "Music & Entertainment", cost: 30000 },
  { name: "Decor & Theme", cost: 50000 },
  { name: "Guest Accommodation", cost: 40000 },
];

  const venues = [
    {
      name: "The Royal Hilltop Resort",
      location: "Near Kufri, 45 mins from Shimla Mall Road",
      capacity: "Up to 200 guests",
      surcharge: 0,
    },
    {
      name: "Wildflower Hall (Oberoi)",
      location: "Mashobra, Shimla",
      capacity: "Up to 150 guests",
      surcharge: 100000,
    },
    {
      name: "Private Hilltop Cottages",
      location: "Mashobra Valley",
      capacity: "Up to 80 guests",
      surcharge: 50000,
    },
  ];

  return (
    <WeddingPackageTemplate
      title="Hilltop Shimla Celebration"
      basePrice={480000}
      heroImage={heroImg}
      theme={theme}
      overviewText="Host your dream wedding amidst the snow-capped mountains of Shimla. Enjoy a traditional Himachali welcome, cozy bonfire evenings, panoramic views, and luxury stays for an intimate hilltop wedding experience."
      itinerary={[
        { day: "Day 1 - Welcome & Haldi", details: "Traditional Himachali welcome with snacks, Haldi function with bonfire & light music in an open lawn." },
        { day: "Day 2 - Mehendi & Sangeet", details: "Daytime Mehendi with mountain view setup, followed by evening Sangeet with live acoustic band & cocktails." },
        { day: "Day 3 - Wedding & Reception", details: "Morning wedding with panoramic backdrop, evening reception with DJ & fine dining under a starlit sky." },
      ]}
      inclusions={[
        { icon: <FaCampground />, text: "Snowy hilltop venue with panoramic views" },
        { icon: <FaFire />, text: "Bonfire & acoustic night with Himachali snacks" },
        { icon: <FaBed />, text: "Luxury cottages & homestays for guests" },
        { icon: <FaMapMarkerAlt />, text: "Himachali-themed decor & traditional welcome" },
        { icon: <FaUtensils />, text: "Multi-cuisine + local Himachali food counters" },
      ]}
      addOns={[
        { name: "Drone Videography", cost: 30000 },
        { name: "Celebrity Performer", cost: 100000 },
        { name: "Luxury Car Baraat", cost: 25000 },
        { name: "Customized Wedding Cake", cost: 15000 },
        { name: "Fireworks Show", cost: 40000 },
      ]}
      galleryImages={[g1, g2, g3, g4]}
      venues={venues}
       costBreakdown={costBreakdown}
    />
  );
};

export default HilltopShimlaCelebration;
