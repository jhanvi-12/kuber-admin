import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../services/adminService';
import { getAuthToken, removeAuthToken } from '../services/apiClient';
import { 
  Users, 
  Car, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  LogOut,
  Download,
  Filter,
  Search,
  Calendar,
  MapPin,
  Phone,
  Mail,
  FileText
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

interface DriverRequest {
  id: string;
  backendId?: number;
  name: string;
  email: string;
  phone: string;
  city: string;
  vehicleType: string;
  experience: string;
  profileImage?: string;
  status: 'pending' | 'approved' | 'rejected' | 'pending_verification';
  docsStatus: 'pending' | 'approved' | 'rejected';
  isDocsVerified?: number | boolean;
  submittedAt: string;
  documents?: {
    license: boolean;
    registration: boolean;
    insurance: boolean;
  };
}

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<DriverRequest | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDriversCount, setTotalDriversCount] = useState(0);
  const [limit] = useState(10);

  const [driverRequests, setDriverRequests] = useState<DriverRequest[]>([]);

  const stats = {
    totalDrivers: totalDriversCount || driverRequests.length,
    docsPending: driverRequests.filter(req => req.docsStatus === 'pending').length,
    awaitingApproval: driverRequests.filter(req => req.status === 'pending' && req.docsStatus === 'approved').length
  };

  const fetchDrivers = React.useCallback(async () => {
    try {
      const response = await adminService.getDriverList(currentPage, limit);
      let driversList: any[] = [];
      
      const resData = response?.data as any;
      if (resData && Array.isArray(resData.drivers)) {
        driversList = resData.drivers;
        if (resData.totalPages) setTotalPages(resData.totalPages);
        else if (resData.totalCount) {
          setTotalDriversCount(resData.totalCount);
          setTotalPages(Math.ceil(resData.totalCount / limit));
        } else if (resData.total) {
          setTotalDriversCount(resData.total);
          setTotalPages(Math.ceil(resData.total / limit));
        }
      } else if (response && response.data && Array.isArray(response.data)) {
        driversList = response.data;
        if (response.totalPages) setTotalPages(response.totalPages);
        else if (response.total) setTotalPages(Math.ceil(response.total / limit));
        
        if (response.total) setTotalDriversCount(response.total);
      } else if (Array.isArray(response)) {
        driversList = response;
      }

      setDriverRequests(driversList.map((d: any) => ({
        ...d,
        id: d.id?.toString() || Math.random().toString(),
        backendId: d.id,
        name: d.full_name || d.name || 'Unknown Driver',
        email: d.email || 'N/A',
        phone: d.mobile || d.phone || 'N/A',
        city: d.city || '',
        vehicleType: d.ride_type || d.vehicleType || 'unknown',
        experience: d.experience || '0',
        profileImage: d.profile_image || null,
        status: d.status === 1 ? 'approved' : (d.status === 2 ? 'rejected' : 'pending'),
        docsStatus: d.is_docs_verified === 1 ? 'approved' : (d.is_docs_verified === 2 ? 'rejected' : 'pending'),
        isDocsVerified: d.is_docs_verified === 1 || d.is_docs_verified === true,
        submittedAt: d.submittedAt || d.created_at || new Date().toISOString(),
        documents: d.documents || { license: false, registration: false, insurance: false }
      })));
    } catch (error: any) {
      toast.error('Failed to load drivers: ' + (error.message || 'Unknown error'));
    }
  }, [currentPage, limit]);

  useEffect(() => {
    // Check if admin is authenticated
    const token = getAuthToken();
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchDrivers();
    }
  }, [navigate, fetchDrivers]);

  const handleLogout = () => {
    removeAuthToken();
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const handleApproveRequest = async (id: string, backendId?: number) => {
    try {
      const apiDriverId = backendId !== undefined ? backendId : Number(id);
      
      await adminService.approveOrRejectDriver({
        driver_id: apiDriverId,
        reason: "Background verification completed successfully",
        status: 1
      });

      setDriverRequests(prev => 
        prev.map(req => 
          req.id === id ? { ...req, status: 'approved' as const } : req
        )
      );
      toast.success('Driver request approved!');
      setSelectedRequest(null);
    } catch (error: any) {
      toast.error('Failed to approve driver: ' + (error.message || 'Unknown error'));
    }
  };

  const handleRejectRequest = async (id: string, backendId?: number) => {
    try {
      const apiDriverId = backendId !== undefined ? backendId : Number(id);

      await adminService.approveOrRejectDriver({
        driver_id: apiDriverId,
        reason: "Rejected by admin",
        status: 2 // Assuming 2 represents rejection
      });

      setDriverRequests(prev => 
        prev.map(req => 
          req.id === id ? { ...req, status: 'rejected' as const } : req
        )
      );
      toast.success('Driver request rejected!');
      setSelectedRequest(null);
    } catch (error: any) {
      toast.error('Failed to reject driver: ' + (error.message || 'Unknown error'));
    }
  };

  const handleExport = () => {
    try {
      const escapeCsv = (val: any) => {
        if (val === null || val === undefined) return '""';
        return `"${String(val).replace(/"/g, '""')}"`;
      };

      const headers = ['Driver Name', 'City', 'Email', 'Phone', 'Vehicle Type', 'Experience (Years)', 'Status', 'Submitted At'];
      
      const csvContent = [
        // Ensure headers are quoted too to prevent parsing issues
        headers.map(escapeCsv).join(','),
        ...driverRequests.map(req => 
          [
            escapeCsv(req.name || 'Unknown'),
            escapeCsv(req.city || 'N/A'),
            escapeCsv(req.email || 'N/A'),
            escapeCsv(req.phone || 'N/A'),
            escapeCsv(req.vehicleType || 'Unknown'),
            escapeCsv(req.experience || '0'),
            escapeCsv(req.status || 'Pending'),
            escapeCsv(formatDate(req.submittedAt || new Date().toISOString()))
          ].join(',')
        )
      ].join('\r\n'); // Use CRLF line breaker for Windows support

      // Explicit byte array for UTF-8 Byte Order Mark forces Excel to recognize characters and delimiters
      const BOM = new Uint8Array([0xEF, 0xBB, 0xBF]);
      const blob = new Blob([BOM, csvContent], { type: 'text/csv;charset=utf-8;' });
      
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'drivers_export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Export downloaded successfully!');
    } catch (error) {
      toast.error('Failed to export data');
    }
  };

  const filteredRequests = driverRequests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || request.docsStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending_verification': return 'bg-orange-100 text-orange-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/kuber-cab-sb.png" alt="Kuber.cab" className="h-8 w-auto mr-3" />
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('drivers')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'drivers'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Driver Requests
            </button>
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Drivers</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.totalDrivers.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Docs Pending</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.docsPending}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Awaiting Approval</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.awaitingApproval}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Recent Driver Requests</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {driverRequests.slice(0, 5).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {request.profileImage ? (
                            <img src={request.profileImage} alt={request.name} className="h-10 w-10 rounded-full object-cover" />
                          ) : (
                            <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-purple-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{request.name}</p>
                          <p className="text-sm text-gray-500">
                            {[request.city, request.vehicleType !== 'unknown' ? request.vehicleType : ''].filter(Boolean).join(' • ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.docsStatus)}`}>
                          Docs: {formatStatus(request.docsStatus)}
                        </span>
                        <span className="text-sm text-gray-500">{formatDate(request.submittedAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Driver Requests Tab */}
        {activeTab === 'drivers' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search drivers..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All Doc Status</option>
                  <option value="pending">Docs Pending</option>
                  <option value="approved">Docs Approved</option>
                  <option value="rejected">Docs Rejected</option>
                </select>
                <button 
                  onClick={handleExport}
                  className="flex items-center justify-center px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors">
                  <Download className="h-5 w-5 mr-2" />
                  Export
                </button>
              </div>
            </div>

            {/* Driver Requests Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">
                  Driver Requests ({filteredRequests.length})
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Driver
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Docs
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              {request.profileImage ? (
                                <img src={request.profileImage} alt={request.name} className="h-10 w-10 rounded-full object-cover" />
                              ) : (
                                <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                  <Users className="h-5 w-5 text-purple-600" />
                                </div>
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{request.name}</div>
                              {request.city && <div className="text-sm text-gray-500">{request.city}</div>}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{request.email}</div>
                          <div className="text-sm text-gray-500">{request.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 capitalize">{request.vehicleType}</div>
                          <div className="text-sm text-gray-500">{request.experience} years exp</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.docsStatus)}`}>
                            {formatStatus(request.docsStatus)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(request.submittedAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => setSelectedRequest(request)}
                              className="text-purple-600 hover:text-purple-900 flex items-center"
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </button>
                            {request.status === 'pending' && request.docsStatus === 'approved' && (
                              <>
                                <button
                                  onClick={() => handleApproveRequest(request.id, request.backendId)}
                                  className="text-green-600 hover:text-green-900 flex items-center"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRejectRequest(request.id, request.backendId)}
                                  className="text-red-600 hover:text-red-900 flex items-center"
                                >
                                  <XCircle className="h-4 w-4 mr-1" />
                                  Reject
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing page {currentPage} of {totalPages} {totalDriversCount ? `(Total ${totalDriversCount})` : ''}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                        currentPage === 1 
                          ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' 
                          : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                        currentPage === totalPages 
                          ? 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed' 
                          : 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Driver Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Driver Request Details</h3>
                <button
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-gray-600 p-2"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    {selectedRequest.profileImage ? (
                      <img src={selectedRequest.profileImage} alt={selectedRequest.name} className="h-12 w-12 rounded-full object-cover mr-3" />
                    ) : (
                      <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <Users className="h-6 w-6 text-purple-600" />
                      </div>
                    )}
                    <h4 className="font-semibold text-gray-900 flex items-center m-0">
                      Personal Information
                    </h4>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{selectedRequest.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">City</p>
                      <p className="font-medium">{selectedRequest.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedRequest.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedRequest.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Vehicle Information */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Car className="h-5 w-5 mr-2" />
                    Vehicle Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Vehicle Type</p>
                      <p className="font-medium capitalize">{selectedRequest.vehicleType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Experience</p>
                      <p className="font-medium">{selectedRequest.experience} years</p>
                    </div>
                  </div>
                </div>

                {/* Documents Status */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Documents Status
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Driving License</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        selectedRequest.documents?.license ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedRequest.documents?.license ? 'Submitted' : 'Missing'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Vehicle Registration</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        selectedRequest.documents?.registration ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedRequest.documents?.registration ? 'Submitted' : 'Missing'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Insurance</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        selectedRequest.documents?.insurance ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedRequest.documents?.insurance ? 'Submitted' : 'Missing'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status and Actions */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Overall Status</p>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedRequest.status)}`}>
                        {formatStatus(selectedRequest.status)}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Document Status</p>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedRequest.docsStatus)}`}>
                        {formatStatus(selectedRequest.docsStatus)}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    Submitted: {formatDate(selectedRequest.submittedAt)}
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedRequest.status === 'pending' && selectedRequest.docsStatus === 'approved' && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleApproveRequest(selectedRequest.id, selectedRequest.backendId)}
                      className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Approve Request
                    </button>
                    <button
                      onClick={() => handleRejectRequest(selectedRequest.id, selectedRequest.backendId)}
                      className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                    >
                      <XCircle className="h-5 w-5 mr-2" />
                      Reject Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;