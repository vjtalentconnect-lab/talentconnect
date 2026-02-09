import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TalentDashboard from "./talent/TalentDashboard";
import ProducerDashboard from "./producer/ProducerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

         {/* Dashboards */}
         <Route path="/dashboard/talent" element={<TalentDashboard />} />
         <Route path="/dashboard/producer" element={<ProducerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
