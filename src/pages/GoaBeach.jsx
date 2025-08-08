// src/pages/GoaBeachWedding.jsx
import React from "react";
import { FaUmbrellaBeach, FaCocktail, FaUtensils, FaMusic, FaBed, FaCamera } from "react-icons/fa";
import WeddingPackageTemplate from "../components/WeddingPackageTemplate";
import heroImage from "../assets/goa_hero.png"
import g1 from "../assets/goa_g1.png";
import g2 from "../assets/goa_g2.png";
import g3 from "../assets/goa_g3.png";
import g4 from "../assets/goa_g4.png";

const GoaBeachWedding = () => {
  const theme = {
    primary: "#0077b6",
    inclusionBg: "#E8F8FF",
    galleryBg: "#f0faff",
  };

  const venues = [
    {
      name: "Taj Exotica Beach Resort",
      location: "Benaulim Beach, South Goa",
      capacity: "Up to 250 guests",
      surcharge: 0,
    },
    {
      name: "Grand Hyatt Goa",
      location: "Bambolim Bay, North Goa",
      capacity: "Up to 300 guests",
      surcharge: 150000,
    },
    {
      name: "Private Beachside Villa",
      location: "Candolim Beach",
      capacity: "Up to 100 guests",
      surcharge: 100000,
    },
  ];
const costBreakdown = [
  { name: "Beach Venue & Setup", cost: 250000 },
  { name: "Catering (150 guests)", cost: 150000 },
  { name: "Photography & Videography", cost: 50000 },
  { name: "Live Music & DJ", cost: 40000 },
  { name: "Decor & Theme (Beach Style)", cost: 60000 },
  { name: "Guest Accommodation", cost: 50000 },
];

  return (
    <WeddingPackageTemplate
      title="Goa Beach Wedding Celebration"
      basePrice={750000}
      heroImage={heroImage}
      theme={theme}
      overviewText="Celebrate your love with the sound of waves, golden sands, and a luxurious beachside experience. This package includes a beachside mandap, tropical-themed decor, live Goan music, and a stunning sunset cruise for an unforgettable celebration."
      itinerary={[
        { day: "Day 1 - Welcome & Pool Party", details: "Welcome drinks, Goan folk music & DJ night by the poolside with tropical cocktails." },
        { day: "Day 2 - Mehendi & Sunset Cruise", details: "Daytime Mehendi on the beach with live music followed by a sunset cruise party with cocktails." },
        { day: "Day 3 - Beach Wedding & Reception", details: "Morning wedding on a private beach with floral mandap, evening gala reception with live band & fireworks." },
      ]}
      inclusions={[
        { icon: <FaUmbrellaBeach />, text: "Private beachside venue & setup" },
        { icon: <FaUtensils />, text: "Goan & multi-cuisine catering" },
        { icon: <FaMusic />, text: "DJ + live band & folk performances" },
        { icon: <FaBed />, text: "Luxury resort accommodation (2 nights)" },
        { icon: <FaCocktail />, text: "Welcome drinks & cocktail party" },
        { icon: <FaCamera />, text: "Professional photography team" },
      ]}
      addOns={[
        { name: "Drone Videography", cost: 50000 },
        { name: "Beach Fireworks Show", cost: 80000 },
        { name: "Celebrity Performer", cost: 150000 },
        { name: "Sunset Yacht Party", cost: 120000 },
        { name: "Luxury Wedding Cake", cost: 30000 },
      ]}
      galleryImages={[
       g1,g2,g3,g4
      ]}
      venues={venues}
      costBreakdown={costBreakdown}
    />
  );
};

export default GoaBeachWedding;
