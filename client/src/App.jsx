import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterActor from "./pages/RegisterActor";
import RegisterDirector from "./pages/RegisterDirector";
import ArtistDashboard from "./talent/ArtistDashboard";
import TalentPortfolio from "./talent/TalentPortfolio";
import DirectorDashboard from "./director/DirectorDashboard";
import DirectorPortfolio from "./director/DirectorPortfolio";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginPage" element={<Login />} />
        <Route path="/register/actor" element={<RegisterActor />} />
        <Route path="/register/director" element={<RegisterDirector />} />

        {/* Dashboards */}
        <Route path="/dashboard/talent" element={<ArtistDashboard />} />
        <Route path="/dashboard/director" element={<DirectorDashboard />} />

        {/* Portfolios */}
        <Route path="/talent/portfolio" element={<TalentPortfolio />} />
        <Route path="/director/portfolio" element={<DirectorPortfolio />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
