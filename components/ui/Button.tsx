import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
  const primaryStyles = "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500";
  const secondaryStyles = "bg-slate-300 text-black hover:bg-slate-400 focus:ring-slate-500"; // Changed text-slate-700 to text-black

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