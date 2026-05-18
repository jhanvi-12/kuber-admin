/**
 * Base API Client to handle API requests.
 * Uses environment variables for configuration.
 * Includes token authorization and automated error handling.
 */

// Use various fallbacks for BASE_URL depending on the Vite setup logic
const BASE_URL = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_BASE_URL || import.meta.env.BASE_URL || 'https://api.kubercab.in/';

interface ApiOptions extends RequestInit {
  data?: any;
}

export const getAuthToken = () => localStorage.getItem('admin_token');
export const setAuthToken = (token: string) => localStorage.setItem('admin_token', token);
export const removeAuthToken = () => localStorage.removeItem('admin_token');

export const apiClient = async <T>(endpoint: string, options: ApiOptions = {}): Promise<T> => {
  // Ensure the formatting of the provided URL and endpoint
  const url = `${BASE_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  
  const headers = new Headers(options.headers || {});
  
  // Set default content type if not modifying a FormData object
  if (!headers.has('Content-Type') && !(options.data instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  // Add auth token if available after a successful login
  const token = getAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
  };

  // Convert payload data to string format for simple JSON requests
  if (options.data && !(options.data instanceof FormData)) {
    fetchOptions.body = JSON.stringify(options.data);
  }

  try {
    const response = await fetch(url, fetchOptions);
    
    // Parse JSON safely considering different server content-type responses
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      // Create user-friendly error response
      const errorMessage = (data && (data.message || data.error)) || `API Error: ${response.status} ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return data as T;
  } catch (error) {
    console.error(`API Client Error (${endpoint}):`, error);
    throw error; // Re-throw to handle it in individual services or UI components
  }
};
