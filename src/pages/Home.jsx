import React, { useState, useEffect } from "react";
import heroBg from "../assets/hero.png";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import aboutUsimage from "../assets/home3.jpeg";
import ContactImage from "../assets/home4.jpeg";
import { Link } from "react-router-dom";

const HomePage=() => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(() => {
  const token = localStorage.getItem("authToken"); 
  setIsLoggedIn(!!token);
}, []);

const handleLogout = () => {
  localStorage.removeItem("authToken");
  setIsLoggedIn(false);
  window.location.href = "/";
};

  const navLinks = ["Home", "About", "Services", "Contact"];

//   const services = [
//   {
//     title: "Full-Service Planning",
//     description: "We manage every detail from start to finish.",
//     subtext: "Ideal for couples who want complete wedding coordination.",
//   },
//   {
//     title: "Styling & Design",
//     description: "Visual storytelling for your event.",
//     subtext: "Perfect if you already have a planner but need aesthetic support.",
//   },
//   {
//     title: "Day-of Coordination",
//     description: "We'll ensure your big day goes smoothly.",
//     subtext: "Great for couples who planned everything and need execution help.",
//   },
// ]

  return (
    <div className="font-sans bg-[#FFFDF5] text-[#333]">
      {/* Navbar */}
      <nav
        className={`flex items-center justify-between px-6 py-4 fixed w-full top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/60 backdrop-blur-sm shadow-sm"
            : "bg-white shadow-none"
        }`}
      >
        <h1 className="text-2xl font-bold text-[#B7410E]">PlanTheKnot</h1>

        {/* Desktop Links */}
        <ul className="hidden md:flex space-x-6 items-center font-medium text-[#708238]">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="hover:text-[#B7410E] transition"
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="ml-4 text-sm text-[#708238] hover:text-[#B7410E]"
              >
                Log out
              </button>
            ) : (
              <Link to="/login">
                <button className="ml-4 text-sm text-[#708238] hover:text-[#B7410E]">
                  Log in
                </button>
              </Link>
            )}
          </li>

          {/* <li>
            <button className="bg-[#E2725B] hover:bg-[#c65b45] text-white px-4 py-2 rounded-full text-sm">
              Book Now
            </button>
          </li> */}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#B7410E] text-xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.ul
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="md:hidden flex flex-col bg-white text-center py-4 shadow-md space-y-3 mt-16"
        >
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="text-[#708238] text-lg hover:text-[#B7410E] transition"
              >
                {link}
              </a>
            </li>
          ))}
          <li>
            <button className="bg-[#E2725B] hover:bg-[#c65b45] text-white px-6 py-2 rounded-full text-sm">
              Book Now
            </button>
          </li>
        </motion.ul>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Wedding Background"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-2xl px-6"
        >
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 text-[#FFFDF5] drop-shadow-lg"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Creating Unforgettable Moments, One Wedding at a Time
          </h1>
          <p className="text-lg md:text-xl mb-8 text-[#e6e2d3]">
            Luxury wedding planning for stylish, stress-free celebrations.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/consultation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-[#E2725B] hover:bg-[#c65b45] text-white px-6 py-3 rounded-full font-medium transition"
              >
                Book a Free Consultation
              </motion.button>
            </Link>
            <Link to="/packages">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-white text-[#B7410E] hover:bg-[#f3f1eb] px-6 py-3 rounded-full font-medium transition"
              >
                See Our Packages
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* About Us Section */}
      <section id="about" className="bg-[#FAF3E0] py-20 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10"
        >
          <motion.img
            src={aboutUsimage}
            alt="About Us"
            className="w-full md:w-1/2 rounded-2xl shadow-lg object-cover"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />

          <motion.div
            className="text-center md:text-left md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#B7410E] mb-4">
              Who We Are
            </h2>
            <p className="text-lg text-[#4A4A4A] mb-4 leading-relaxed">
              <span className="text-[#708238] font-semibold">PlanTheKnot</span>{" "}
              is your luxury wedding planning partner, dedicated to curating
              timeless and stylish celebrations. From dreamy themes to
              stress-free execution, we bring your vision to life with elegance
              and heart.
            </p>
            <p className="text-[#7B4B3A] font-medium">
              We believe every love story deserves to be celebrated
              beautifully—and we’re here to make it unforgettable.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      {/* <section id="services" className="bg-[#FFFDF5] py-20 px-6 md:px-12">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className="max-w-7xl mx-auto flex flex-col md:flex-row items-start gap-12"
  >
<div className="relative md:w-1/2 w-full flex flex-col items-center space-y-6">

  <div className="w-full max-w-md mx-auto">
    <svg viewBox="0 0 500 500" className="w-full h-auto">
      <clipPath id="blobClip">
        <path
          d="M446.5,323.5Q409,397,323.5,425Q238,453,166,409Q94,365,70.5,282.5Q47,200,101.5,123.5Q156,47,250.5,73Q345,99,413,149.5Q481,200,446.5,323.5Z"
          transform="translate(-10 -10) scale(1.05)"
        />
      </clipPath>
      <image
        href={heroBg} // Replace with your image import
        width="100%"
        height="100%"
        clipPath="url(#blobClip)"
        preserveAspectRatio="xMidYMid slice"
      />
    </svg>
  </div>

  <motion.div
    key={activeIndex + "-1"}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white px-6 py-6 rounded-3xl shadow border border-[#e6e0d0] max-w-md w-full"
  >
    <h3 className="text-xl font-semibold text-[#B7410E] mb-2 text-center">
      {services[activeIndex].title}
    </h3>
    <p className="text-[#4A4A4A] leading-relaxed text-sm text-center">
      {services[activeIndex].description}
    </p>

    {services[activeIndex].subtext && (
      <p className="mt-3 text-[#6f6f6f] text-sm text-center italic">
        {services[activeIndex].subtext}
      </p>
    )}
  </motion.div>
</div>

<div className="md:w-1/2 text-left flex flex-col space-y-6">
  <div>
    <h2 className="text-3xl md:text-4xl font-bold text-[#B7410E] mb-6">
      What We Offer
    </h2>
    <p className="text-[#4A4A4A] mb-6 leading-relaxed">
      Whether you're dreaming big or keeping it intimate, we craft weddings
      that feel personal, stylish, and seamless.
    </p>

    <div className="space-y-4">
  {services.map((service, index) => (
    <div
      key={index}
      onClick={() => setActiveIndex(index)}
      className={`cursor-pointer px-4 py-3 border-l-4 rounded-md transition-all duration-300 ${
        activeIndex === index
          ? "border-[#B7410E] bg-[#fef9f5]"
          : "border-transparent hover:border-[#ccc]"
      }`}
    >
      <h4
        className={`font-semibold text-lg ${
          activeIndex === index ? "text-[#B7410E]" : "text-[#708238]"
        }`}
      >
        {service.title}
      </h4>

      {activeIndex === index && service.subtext && (
        <p className="text-sm text-[#4A4A4A] mt-1">{service.subtext}</p>
      )}
    </div>
  ))}
</div>

  </div>

  <Link to="/consultation">
  <button className="mt-4 bg-[#2F3E2E] hover:bg-[#3e513d] text-white px-6 py-3 rounded-full font-medium transition w-fit">
    Get Started
  </button>
</Link>
</div>

  </motion.div>
</section> */}
      {/* How It Works Section */}
      <section id="how-it-works" className="bg-[#FAF3E0] py-20 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#B7410E] mb-4">
            How It Works
          </h2>
          <p className="text-[#4A4A4A] max-w-2xl mx-auto mb-12">
            Our process ensures your wedding day is seamless and stunning —
            here's what to expect when you plan with us.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white px-6 py-8 rounded-2xl shadow-lg border border-[#e6e0d0]"
            >
              <div className="text-5xl text-[#B7410E] mb-4">💬</div>
              <h3 className="text-xl font-semibold text-[#2F3E2E] mb-2">
                1. Let’s Talk
              </h3>
              <p className="text-[#4A4A4A] text-sm">
                Schedule a consultation to share your vision, needs, and dream
                vibe.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white px-6 py-8 rounded-2xl shadow-lg border border-[#e6e0d0]"
            >
              <div className="text-5xl text-[#B7410E] mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-[#2F3E2E] mb-2">
                2. Plan & Design
              </h3>
              <p className="text-[#4A4A4A] text-sm">
                We curate a detailed plan and aesthetic tailored to your story.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="bg-white px-6 py-8 rounded-2xl shadow-lg border border-[#e6e0d0]"
            >
              <div className="text-5xl text-[#B7410E] mb-4">💍</div>
              <h3 className="text-xl font-semibold text-[#2F3E2E] mb-2">
                3. Celebrate
              </h3>
              <p className="text-[#4A4A4A] text-sm">
                You enjoy your magical day — we handle every detail behind the
                scenes.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section id="testimonials" className="bg-[#FFFDF5] py-24 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#B7410E] mb-4">
            Words from Our Couples
          </h2>
          <p className="text-[#4A4A4A] text-lg max-w-2xl mx-auto mb-12">
            Heartfelt experiences from couples who trusted us to shape their
            perfect day.
          </p>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                name: "Aanya & Rishi",
                quote:
                  "Pure magic from start to finish. Our dream wedding brought to life.",
              },
              {
                name: "Meera & Aryan",
                quote:
                  "Stress-free, beautiful, and full of joy. Couldn’t ask for more!",
              },
              {
                name: "Diya & Kabir",
                quote:
                  "Unforgettable moments and flawless execution. Truly exceptional.",
              },
            ].map((testimonial, index) => (
              <div key={index} className="relative">
                <svg
                  viewBox="0 0 500 500"
                  className="w-full h-auto text-[#fff2e5]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#fff2e5"
                    d="M420,320Q380,390,300,430Q220,470,150,420Q80,370,60,280Q40,190,100,120Q160,50,260,70Q360,90,410,160Q460,230,420,320Z"
                  />
                </svg>

                {/* Text Content centered inside blob */}
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center px-6 text-center">
                  <p className="italic text-[#4A4A4A] text-base mb-4 leading-relaxed">
                    “{testimonial.quote}”
                  </p>
                  <span className="text-[#B7410E] font-semibold text-sm">
                    — {testimonial.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="bg-[#FAF3E0] py-24 px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12"
        >
          {/* Left: Form */}
          <div className="w-full md:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-[#B7410E] mb-4">
              Let’s Get Started
            </h2>
            <p className="text-[#4A4A4A] text-lg mb-8">
              Ready to plan your dream day? Share your story, and we’ll craft
              the celebration it deserves.
            </p>

            <div className="bg-white rounded-2xl shadow-xl px-10 py-12 max-w-xl border border-[#f3ede5] space-y-6">
              <h3 className="text-3xl font-semibold text-[#2F3E2E] flex items-center gap-2">
                {/* NEW ICON: Calendar Icon (from Heroicons-like style) */}
                <svg
                  className="w-7 h-7 text-[#7c9885]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Schedule Your Free Consultation
              </h3>

              <p className="text-gray-700 text-base leading-relaxed">
                We’re honored to be part of your story. Share your vision and
                let our expert team help bring your dream day to life.
              </p>

              <Link to="/consultation">
                <button className="bg-gradient-to-r from-[#B7410E] via-[#E2725B] to-[#C65B45] text-white font-semibold text-lg px-6 py-3 rounded-xl shadow-lg transition duration-300 w-full hover:opacity-90">
                  Book My Free Consultation
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <img
              src={ContactImage}
              alt="Get Started Illustration"
              className="w-[90%] max-w-md rounded-xl shadow-lg"
            />
          </motion.div>
        </motion.div>
      </section>

      <footer className="bg-[#2F3E2E] text-white pt-16 pb-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand & CTA */}
          <div>
            <h2 className="text-2xl font-bold text-[#EBD9C4] mb-3">
              PlanTheKnot
            </h2>
            <p className="text-sm text-[#d3cfc4]">
              Curating timeless celebrations filled with elegance, heart, and
              unforgettable memories.
            </p>
            <div className="flex space-x-4 mt-4 text-xl">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E2725B] transition"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E2725B] transition"
              >
                <i className="fab fa-pinterest"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#E2725B] transition"
              >
                <i className="fab fa-facebook"></i>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Explore</h3>
            <ul className="space-y-2 text-sm text-[#d3cfc4]">
              <li>
                <a href="#about" className="hover:text-[#E2725B]">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E2725B]">
                  Services
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#E2725B]">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#E2725B]">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup (optional) */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Stay Inspired</h3>
            <p className="text-sm text-[#d3cfc4] mb-3">
              Join our newsletter for wedding tips & trends:
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="rounded-l-full px-4 py-2 text-black text-sm w-full focus:outline-none"
              />
              <button className="bg-[#E2725B] hover:bg-[#c65b45] text-white px-4 rounded-r-full text-sm">
                Subscribe
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Get In Touch</h3>
            <p className="text-sm text-[#d3cfc4]">
              Email: hello@plantheknot.com
            </p>
            <p className="text-sm text-[#d3cfc4] mt-1">
              Phone: +1 (234) 567-8901
            </p>
            <p className="text-sm text-[#d3cfc4] mt-1">
              Location: Based in California, planning worldwide.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-[#a9a493] border-t border-[#3f4d3f] pt-6">
          © {new Date().getFullYear()} PlanTheKnot. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
export default HomePage;