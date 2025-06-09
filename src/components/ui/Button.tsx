import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  color?: 'purple' | 'info' | 'success';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  color = 'purple',
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseClasses = "flex items-center gap-2 transition-all duration-200 ease-in-out";
  
  const variantClasses = {
    primary: "glass-button",
    secondary: "glass-button bg-dark-card hover:bg-dark-modal",
    text: `text-${color === 'purple' ? 'purple-primary hover:text-purple-hover' : 
           color === 'info' ? 'status-info hover:text-status-info/90' : 
           'status-success hover:text-status-success/90'} transition-colors`
  };
  
  const widthClass = fullWidth ? "w-full justify-center" : "";
  
  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;