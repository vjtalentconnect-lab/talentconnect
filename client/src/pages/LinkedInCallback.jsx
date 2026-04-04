import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { completeLinkedInLogin } from '../services/authService';
import { getMyProfile } from '../services/profileService';

const LinkedInCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const params = new URLSearchParams(location.search);
  const code = params.get('code');
  const state = params.get('state');
  const hasRun = useRef(false);
  const error = params.get('error');
  const errorDescription = params.get('error_description');

  const urlErrorMessage = error
    ? error === 'unauthorized_scope_error'
      ? 'LinkedIn scope authorization failed: your app does not have access to r_liteprofile/r_emailaddress. Please open LinkedIn Developer Portal and add Sign In with LinkedIn product and the required scopes.'
      : `LinkedIn auth error: ${error}${errorDescription ? ` - ${decodeURIComponent(errorDescription)}` : ''}. Please retry and ensure LinkedIn app scopes are approved.`
    : !code
    ? 'Missing LinkedIn code. Please restart login.'
    : null;

  const [message, setMessage] = useState(urlErrorMessage || 'Finishing LinkedIn sign-in...');

  useEffect(() => {
    if (urlErrorMessage) {
      return;
    }

    const finish = async () => {
      if (hasRun.current) return;
      hasRun.current = true;

      try {
        const role = localStorage.getItem('linkedin_oauth_role') || 'talent';
        const data = await completeLinkedInLogin(code, state, role);
        localStorage.removeItem('linkedin_oauth_role');

        const userRole = data.user.role || role;

        try {
          const res = await getMyProfile();
          const profile = res.data?.data || res.data || {};
          const required =
            userRole === 'director'
              ? ['fullName', 'mobile', 'location', 'companyName', 'industryType']
              : ['fullName', 'mobile', 'location', 'talentCategory'];
          const missing = required.filter((field) => !profile?.[field]);
          if (missing.length) {
            navigate('/onboarding/complete-profile', { state: { role: userRole, missing } });
            return;
          }
        } catch (profileErr) {
          console.error('LinkedInCallback - profile fetch failed', profileErr);
        }

        if (userRole === 'talent') {
          const vStatus = data.user?.verificationStatus || 'none';
          if (vStatus === 'none') {
            navigate('/talent/verify');
          } else {
            navigate('/dashboard/talent');
          }
        }
        else if (userRole === 'director') navigate('/dashboard/director');
        else navigate('/dashboard/admin');
      } catch (err) {
        console.error('LinkedInCallback - Error:', err);
        console.error('  Response data:', err.response?.data);
        setMessage(err.response?.data?.message || err.message || 'LinkedIn login failed.');
      }
    };
    finish();
  }, [location.search, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-lg">
        <p className="text-slate-700 dark:text-slate-200 font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default LinkedInCallback;
