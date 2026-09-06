import React from 'react';

const GooglePlayIcon: React.FC<{ className?: string }> = ({ className = 'h-5 w-5' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden>
    <path fill="#EA4335" d="M3.2 2.1c-.4.2-.7.6-.7 1.1v17.6c0 .5.3.9.7 1.1L13.6 12 3.2 2.1Z" />
    <path fill="#FBBC04" d="m16.5 14.9-2.9-2.9L3.2 21.9l13.3-7Z" />
    <path fill="#4285F4" d="M20.9 10.9c.7-.4.7-1.4 0-1.8L16.5 6.7 13.6 12l2.9 2.9 4.4-4Z" />
    <path fill="#34A853" d="M16.5 6.7 3.2 2.1 13.6 12l2.9-5.3Z" />
  </svg>
);

export default GooglePlayIcon;
