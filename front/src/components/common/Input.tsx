'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, '-');

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-slate-700 mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-2.5 bg-white border rounded-lg transition-all duration-200
            text-slate-900 placeholder-slate-400
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            ${error ? 'border-red-400 focus:ring-red-500' : 'border-slate-300 hover:border-slate-400'}
            ${className}
          `}
          {...props}
        />
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-1.5 text-sm text-red-500">
            {error}
          </motion.p>
        )}
        {helperText && !error && <p className="mt-1.5 text-sm text-slate-500">{helperText}</p>}
      </motion.div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
