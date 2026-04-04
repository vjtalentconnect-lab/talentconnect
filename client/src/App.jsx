import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NotificationProvider } from "./context/NotificationContext";
import { ThemeProvider } from "./context/ThemeContext";

import SkeletonLoader from "./components/SkeletonLoader";
import ProtectedRoute from "./components/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const RegisterActor = lazy(() => import("./pages/RegisterActor"));
const RegisterDirector = lazy(() => import("./pages/RegisterDirector"));
import ArtistDashboard from "./talent/ArtistDashboard";
import TalentPortfolio from "./talent/TalentPortfolio";
import ArtistMessages from "./talent/ArtistMessages";
import AppliedProjects from "./talent/AppliedProjects";
import AuditionInvites from "./talent/AuditionInvites";
import AuditionDetails from "./talent/AuditionDetails";
import PerformanceAnalytics from './talent/PerformanceAnalytics';
import ArtistSettings from './talent/ArtistSettings';
import ProjectDiscovery from './talent/ProjectDiscovery';
import ProfileVerification from './talent/verification/ProfileVerification';
const HelpSupport = lazy(() => import('./pages/HelpSupport'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const CommunityForum = lazy(() => import("./pages/CommunityForum"));
const UpgradePlan = lazy(() => import("./talent/UpgradePlan"));
const Checkout = lazy(() => import("./talent/Checkout"));
const PaymentSuccess = lazy(() => import("./talent/PaymentSuccess"));
import DirectorDashboard from "./director/DirectorDashboard";
import DirectorPortfolio from "./director/DirectorPortfolio";
import PublicDirectorProfile from "./director/PublicDirectorProfile";
import CreateProjectStep1 from "./director/CreateProjectStep1";
import CreateProjectStep2 from "./director/CreateProjectStep2";
import MyProjects from "./director/MyProjects";
import ProjectDetails from "./director/ProjectDetails";
import Shortlists from "./director/Shortlists";
import AuditionRequests from "./director/AuditionRequests";
import Messages from "./director/Messages";
import TalentDiscovery from "./director/TalentDiscovery";
import DirectorSettings from "./director/DirectorSettings";
import AdminDashboard from "./admin/AdminDashboard";
import ProjectOversight from "./admin/ProjectOversight";
import VerificationReview from "./admin/VerificationReview";
import UserDetail from "./admin/UserDetail";
import FinancialReports from "./admin/FinancialReports";
import CommunicationCenter from "./admin/CommunicationCenter";
import GlobalSearch from "./admin/GlobalSearch";
import MediaStorage from "./admin/MediaStorage";
import AdminSettings from './admin/AdminSettings';
import AdminRBAC from './admin/AdminRBAC';
import SystemHealth from './admin/SystemHealth';
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const DirectorCheckout = lazy(() => import("./pages/DirectorCheckout"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FindTalent = lazy(() => import("./pages/FindTalent"));
const FindWork = lazy(() => import("./pages/FindWork"));
const Productions = lazy(() => import("./pages/Productions"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ArtistGuidelines = lazy(() => import("./pages/ArtistGuidelines"));
const SuccessStories = lazy(() => import("./pages/SuccessStories"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const LinkedInCallback = lazy(() => import("./pages/LinkedInCallback"));
const CompleteProfile = lazy(() => import("./pages/CompleteProfile"));


function App() {
  return (
    <ThemeProvider>

    <div className="min-h-screen font-sans bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <NotificationProvider>
        <BrowserRouter>
          <Suspense fallback={<SkeletonLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/find-talent" element={<FindTalent />} />
              <Route path="/find-work" element={<FindWork />} />
              <Route path="/productions" element={<Productions />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/artist-guidelines" element={<ArtistGuidelines />} />
              <Route path="/success-stories" element={<SuccessStories />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/login" element={<Login />} />
              <Route path="/loginPage" element={<Login />} />
              <Route path="/register/actor" element={<RegisterActor />} />
              <Route path="/register/director" element={<RegisterDirector />} />
              <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
              <Route path="/onboarding/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />
              {/* Talent routes */}
              <Route path="/dashboard/talent" element={<ProtectedRoute requiredRole="talent"><ArtistDashboard /></ProtectedRoute>} />
              <Route path="/talent/portfolio" element={<ProtectedRoute requiredRole="talent"><TalentPortfolio /></ProtectedRoute>} />
              <Route path="/talent/discovery" element={<ProtectedRoute requiredRole="talent"><ProjectDiscovery /></ProtectedRoute>} />
              <Route path="/talent/messages/:userId?" element={<ProtectedRoute requiredRole="talent"><ArtistMessages /></ProtectedRoute>} />
              <Route path="/talent/applied-projects" element={<ProtectedRoute requiredRole="talent"><AppliedProjects /></ProtectedRoute>} />
              <Route path="/talent/audition-invites" element={<ProtectedRoute requiredRole="talent"><AuditionInvites /></ProtectedRoute>} />
              <Route path="/talent/audition/:id" element={<ProtectedRoute requiredRole="talent"><AuditionDetails /></ProtectedRoute>} />
              <Route path="/talent/analytics" element={<ProtectedRoute requiredRole="talent"><PerformanceAnalytics /></ProtectedRoute>} />
              <Route path="/talent/settings" element={<ProtectedRoute requiredRole="talent"><ArtistSettings /></ProtectedRoute>} />
              <Route path="/talent/:id" element={<ProtectedRoute allowedRoles={['talent', 'director', 'admin']}><TalentPortfolio /></ProtectedRoute>} />
              <Route path="/talent/project/:id" element={<ProtectedRoute requiredRole="talent"><ProjectDetails /></ProtectedRoute>} />
              <Route path="/talent/verify" element={<ProtectedRoute requiredRole="talent"><ProfileVerification /></ProtectedRoute>} />
              <Route path="/talent/verification/status" element={<ProtectedRoute requiredRole="talent"><ProfileVerification defaultValue={4} /></ProtectedRoute>} />
              <Route path="/talent/help" element={<ProtectedRoute requiredRole="talent"><HelpSupport /></ProtectedRoute>} />
              <Route path="/talent/upgrade" element={<ProtectedRoute requiredRole="talent"><UpgradePlan /></ProtectedRoute>} />
              <Route path="/talent/checkout" element={<ProtectedRoute requiredRole="talent"><Checkout /></ProtectedRoute>} />
              <Route path="/talent/payment-success" element={<ProtectedRoute requiredRole="talent"><PaymentSuccess /></ProtectedRoute>} />

              {/* Director routes */}
              <Route path="/dashboard/director" element={<ProtectedRoute requiredRole="director"><DirectorDashboard /></ProtectedRoute>} />
              <Route path="/director/portfolio" element={<ProtectedRoute requiredRole="director"><DirectorPortfolio /></ProtectedRoute>} />

              {/* Create Project Flow */}
              <Route path="/director/create-project/step1" element={<ProtectedRoute requiredRole="director"><CreateProjectStep1 /></ProtectedRoute>} />
              <Route path="/director/create-project/step2" element={<ProtectedRoute requiredRole="director"><CreateProjectStep2 /></ProtectedRoute>} />
              <Route path="/director/my-projects" element={<ProtectedRoute requiredRole="director"><MyProjects /></ProtectedRoute>} />
              <Route path="/director/project/:id" element={<ProtectedRoute requiredRole="director"><ProjectDetails /></ProtectedRoute>} />
              <Route path="/director/shortlists" element={<ProtectedRoute requiredRole="director"><Shortlists /></ProtectedRoute>} />
              <Route path="/director/auditions" element={<ProtectedRoute requiredRole="director"><AuditionRequests /></ProtectedRoute>} />
              <Route path="/director/messages/:userId?" element={<ProtectedRoute requiredRole="director"><Messages /></ProtectedRoute>} />
              <Route path="/director/discovery" element={<ProtectedRoute requiredRole="director"><TalentDiscovery /></ProtectedRoute>} />
              <Route path="/director/settings" element={<ProtectedRoute requiredRole="director"><DirectorSettings /></ProtectedRoute>} />
              <Route path="/director/checkout" element={<ProtectedRoute requiredRole="director"><DirectorCheckout /></ProtectedRoute>} />
              {/* Public director profile — viewable by talent, director, admin */}
              <Route path="/director/:id" element={<ProtectedRoute allowedRoles={['talent','director','admin']}><PublicDirectorProfile /></ProtectedRoute>} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/dashboard/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/projects" element={<ProtectedRoute requiredRole="admin"><ProjectOversight /></ProtectedRoute>} />
              <Route path="/admin/projects/:id" element={<ProtectedRoute requiredRole="admin"><ProjectDetails /></ProtectedRoute>} />
              <Route path="/admin/verifications" element={<ProtectedRoute requiredRole="admin"><VerificationReview /></ProtectedRoute>} />
              <Route path="/admin/verifications/:id" element={<ProtectedRoute requiredRole="admin"><VerificationReview /></ProtectedRoute>} />
              <Route path="/admin/users" element={<ProtectedRoute requiredRole="admin"><UserDetail /></ProtectedRoute>} />
              <Route path="/admin/users/:id" element={<ProtectedRoute requiredRole="admin"><UserDetail /></ProtectedRoute>} />
              <Route path="/admin/financials" element={<ProtectedRoute requiredRole="admin"><FinancialReports /></ProtectedRoute>} />
              <Route path="/admin/communication" element={<ProtectedRoute requiredRole="admin"><CommunicationCenter /></ProtectedRoute>} />
              <Route path="/admin/search" element={<ProtectedRoute requiredRole="admin"><GlobalSearch /></ProtectedRoute>} />
              <Route path="/admin/storage" element={<ProtectedRoute requiredRole="admin"><MediaStorage /></ProtectedRoute>} />
              <Route path="/admin/settings" element={<ProtectedRoute requiredRole="admin"><AdminSettings /></ProtectedRoute>} />
              <Route path="/admin/rbac" element={<ProtectedRoute requiredRole="admin"><AdminRBAC /></ProtectedRoute>} />
              <Route path="/admin/health" element={<ProtectedRoute requiredRole="admin"><SystemHealth /></ProtectedRoute>} />

              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </Suspense>
        </BrowserRouter>
      </NotificationProvider>
    </div>
    </ThemeProvider>
  );

}

export default App;
