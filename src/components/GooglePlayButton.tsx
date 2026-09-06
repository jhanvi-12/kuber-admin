import React from 'react';
import GooglePlayIcon from './icons/GooglePlayIcon';
import { PLAY_STORE_RIDER } from '../constants';

interface GooglePlayButtonProps {
  href?: string;
  className?: string;
  variant?: 'ink' | 'light';
}

const GooglePlayButton: React.FC<GooglePlayButtonProps> = ({
  href = PLAY_STORE_RIDER,
  className = '',
  variant = 'ink',
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold ${
      variant === 'light'
        ? 'bg-white text-purple-800 hover:bg-paper'
        : 'bg-ink text-white hover:bg-ink/90'
    } ${className}`}
  >
    <GooglePlayIcon className="h-5 w-5" />
    Google Play
  </a>
);

export default GooglePlayButton;
