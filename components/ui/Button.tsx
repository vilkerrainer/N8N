
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg' | string; // Added size prop, allow any string for flexibility if needed
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', size, className, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors duration-150";
  
  // Standard Tailwind palette
  const lightPrimaryStyles = "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500";
  const lightSecondaryStyles = "bg-slate-200 text-slate-700 hover:bg-slate-300 focus:ring-slate-400 border border-slate-300";

  // Standard Tailwind dark palette
  const darkPrimaryStyles = "dark:bg-sky-500 dark:text-white dark:hover:bg-sky-600 dark:focus:ring-sky-400";
  const darkSecondaryStyles = "dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 dark:focus:ring-slate-500 dark:border dark:border-slate-600";

  const styles = variant === 'primary' 
    ? `${lightPrimaryStyles} ${darkPrimaryStyles}` 
    : `${lightSecondaryStyles} ${darkSecondaryStyles}`;
  
  // Basic size handling - consumers can override with className if more specific styles are needed.
  // This example doesn't add specific size classes here, as the error was about prop existence.
  // The consuming component (CharacterSheetDisplay) was already providing text-xs, px-2, py-1.

  return (
    <button
      {...props}
      className={`${baseStyles} ${styles} ${className}`}
      // data-size={size} // Optionally add data attribute if needed for styling/debugging
    >
      {children}
    </button>
  );
};

export default Button;
