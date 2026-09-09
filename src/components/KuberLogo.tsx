import { IMAGES } from '../constants/images';

interface KuberLogoProps {
  variant?: 'color' | 'white';
  className?: string;
}

const KuberLogo: React.FC<KuberLogoProps> = ({ variant = 'color', className = '' }) => {
  return (
    <img
      src={IMAGES.kuberCabLogo}
      alt="Kuber.cab"
      className={`${variant === 'white' ? 'h-16 w-auto brightness-0 invert' : 'h-10 w-auto md:h-12'} ${className}`}
    />
  );
};

export default KuberLogo;
