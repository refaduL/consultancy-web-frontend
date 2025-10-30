import React from 'react';
import { Loader2 } from 'lucide-react';

/**
 * Reusable Button Component
 * 
 * @param {string} variant - 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {boolean} loading - Shows loading spinner
 * @param {boolean} disabled - Disables the button
 * @param {React.ReactNode} children - Button content
 * @param {string} className - Additional classes
 */

const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  loading = false,
  disabled = false,
  children, 
  className = '',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-100 hover:shadow-glow',
    secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white focus:ring-secondary-100',
    outline: 'border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-100',
    ghost: 'text-gray-600 hover:text-primary-500 hover:bg-primary-50 focus:ring-primary-100',
    danger: 'bg-error-500 hover:bg-error-600 text-white focus:ring-error-100',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };
  
  return (
    <button
      disabled={disabled || loading}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className={`${iconSizes[size]} mr-2 animate-spin`} />
          Loading...
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && (
            <Icon className={`${iconSizes[size]} ${children ? 'mr-2' : ''}`} />
          )}
          {children}
          {Icon && iconPosition === 'right' && (
            <Icon className={`${iconSizes[size]} ${children ? 'ml-2' : ''}`} />
          )}
        </>
      )}
    </button>
  );
};

export default Button;