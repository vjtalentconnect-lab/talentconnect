import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [userType, setUserType] = useState('artist');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log({
      userType,
      email,
      password,
      rememberMe,
    });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100">
      {/* Background Image with Cinematic Blur */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCFzufIm0cD0bYjVER5F5rAoLqZdrz4jOQL0NfEOFj1iWoH9aq0G9b0LNuj0rmIhExI8K2lyktAgdm1H6M0_MxOOQNbTD5s6maYH93MNaB38pdiHF9vscZZ184qfVy7w78PWAXp7IWFjPuU7TPJf-Dl-7MGJtjfkez8v8IYuva3Q0ikEBX2FI_HC3S95TUNOGS8m1D4MddQws560xTarn1cE0hy0wGESaukS7q9iGbdImUtfxNRSBSIaQyXE4kHHMwmIDpoZ5Z-2gSb')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(34,22,16,0.4)] to-[rgba(34,22,16,0.95)]" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navigation / Logo */}
        <header className="w-full px-6 py-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/TC Logo.png" alt="Logo" className="h-10 w-auto" />
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic">
              TalentConnect{' '}
              <span className="text-primary">India</span>
            </h1>
          </div>
          <div className="hidden md:block">
            <p className="text-slate-400 text-sm font-medium">
              India's Leading Talent Platform
            </p>
          </div>
        </header>

        {/* Main Login Container */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-[480px] bg-[rgba(45,30,22,0.6)] backdrop-blur-[12px] border border-[rgba(236,91,19,0.1)] rounded-xl p-8 shadow-2xl">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                Welcome Back
              </h2>
              <p className="text-slate-300">Sign in to your professional profile</p>
            </div>

            {/* User Type Toggle */}
            <div className="mb-8">
              <div className="flex h-12 w-full items-center justify-center rounded-xl bg-background-dark/50 p-1 border border-primary/20">
                <label
                  className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-4 transition-all text-slate-400 text-sm font-semibold has-[:checked]:bg-primary has-[:checked]:text-white"
                  htmlFor="artist"
                >
                  <span>Artist / Actor</span>
                  <input
                    id="artist"
                    checked={userType === 'artist'}
                    onChange={() => setUserType('artist')}
                    name="userType"
                    type="radio"
                    className="hidden"
                  />
                </label>
                <label
                  className="flex cursor-pointer h-full grow items-center justify-center rounded-lg px-4 transition-all text-slate-400 text-sm font-semibold has-[:checked]:bg-primary has-[:checked]:text-white"
                  htmlFor="director"
                >
                  <span>Director / Studio</span>
                  <input
                    id="director"
                    checked={userType === 'director'}
                    onChange={() => setUserType('director')}
                    name="userType"
                    type="radio"
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-200 ml-1">
                  Email or Username
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    person
                  </span>
                  <input
                    className="w-full bg-background-dark/40 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-500"
                    placeholder="name@example.com"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-medium text-slate-200">
                    Password
                  </label>
                  <Link
                    to="#"
                    className="text-xs text-primary hover:text-primary/80 font-semibold uppercase tracking-wider"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                    lock
                  </span>
                  <input
                    className="w-full bg-background-dark/40 border border-slate-700 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-slate-500"
                    placeholder="••••••••"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-1">
                <input
                  className="rounded border-slate-700 bg-background-dark/40 text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                  id="remember"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="text-sm text-slate-300 cursor-pointer" htmlFor="remember">
                  Keep me signed in
                </label>
              </div>

              <button
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
                type="submit"
              >
                <span>ENTER THE STAGE</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-slate-500 bg-[rgba(45,30,22,0.6)]">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button
                className="flex items-center justify-center gap-2 bg-background-dark/40 border border-slate-700 hover:bg-background-dark/60 py-3 rounded-xl transition-colors"
                type="button"
              >
                <img
                  alt="Google Logo"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGjOpggVjOADhZzBSaKSsyqNtc1WYN0so5RILSI6ztxIJVx6NX3Vl1JY_4r-zkNmXSlSCoBSm_QXRQvJuuBhZ_ZSCrbPXwRqkSNHNPBYS2lK9PUYUyt41E-a_lsBAA8G0j6sCOKqgXOV-UnvpriX2xe1peSmESb5dzKA1_G9iRY1nvfum6VO3CFmXZFD47aglEkfSLlE1e6pFtohdTIAmN7vfxHj8KRtk0ir1WCszAJTDRKnXMQwgIGJeG0Qp1eOZYPGrTzuGjGAEr"
                />
                <span className="text-sm font-medium text-white">Google</span>
              </button>
              <button
                className="flex items-center justify-center gap-2 bg-background-dark/40 border border-slate-700 hover:bg-background-dark/60 py-3 rounded-xl transition-colors"
                type="button"
              >
                <img
                  alt="Facebook Logo"
                  className="w-5 h-5"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB86yrQmtv4C-gVPC89OPZBI4b4dayGpvWv5dsrXCSWhEYB9W9ZUa_qpeayTOV1OIUBwRFvnhdoWf5d8HSfEGwLjLjCX1sxhbkLDIHTPym3wqtXugPZwP2hEydfetf8WXmlDjAhTrgnMQDHy7lWMrAZWRTBa55ywXR5SQqybsvB2WETk14Irqc2Gr3Pa7cwv6XNO7zJoYfW_sgePTnTTxCOn0FdQCpeBMmMF4L7-AVX7Lu7CkxBeNWiC9Qwq_bWokvrNJRlwnuheLM1"
                />
                <span className="text-sm font-medium text-white">Facebook</span>
              </button>
            </div>

            {/* Signup CTA */}
            <div className="mt-8 text-center">
              <p className="text-slate-400">
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="text-primary font-bold hover:underline"
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full px-6 py-8 text-center">
          <p className="text-slate-500 text-xs">
            © 2026 TalentConnect. All Rights Reserved. Private &amp; Confidential.
          </p>
          <div className="mt-2 flex justify-center gap-4 text-xs text-slate-500">
            <Link className="hover:text-primary transition-colors" to="#">
              Privacy Policy
            </Link>
            <Link className="hover:text-primary transition-colors" to="#">
              Terms of Service
            </Link>
            <Link className="hover:text-primary transition-colors" to="#">
              Help Center
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LoginPage;
