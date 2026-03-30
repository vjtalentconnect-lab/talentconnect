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
const ArtistDashboard = lazy(() => import("./talent/ArtistDashboard"));
const TalentPortfolio = lazy(() => import("./talent/TalentPortfolio"));
const ArtistMessages = lazy(() => import("./talent/ArtistMessages"));
const AppliedProjects = lazy(() => import("./talent/AppliedProjects"));
const AuditionInvites = lazy(() => import("./talent/AuditionInvites"));
const AuditionDetails = lazy(() => import("./talent/AuditionDetails"));
const PerformanceAnalytics = lazy(() => import('./talent/PerformanceAnalytics'));
const ArtistSettings = lazy(() => import('./talent/ArtistSettings'));
const ProjectDiscovery = lazy(() => import('./talent/ProjectDiscovery'));
const ProfileVerification = lazy(() => import('./talent/verification/ProfileVerification'));
const HelpSupport = lazy(() => import('./pages/HelpSupport'));
const ContactUs = lazy(() => import('./pages/ContactUs'));
const CommunityForum = lazy(() => import("./pages/CommunityForum"));
const UpgradePlan = lazy(() => import("./talent/UpgradePlan"));
const Checkout = lazy(() => import("./talent/Checkout"));
const PaymentSuccess = lazy(() => import("./talent/PaymentSuccess"));
const DirectorDashboard = lazy(() => import("./director/DirectorDashboard"));
const DirectorPortfolio = lazy(() => import("./director/DirectorPortfolio"));
const CreateProjectStep1 = lazy(() => import("./director/CreateProjectStep1"));
const CreateProjectStep2 = lazy(() => import("./director/CreateProjectStep2"));
const MyProjects = lazy(() => import("./director/MyProjects"));
const ProjectDetails = lazy(() => import("./director/ProjectDetails"));
const Shortlists = lazy(() => import("./director/Shortlists"));
const AuditionRequests = lazy(() => import("./director/AuditionRequests"));
const Messages = lazy(() => import("./director/Messages"));
const TalentDiscovery = lazy(() => import("./director/TalentDiscovery"));
const DirectorSettings = lazy(() => import("./director/DirectorSettings"));
const AdminDashboard = lazy(() => import("./admin/AdminDashboard"));
const ProjectOversight = lazy(() => import("./admin/ProjectOversight"));
const VerificationReview = lazy(() => import("./admin/VerificationReview"));
const UserDetail = lazy(() => import("./admin/UserDetail"));
const FinancialReports = lazy(() => import("./admin/FinancialReports"));
const CommunicationCenter = lazy(() => import("./admin/CommunicationCenter"));
const GlobalSearch = lazy(() => import("./admin/GlobalSearch"));
const MediaStorage = lazy(() => import("./admin/MediaStorage"));
const AdminSettings = lazy(() => import('./admin/AdminSettings'));
const AdminRBAC = lazy(() => import('./admin/AdminRBAC'));
const SystemHealth = lazy(() => import('./admin/SystemHealth'));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const DirectorCheckout = lazy(() => import("./pages/DirectorCheckout"));
const NotFound = lazy(() => import("./pages/NotFound"));
const FindTalent = lazy(() => import("./pages/FindTalent"));
const FindWork = lazy(() => import("./pages/FindWork"));
const Productions = lazy(() => import("./pages/Productions"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ArtistGuidelines = lazy(() => import("./pages/ArtistGuidelines"));
const SuccessStories = lazy(() => import("./pages/SuccessStories"));
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
              <Route path="/login" element={<Login />} />
              <Route path="/loginPage" element={<Login />} />
              <Route path="/register/actor" element={<RegisterActor />} />
              <Route path="/register/director" element={<RegisterDirector />} />
              <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
              <Route path="/onboarding/complete-profile" element={<ProtectedRoute><CompleteProfile /></ProtectedRoute>} />
              {/* Talent routes */}
              <Route path="/dashboard/talent" element={<ProtectedRoute requiredRole="talent"><ArtistDashboard /></ProtectedRoute>} />
              <Route path="/talent/portfolio" element={<ProtectedRoute requiredRole="talent"><TalentPortfolio /></ProtectedRoute>} />
              <Route path="/talent/:id" element={<ProtectedRoute requiredRole="talent"><TalentPortfolio /></ProtectedRoute>} />
              <Route path="/talent/messages" element={<ProtectedRoute requiredRole="talent"><ArtistMessages /></ProtectedRoute>} />
              <Route path="/talent/applied-projects" element={<ProtectedRoute requiredRole="talent"><AppliedProjects /></ProtectedRoute>} />
              <Route path="/talent/auditions" element={<ProtectedRoute requiredRole="talent"><AuditionInvites /></ProtectedRoute>} />
              <Route path="/talent/audition/:id" element={<ProtectedRoute requiredRole="talent"><AuditionDetails /></ProtectedRoute>} />
              <Route path="/talent/performance" element={<ProtectedRoute requiredRole="talent"><PerformanceAnalytics /></ProtectedRoute>} />
              <Route path="/talent/settings" element={<ProtectedRoute requiredRole="talent"><ArtistSettings /></ProtectedRoute>} />
              <Route path="/talent/discovery" element={<ProtectedRoute requiredRole="talent"><ProjectDiscovery /></ProtectedRoute>} />
              <Route path="/talent/verify" element={<ProtectedRoute requiredRole="talent"><ProfileVerification /></ProtectedRoute>} />
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
              <Route path="/director/messages" element={<ProtectedRoute requiredRole="director"><Messages /></ProtectedRoute>} />
              <Route path="/director/discovery" element={<ProtectedRoute requiredRole="director"><TalentDiscovery /></ProtectedRoute>} />
              <Route path="/director/settings" element={<ProtectedRoute requiredRole="director"><DirectorSettings /></ProtectedRoute>} />
              <Route path="/checkout/director" element={<ProtectedRoute requiredRole="director"><DirectorCheckout /></ProtectedRoute>} />

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
