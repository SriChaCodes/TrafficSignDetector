 
import React from 'react';

const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';
export default Input;