import React, { ForwardedRef } from 'react';

interface TypingIndicatorProps {
  typingRef: ForwardedRef<HTMLDivElement>;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ typingRef }) => {
  return (
    <div
      ref={typingRef}
      className='absolute opacity-0 bottom-0 left-1/2 translate-x-[-50%] rounded-lg py-2 px-3 bg-secondary'
    >
      <div className='typing-dot'></div>
      <div className='typing-dot'></div>
      <div className='typing-dot'></div>
    </div>
  );
};

export default TypingIndicator;
