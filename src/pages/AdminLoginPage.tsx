import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Eye, EyeOff, Lock, User, Sun, Moon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { adminService } from '../services/adminService';
import { setAuthToken } from '../services/apiClient';
import { useAdminTheme } from '../contexts/AdminThemeContext';

const AdminLoginPage: React.FC = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useAdminTheme();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await adminService.login({
        email: credentials.email,
        password: credentials.password
      });

      const token = response.token || response.access_token || response?.data?.token || response?.data?.access_token;

      if (token) {
        setAuthToken(token);
        toast.success(response.message || response?.data?.message || 'Login successful!');
        navigate('/admin/dashboard');
      } else {
        toast.error(response.message || response?.data?.message || 'Login successfully done, but no token was provided in the response.');
        console.log('Login response without token:', response);
      }
    } catch (error: any) {
      toast.error(error.message || 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-4 relative ${
        isDark
          ? 'bg-black [color-scheme:dark]'
          : 'admin-theme-light bg-gray-50 [color-scheme:light]'
      }`}
    >
      <Toaster position="top-right" />

      <button
        type="button"
        onClick={toggleTheme}
        className={`absolute top-4 right-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg border transition-colors ${
          isDark
            ? 'border-zinc-700 text-gray-300 hover:text-white hover:bg-zinc-800'
            : 'border-gray-300 text-gray-700 hover:text-gray-900 hover:bg-white'
        }`}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        <span className="text-sm font-medium">{isDark ? 'Light' : 'Dark'}</span>
      </button>

      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div
            className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
              isDark ? 'bg-purple-950 border border-purple-800' : 'bg-purple-100'
            }`}
          >
            <Shield className={`h-8 w-8 ${isDark ? 'text-purple-300' : 'text-purple-600'}`} />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Admin Panel
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Sign in to access the Kuber.cab admin dashboard
          </p>
        </div>

        <div
          className={`rounded-2xl shadow-xl p-8 ${
            isDark ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border border-gray-200'
          }`}
        >
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  type="email"
                  required
                  className={`w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    isDark
                      ? 'bg-zinc-950 border border-zinc-700 text-white placeholder-gray-500'
                      : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter your email"
                  value={credentials.email}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  className={`w-full pl-10 pr-12 py-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                    isDark
                      ? 'bg-zinc-950 border border-zinc-700 text-white placeholder-gray-500'
                      : 'bg-white border border-gray-300 text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="Enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
                />
                <button
                  type="button"
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-all text-white shadow-lg ${
                isLoading
                  ? 'bg-zinc-700 cursor-not-allowed'
                  : 'bg-purple-700 hover:bg-purple-600 transform hover:scale-105'
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">Protected by Kuber.cab Security</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
