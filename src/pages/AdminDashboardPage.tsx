import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  name: string;
  email: string;
  phone: string;
  city: string;
  vehicleType: string;
  experience: string;
  status: 'pending' | 'approved' | 'rejected';
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

  // Mock data - in production, this would come from an API
  const [driverRequests, setDriverRequests] = useState<DriverRequest[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      email: 'rajesh.kumar@email.com',
      phone: '+91 98765 43210',
      city: 'Ahmedabad',
      vehicleType: 'sedan',
      experience: '5-10',
      status: 'pending',
      submittedAt: '2024-03-15T10:30:00Z',
      documents: { license: true, registration: true, insurance: false }
    },
    {
      id: '2',
      name: 'Amit Sharma',
      email: 'amit.sharma@email.com',
      phone: '+91 87654 32109',
      city: 'Surat',
      vehicleType: 'bike',
      experience: '2-5',
      status: 'approved',
      submittedAt: '2024-03-14T15:45:00Z',
      documents: { license: true, registration: true, insurance: true }
    },
    {
      id: '3',
      name: 'Priya Patel',
      email: 'priya.patel@email.com',
      phone: '+91 76543 21098',
      city: 'Vadodara',
      vehicleType: 'auto',
      experience: '10+',
      status: 'pending',
      submittedAt: '2024-03-13T09:15:00Z',
      documents: { license: true, registration: false, insurance: true }
    },
    {
      id: '4',
      name: 'Suresh Mehta',
      email: 'suresh.mehta@email.com',
      phone: '+91 65432 10987',
      city: 'Rajkot',
      vehicleType: 'suv',
      experience: '5-10',
      status: 'rejected',
      submittedAt: '2024-03-12T14:20:00Z',
      documents: { license: false, registration: true, insurance: true }
    },
    {
      id: '5',
      name: 'Neha Singh',
      email: 'neha.singh@email.com',
      phone: '+91 54321 09876',
      city: 'Gandhinagar',
      vehicleType: 'bike',
      experience: '2-5',
      status: 'pending',
      submittedAt: '2024-03-11T11:30:00Z',
      documents: { license: true, registration: true, insurance: true }
    }
  ]);

  const stats = {
    totalDrivers: 1247,
    activeDrivers: 1089,
    pendingRequests: driverRequests.filter(req => req.status === 'pending').length,
    approvedToday: 12,
    totalRides: 45678,
    revenue: 2345678
  };

  useEffect(() => {
    // Check if admin is authenticated
    const token = localStorage.getItem('kubercab_admin_token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('kubercab_admin_token');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const handleApproveRequest = (id: string) => {
    setDriverRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status: 'approved' as const } : req
      )
    );
    toast.success('Driver request approved!');
    setSelectedRequest(null);
  };

  const handleRejectRequest = (id: string) => {
    setDriverRequests(prev => 
      prev.map(req => 
        req.id === id ? { ...req, status: 'rejected' as const } : req
      )
    );
    toast.success('Driver request rejected!');
    setSelectedRequest(null);
  };

  const filteredRequests = driverRequests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
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
      default: return 'bg-yellow-100 text-yellow-800';
    }
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    <Car className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Active Drivers</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.activeDrivers.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Pending Requests</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.pendingRequests}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Approved Today</p>
                    <p className="text-2xl font-semibold text-gray-900">{stats.approvedToday}</p>
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
                          <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                            <Users className="h-5 w-5 text-purple-600" />
                          </div>
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">{request.name}</p>
                          <p className="text-sm text-gray-500">{request.city} • {request.vehicleType}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
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
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <button className="flex items-center justify-center px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition-colors">
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
                        Status
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
                              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center">
                                <Users className="h-5 w-5 text-purple-600" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{request.name}</div>
                              <div className="text-sm text-gray-500">{request.city}</div>
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
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
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
                            {request.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleApproveRequest(request.id)}
                                  className="text-green-600 hover:text-green-900 flex items-center"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRejectRequest(request.id)}
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
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    Personal Information
                  </h4>
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
                  <h4 className="font-semibold text-gray-900 mb-3">Current Status</h4>
                  <div className="flex items-center justify-between">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedRequest.status)}`}>
                      {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Submitted: {formatDate(selectedRequest.submittedAt)}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                {selectedRequest.status === 'pending' && (
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleApproveRequest(selectedRequest.id)}
                      className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Approve Request
                    </button>
                    <button
                      onClick={() => handleRejectRequest(selectedRequest.id)}
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