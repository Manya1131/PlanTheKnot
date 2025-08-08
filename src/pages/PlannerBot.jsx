import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaRing, FaMapMarkerAlt, FaMusic, FaUtensils, FaCalendarAlt } from "react-icons/fa";

const AIWeddingPlannerBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "💍 Hi! I’m your AI Wedding Planner. Tell me about your dream wedding! What’s your budget?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { sender: "user", text: input }];

    if (input.toLowerCase().includes("generate")) {
      // Mock AI-generated detailed plan
      const aiPlan = {
        summary: "Here’s your Royal wedding plan for 200 guests in Udaipur with a budget of $50,000.",
        functions: [
          { name: "Haldi", desc: "Poolside ceremony with yellow floral decor & dhol.", cost: "$5,000" },
          { name: "Mehendi", desc: "Garden event with folk music & live counters.", cost: "$7,000" },
          { name: "Sangeet", desc: "Ballroom with DJ, live band & dance acts.", cost: "$12,000" },
          { name: "Wedding", desc: "Royal mandap, shehnai & fireworks.", cost: "$20,000" },
          { name: "Reception", desc: "Banquet hall with celebrity performance.", cost: "$6,000" },
        ],
        costBreakdown: [
          { category: "Venue", amount: "$15,000", icon: <FaMapMarkerAlt /> },
          { category: "Catering", amount: "$20,000", icon: <FaUtensils /> },
          { category: "Decor", amount: "$8,000", icon: <FaRing /> },
          { category: "Entertainment", amount: "$5,000", icon: <FaMusic /> },
          { category: "Photography & Misc", amount: "$2,000", icon: <FaCalendarAlt /> }
        ],
        timeline: [
          { day: "Day 1", events: "Haldi (10 AM), Mehendi (5 PM)" },
          { day: "Day 2", events: "Sangeet (8 PM)" },
          { day: "Day 3", events: "Wedding (6 PM)" },
          { day: "Day 4", events: "Reception (8 PM)" },
        ]
      };

      newMessages.push({
        sender: "bot",
        text: (
          <div className="space-y-4">
            <p className="font-bold text-lg">{aiPlan.summary}</p>
            <div className="bg-[#FAF3E0] p-4 rounded-lg shadow">
              <h3 className="font-semibold text-[#B7410E] mb-2">Function-wise Plan:</h3>
              {aiPlan.functions.map((f, i) => (
                <div key={i} className="border-b py-2">
                  <strong>{f.name}:</strong> {f.desc} 
                  <span className="text-green-700 font-medium ml-2">({f.cost})</span>
                </div>
              ))}
            </div>
            <div className="bg-[#FFF8F0] p-4 rounded-lg shadow">
              <h3 className="font-semibold text-[#B7410E] mb-2">Cost Breakdown:</h3>
              {aiPlan.costBreakdown.map((c, i) => (
                <div key={i} className="flex items-center gap-2 py-1">
                  <span className="text-[#E2725B]">{c.icon}</span>
                  {c.category}: <strong>{c.amount}</strong>
                </div>
              ))}
            </div>
            <div className="bg-[#FDF6E3] p-4 rounded-lg shadow">
              <h3 className="font-semibold text-[#B7410E] mb-2">Timeline:</h3>
              {aiPlan.timeline.map((t, i) => (
                <div key={i} className="py-1">
                  <strong>{t.day}:</strong> {t.events}
                </div>
              ))}
            </div>
          </div>
        )
      });
    } else {
      newMessages.push({ sender: "bot", text: "Got it! Tell me more. (Type 'Generate my plan' when ready)" });
    }

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFFDF5] to-[#FFEDE1] flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-[#B7410E] mb-6">AI Wedding Planner Chat</h1>
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 space-y-4 overflow-y-auto h-[70vh] border">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 max-w-[80%] rounded-2xl ${
              msg.sender === "bot"
                ? "bg-[#FFF8F0] text-[#333] self-start shadow-md"
                : "bg-gradient-to-r from-[#E2725B] to-[#c65b45] text-white self-end"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
      </div>
      <div className="w-full max-w-3xl mt-4 flex space-x-2 sticky bottom-0">
        <input
          className="flex-1 border rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-[#E2725B]"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleSend} className="bg-[#E2725B] hover:bg-[#c65b45] text-white px-6 py-3 rounded-full">
          Send
        </button>
      </div>
    </div>
  );
};

export default AIWeddingPlannerBot;
