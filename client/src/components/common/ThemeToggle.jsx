import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200 flex items-center justify-center text-slate-600 dark:text-slate-400"
            aria-label="Toggle theme"
        >
            <span className="material-icons">
                {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
    );
};

export default ThemeToggle;
