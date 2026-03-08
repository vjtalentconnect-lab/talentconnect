import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RegisterActor from "./pages/RegisterActor";
import RegisterDirector from "./pages/RegisterDirector";
import ArtistDashboard from "./talent/ArtistDashboard";
import TalentPortfolio from "./talent/TalentPortfolio";
import ArtistMessages from "./talent/ArtistMessages";
import AppliedProjects from "./talent/AppliedProjects";
import AuditionInvites from "./talent/AuditionInvites";
import AuditionDetails from "./talent/AuditionDetails";
import PerformanceAnalytics from './talent/PerformanceAnalytics';
import ArtistSettings from './talent/ArtistSettings';
import ProfileVerification from './talent/verification/ProfileVerification';
import HelpSupport from './pages/HelpSupport';
import ContactUs from './pages/ContactUs';
import CommunityForum from "./pages/CommunityForum";
import UpgradePlan from "./talent/UpgradePlan";
import Checkout from "./talent/Checkout";
import PaymentSuccess from "./talent/PaymentSuccess";
import DirectorDashboard from "./director/DirectorDashboard";
import DirectorPortfolio from "./director/DirectorPortfolio";
import CreateProjectStep1 from "./director/CreateProjectStep1";
import CreateProjectStep2 from "./director/CreateProjectStep2";
import MyProjects from "./director/MyProjects";
import ProjectDetails from "./director/ProjectDetails";
import Shortlists from "./director/Shortlists";
import AuditionRequests from "./director/AuditionRequests";
import Messages from "./director/Messages";

function App() {
  return (
    <div className="min-h-screen font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginPage" element={<Login />} />
          <Route path="/register/actor" element={<RegisterActor />} />
          <Route path="/register/director" element={<RegisterDirector />} />

          {/* Dashboards */}
          <Route path="/dashboard/talent" element={<ArtistDashboard />} />
          <Route path="/talent/messages" element={<ArtistMessages />} />
          <Route path="/talent/applied-projects" element={<AppliedProjects />} />
          <Route path="/talent/audition-invites" element={<AuditionInvites />} />
          <Route path="/talent/audition-details" element={<AuditionDetails />} />
          <Route path="/talent/analytics" element={<PerformanceAnalytics />} />
          <Route path="/talent/settings" element={<ArtistSettings />} />
          <Route path="/talent/verify" element={<ProfileVerification />} />
          <Route path="/support" element={<HelpSupport />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/community" element={<CommunityForum />} />
          <Route path="/talent/upgrade" element={<UpgradePlan />} />
          <Route path="/talent/checkout" element={<Checkout />} />
          <Route path="/talent/payment-success" element={<PaymentSuccess />} />
          <Route path="/dashboard/director" element={<DirectorDashboard />} />

          {/* Portfolios */}
          <Route path="/talent/portfolio" element={<TalentPortfolio />} />
          <Route path="/director/portfolio" element={<DirectorPortfolio />} />

          {/* Create Project Flow */}
          <Route path="/director/create-project/step1" element={<CreateProjectStep1 />} />
          <Route path="/director/create-project/step2" element={<CreateProjectStep2 />} />
          <Route path="/director/my-projects" element={<MyProjects />} />
          <Route path="/director/project/:id" element={<ProjectDetails />} />
          <Route path="/director/shortlists" element={<Shortlists />} />
          <Route path="/director/auditions" element={<AuditionRequests />} />
          <Route path="/director/messages" element={<Messages />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
