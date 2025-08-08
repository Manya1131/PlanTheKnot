import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginSignup() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });

  
  const toggleMode = () => setIsLogin(!isLogin);

  
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { email: form.email, name: form.name };
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("authToken", "sample_token");

    const pending = localStorage.getItem("pendingPackage");
    
    if (pending) {
      const selectedPackage = JSON.parse(pending);

      
      const destinationPath = selectedPackage.path;

    
      navigate(destinationPath, {
        state: { selectedPackage: selectedPackage }, // Pass package data to the page
      });

     
      localStorage.removeItem("pendingPackage");
    } else {
      navigate("/Packages");
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF4E9] flex justify-center items-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-[#ffe6d2] p-4 rounded-full shadow">
            {/*  */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-9 h-9 text-[#B7410E]" 
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 017.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-[#B7410E] mt-4">
            {isLogin ? "Welcome Back!" : "Join Us!"}
          </h2>
          <p className="text-gray-500 text-sm">
            {isLogin ? "Login to continue" : "Create your account"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
         
          {!isLogin && (
            <FloatingInput
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <FloatingInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <FloatingInput
            label="Password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="text-right text-sm text-[#B7410E] hover:underline">
            {isLogin && <a href="#">Forgot Password?</a>}
          </div>

          <button
            type="submit"
            className="w-full bg-[#B7410E] text-white py-2 rounded-lg font-semibold hover:bg-[#a03a0c] transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={toggleMode}
            className="text-sm text-[#B7410E] hover:underline"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

function FloatingInput({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
}) {
  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder=" " 
        className="peer w-full border-b-2 border-gray-300 focus:border-[#B7410E] bg-transparent pt-6 pb-2 text-base placeholder-transparent focus:outline-none"
      />
      <label
        htmlFor={name}
        className="absolute left-0 top-1 text-sm text-gray-500 transition-all 
        peer-placeholder-shown:top-5 
        peer-placeholder-shown:text-base 
        peer-focus:top-1 
        peer-focus:text-sm 
        peer-focus:text-[#B7410E]"
      >
        {label}
      </label>
    </div>
  );
}