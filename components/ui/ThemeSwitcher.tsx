
import React from 'react';

// Simplified SVG for Moon Icon
const MoonIcon = ({ active }: { active: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`w-5 h-5 transition-colors duration-300 ${active ? 'text-sky-500' : 'text-slate-400'}`}
    aria-hidden="true"
  >
    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-3.51 1.713-6.636 4.382-8.442a.75.75 0 01.819.162z" clipRule="evenodd" />
  </svg>
);

// Simplified SVG for Sun Icon
const SunIcon = ({ active }: { active: boolean }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`w-5 h-5 transition-colors duration-300 ${active ? 'text-yellow-500' : 'text-slate-400 dark:text-slate-500'}`}
    aria-hidden="true"
  >
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V18.75a.75.75 0 01.75-.75zM5.106 17.834a.75.75 0 001.06 1.06l1.591-1.59a.75.75 0 00-1.06-1.061l-1.591 1.59zM6 12a.75.75 0 01-.75-.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 5.106a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 101.061-1.06l-1.59-1.591z" />
  </svg>
);

interface ThemeSwitcherProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, toggleTheme }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      className="flex items-center space-x-1 p-1.5 rounded-full 
                 bg-slate-100 dark:bg-slate-700 
                 border border-slate-300 dark:border-slate-600 
                 hover:bg-slate-200 dark:hover:bg-slate-600 
                 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:focus-visible:ring-sky-500
                 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
    >
      <MoonIcon active={isDark} />
      
      <div className="relative w-8 h-4 rounded-full bg-slate-300 dark:bg-slate-500">
        <div
          className={`absolute top-[2px] left-[2px] w-3 h-3 bg-white dark:bg-slate-300 rounded-full shadow-md transition-transform duration-300 ease-in-out
            ${isDark ? 'translate-x-0' : 'translate-x-[16px]'}`} // Position logic remains, color is standard
        />
      </div>
      
      <SunIcon active={!isDark} />
    </button>
  );
};

export default ThemeSwitcher;
