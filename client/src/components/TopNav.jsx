import React from 'react';
import { Link } from 'react-router-dom';

// Sticky top navigation shared across marketing pages.
const TopNav = () => {
  const toggleTheme = () => document.documentElement.classList.toggle('dark');

  return (
    <nav className="fixed top-0 left-0 right-0 w-full z-50 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <img src="/TC Logo.png" alt="Logo" className="h-10 w-auto" />
            <span className="font-display font-bold text-2xl tracking-wide text-gray-900 dark:text-white">
              TALENT<span className="text-primary">CONNECT</span>
            </span>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" to="/">Home</Link>
            <Link className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" to="/find-talent">Find Talent</Link>
            <Link className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" to="/find-work">Find Work</Link>
            <Link className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" to="/productions">Productions</Link>
            <Link className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors font-medium" to="/about-us">About Us</Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/loginPage"
              className="bg-primary hover:bg-primary/90 text-white dark:text-black font-semibold px-6 py-2.5 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-primary/30"
            >
              Sign In
            </Link>
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
            >
              <span className="material-icons text-gray-600 dark:text-gray-300">brightness_4</span>
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button className="text-gray-600 dark:text-gray-300 hover:text-primary" aria-label="Open menu">
              <span className="material-icons text-3xl">menu</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
