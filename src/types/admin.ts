export interface AdminLoginPayload {
  email: string;
  password?: string;
}

export interface AdminLoginResponse {
  token?: string;
  user?: any;
  message?: string;
  [key: string]: any;
}

export interface ApproveRejectDriverPayload {
  driver_id: number;
  reason: string;
  ride_type: string;
  status: number;
}

export interface DriverData {
  id: number;
  name?: string;
  status?: number;
  [key: string]: any;
}

export interface DriverListResponse {
  data?: DriverData[];
  message?: string;
  total?: number;
  totalPages?: number;
  currentPage?: number;
  [key: string]: any;
}

export interface DriverDetails {
  id: number;
  full_name: string;
  email: string;
  mobile: string;
  profile_image?: string;
  license_front_image?: string;
  license_back_image?: string;
  rc_image?: string;
  ride_type?: string;
  vehicle_type?: string;
  vehicle_image?: string;
  vehicle_insurance_image?: string;
}

export interface DriverDetailsResponse {
  status: string;
  data: DriverDetails;
  message?: string;
}
