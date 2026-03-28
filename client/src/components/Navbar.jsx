import { Link } from "react-router-dom";
import ThemeToggle from "./common/ThemeToggle";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 z-50 bg-white/70 dark:bg-black/20 backdrop-blur-md border-b border-black/5 dark:border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/" className="flex items-center gap-3">
          <img src="/TC Logo.png" alt="Logo" className="h-8 w-auto" />
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            TALENT<span className="text-primary">CONNECT</span>
          </h1>
        </Link>

        <div className="flex gap-6 items-center">
          <ThemeToggle />
          <Link
            to="/login"
            className="text-slate-700 dark:text-white/80 hover:text-primary dark:hover:text-white font-medium transition-colors"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-primary text-white px-5 py-2 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            Get Started
          </Link>
        </div>

      </div>
    </nav>
  );
};


export default Navbar;
