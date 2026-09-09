import React from 'react';
import { IMAGES } from '../../constants/images';

export type RideKind = 'bike' | 'auto' | 'cab';
export type VehicleVariant = 'card' | 'avatar';

export const VEHICLE_ICONS: Record<RideKind, string> = {
  bike: IMAGES.icon3dBike,
  auto: IMAGES.icon3dAuto,
  cab: IMAGES.icon3dCab,
};

interface VehicleIconProps {
  kind: RideKind;
  size?: number;
  className?: string;
}

export const VehicleIcon: React.FC<VehicleIconProps> = ({ kind, size = 40, className = '' }) => (
  <img
    src={VEHICLE_ICONS[kind]}
    alt=""
    width={size}
    height={size}
    className={`inline-block object-contain ${className}`}
    aria-hidden
  />
);

const Frame: React.FC<{ children: React.ReactNode; className?: string; variant?: VehicleVariant }> = ({
  children,
  className = '',
  variant = 'card',
}) => (
  <div
    className={
      variant === 'avatar'
        ? `flex h-[4.75rem] w-[4.75rem] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-purple-100 ${className}`
        : `flex h-40 items-center justify-center rounded-3xl bg-purple-50 sm:h-48 ${className}`
    }
  >
    {children}
  </div>
);

const Art: React.FC<{ kind: RideKind; variant?: VehicleVariant }> = ({ kind, variant = 'card' }) => (
  <img
    src={VEHICLE_ICONS[kind]}
    alt=""
    className={variant === 'avatar' ? 'h-[88%] w-[88%] object-contain' : 'h-[90%] w-auto object-contain'}
    aria-hidden
  />
);

export const BikeVehicle: React.FC<{ variant?: VehicleVariant; className?: string }> = ({
  variant = 'card',
  className,
}) => (
  <Frame variant={variant} className={className}>
    <Art kind="bike" variant={variant} />
  </Frame>
);

export const AutoVehicle: React.FC<{ variant?: VehicleVariant; className?: string }> = ({
  variant = 'card',
  className,
}) => (
  <Frame variant={variant} className={className}>
    <Art kind="auto" variant={variant} />
  </Frame>
);

export const CabVehicle: React.FC<{ variant?: VehicleVariant; className?: string }> = ({
  variant = 'card',
  className,
}) => (
  <Frame variant={variant} className={className}>
    <Art kind="cab" variant={variant} />
  </Frame>
);
