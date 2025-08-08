import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Budget from "./pages/Budget"; 

import Checklist from "./pages/Checklist";
import SeePackages from "./pages/SeeOurPackages";

import LoginSignup from "./pages/LoginSignup";

import ConsultationForm from "./pages/BookMyConsultation"; 
import AIWeddingPlannerBot from "./pages/PlannerBot";
import HilltopShimlaCelebration from "./pages/Hilltopceleb";
import GoaBeachWedding from "./pages/GoaBeach";

export default function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
         <Route path="/budget" element={<Budget />} />
          
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/packages" element={<SeePackages />} />
          
          <Route path="/login" element={<LoginSignup />} />
          
          <Route path="/consultation" element={<ConsultationForm />} />
          <Route path="/aiplanner" element={<AIWeddingPlannerBot />} />
          <Route path="/hilltop" element={<HilltopShimlaCelebration />} />
          <Route path="/goabeach" element={<GoaBeachWedding />} />
      </Routes>
      <Footer />
    </Router>
  );
}
