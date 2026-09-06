import React from 'react';
import { VehicleIcon } from './RideVehicles';

interface MotoIconProps {
  size?: number;
  className?: string;
}

const MotoIcon: React.FC<MotoIconProps> = ({ size = 32, className = '' }) => (
  <VehicleIcon kind="bike" size={size} className={className} />
);

export default MotoIcon;
