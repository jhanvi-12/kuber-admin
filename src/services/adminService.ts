import { apiClient } from './apiClient';
import { 
  AdminLoginPayload, 
  AdminLoginResponse, 
  ApproveRejectDriverPayload, 
  DriverListResponse 
} from '../types/admin';

export const adminService = {
  /**
   * Admin Login API
   * Authenticates the admin and typically returns an access token.
   * Method: POST
   * Endpoint: /v1/auth/admin/login
   */
  login: (data: AdminLoginPayload): Promise<AdminLoginResponse> => {
    return apiClient<AdminLoginResponse>('v1/auth/admin/login', {
      method: 'POST',
      data,
    });
  },

  /**
   * Approve / Reject Driver API
   * Modifies the current status of a given driver based on background checks.
   * Method: POST
   * Endpoint: /v1/driver/approve/reject
   */
  approveOrRejectDriver: (data: ApproveRejectDriverPayload): Promise<any> => {
    return apiClient<any>('v1/driver/approve/reject', {
      method: 'POST',
      data,
    });
  },

  /**
   * Driver List API
   * Fetches the full list of drivers with pagination.
   * Method: GET
   * Endpoint: /v1/driver/list?page={page}&limit={limit}
   */
  getDriverList: (page: number = 1, limit: number = 10): Promise<DriverListResponse> => {
    return apiClient<DriverListResponse>(`v1/driver/list?page=${page}&limit=${limit}`, {
      method: 'GET',
    });
  }
};
