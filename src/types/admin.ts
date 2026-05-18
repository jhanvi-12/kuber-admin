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
