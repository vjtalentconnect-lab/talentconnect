import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { completeLinkedInLogin } from '../services/authService';
import { getMyProfile } from '../services/profileService';

const LinkedInCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Finishing LinkedIn sign-in...');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');

    if (!code) {
      setMessage('Missing LinkedIn code. Please restart login.');
      return;
    }

    const finish = async () => {
      try {
        console.log('LinkedInCallback - Exchanging code for token');
        console.log('  Code:', code.substring(0, 20) + '...');
        console.log('  State:', state);

        const role = localStorage.getItem('linkedin_oauth_role') || 'talent';
        const data = await completeLinkedInLogin(code, state, role);
        localStorage.removeItem('linkedin_oauth_role');

        console.log('LinkedInCallback - Login successful');
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

        if (userRole === 'talent') navigate('/dashboard/talent');
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
