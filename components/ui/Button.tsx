import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-150";
  const primaryStyles = "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500 dark:bg-sky-500 dark:hover:bg-sky-600 dark:focus:ring-sky-400"; // Primary dark mode might need text adjustment if bg gets too light
  const secondaryStyles = "bg-slate-300 text-black hover:bg-slate-400 focus:ring-slate-500 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600 dark:focus:ring-slate-500";

  const styles = variant === 'primary' ? primaryStyles : secondaryStyles;

  return (
    <button
      {...props}
      className={`${baseStyles} ${styles} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;