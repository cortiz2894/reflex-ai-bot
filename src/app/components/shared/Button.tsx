import React, { ReactNode } from 'react';

interface ButtonProps {
  action: () => void;
  text: string;
  icon: ReactNode;
}

const Button: React.FC<ButtonProps> = ({ action, text, icon }) => {
  return (
    <button 
      className='relative px-1 py-2 border border-greenReflex rounded-lg overflow-hidden button'
      onClick={action}
    >
      <div className='flex items-center justify-center z-10 relative'>
        {icon}
        <p className='text-white font-semibold ml-2 mx-2'>{text}</p>
        <div className='absolute right-[-1em]'>
          {icon}
        </div>
      </div>
    </button>
  );
};

export default Button;
