import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { completeLinkedInLogin } from '../services/authService';

const LinkedInCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Finishing LinkedIn sign-in...');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');

    if (!code) {
      setMessage('Missing LinkedIn code. Please try again.');
      return;
    }

    const finish = async () => {
      try {
        const data = await completeLinkedInLogin(code, state);
        const role = data.user.role || 'talent';
        if (role === 'talent') navigate('/dashboard/talent');
        else if (role === 'director') navigate('/dashboard/director');
        else navigate('/dashboard/admin');
      } catch (err) {
        console.error(err);
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
