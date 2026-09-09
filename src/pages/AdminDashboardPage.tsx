import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminService } from '../services/adminService';
import { getAuthToken, removeAuthToken } from '../services/apiClient';
import { DriverDetails } from '../types/admin';
import { IMAGES } from '../constants/images';
import { 
  Users, 
  Car, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  LogOut,
  Download,
  Search,
  MapPin,
  Phone,
  Mail,
  FileText,
  ExternalLink,
  Loader2,
  UserRound,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useAdminTheme } from '../contexts/AdminThemeContext';
import '../styles/admin-theme.css';

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

const DOCS_BUCKET_ORIGIN = 'https://kuber-prod-docs.s3.ap-south-1.amazonaws.com';
const DOCS_PROXY_PREFIX = '/driver-docs';

const normalizeStatusValue = (value: unknown): 'approved' | 'rejected' | 'pending' => {
  if (value === true) return 'approved';
  if (value === false) return 'pending';

  const normalized = String(value ?? '').trim().toLowerCase();
  if (['1', 'approved', 'approve', 'active', 'verified'].includes(normalized)) return 'approved';
  if (['2', 'rejected', 'reject', 'declined', 'denied'].includes(normalized)) return 'rejected';
  return 'pending';
};

const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useAdminTheme();
  const activeTab = location.pathname.includes('/admin/drivers') ? 'drivers' : 'overview';
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<DriverRequest | null>(null);
  const [driverDetails, setDriverDetails] = useState<DriverDetails | null>(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [downloadingDoc, setDownloadingDoc] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalDriversCount, setTotalDriversCount] = useState(0);
  const [totalCustomersCount, setTotalCustomersCount] = useState(0);
  const [limit] = useState(10);
  const [insightMetric, setInsightMetric] = useState<'rideType' | 'docs' | 'registrations'>('rideType');

  const [driverRequests, setDriverRequests] = useState<DriverRequest[]>([]);
  const [actionModal, setActionModal] = useState<{
    type: 'approve' | 'reject';
    request: DriverRequest;
  } | null>(null);
  const [approveRideType, setApproveRideType] = useState('');
  const [approveMessage, setApproveMessage] = useState(
    'Background verification completed successfully.'
  );
  const [rejectSelectedReasons, setRejectSelectedReasons] = useState<string[]>([]);
  const [rejectOtherSelected, setRejectOtherSelected] = useState(false);
  const [rejectOtherComment, setRejectOtherComment] = useState('');
  const [isSubmittingAction, setIsSubmittingAction] = useState(false);

  const rideTypeOptions = [
    { value: 'auto', label: 'Auto' },
    { value: 'moto', label: 'Moto' },
    { value: 'comfort', label: 'Comfort' },
    { value: 'xl', label: 'XL' },
    { value: 'city', label: 'City' },
  ];

  const defaultRejectReasons = [
    'Incomplete or unclear documents',
    'Background verification failed',
    'Vehicle documents not valid',
    'Invalid driving license',
    'Does not meet eligibility criteria',
  ];

  const stats = {
    totalDrivers: totalDriversCount || driverRequests.length,
    totalCustomers: totalCustomersCount,
    docsPending: driverRequests.filter(req => req.docsStatus === 'pending').length,
    awaitingApproval: driverRequests.filter(req => req.status === 'pending' && req.docsStatus === 'approved').length
  };

  const usersTotal = stats.totalDrivers + stats.totalCustomers;
  const driversShare = usersTotal > 0 ? (stats.totalDrivers / usersTotal) * 100 : 0;
  const customersShare = usersTotal > 0 ? (stats.totalCustomers / usersTotal) * 100 : 0;
  const donutCircumference = 2 * Math.PI * 54;
  const driversArc = (driversShare / 100) * donutCircumference;
  const customersArc = (customersShare / 100) * donutCircumference;

  const driverInsightData = React.useMemo(() => {
    if (insightMetric === 'rideType') {
      const counts = driverRequests.reduce<Record<string, number>>((acc, driver) => {
        const label = driver.vehicleType && driver.vehicleType !== 'unknown'
          ? driver.vehicleType.toUpperCase()
          : 'UNKNOWN';
        acc[label] = (acc[label] || 0) + 1;
        return acc;
      }, {});

      return Object.entries(counts)
        .sort(([, first], [, second]) => second - first)
        .map(([label, value]) => ({ label, value, color: 'bg-purple-500' }));
    }

    if (insightMetric === 'docs') {
      const counts = driverRequests.reduce(
        (acc, driver) => {
          acc[driver.docsStatus] += 1;
          return acc;
        },
        { approved: 0, pending: 0, rejected: 0 }
      );

      return [
        { label: 'Approved', value: counts.approved, color: 'bg-green-500' },
        { label: 'Pending', value: counts.pending, color: 'bg-amber-500' },
        { label: 'Rejected', value: counts.rejected, color: 'bg-red-500' },
      ];
    }

    const registrations = driverRequests.reduce<Record<string, { date: Date; value: number }>>(
      (acc, driver) => {
        const date = new Date(driver.submittedAt);
        if (Number.isNaN(date.getTime())) return acc;

        const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        if (!acc[key]) acc[key] = { date, value: 0 };
        acc[key].value += 1;
        return acc;
      },
      {}
    );

    return Object.values(registrations)
      .sort((first, second) => first.date.getTime() - second.date.getTime())
      .slice(-7)
      .map(({ date, value }) => ({
        label: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
        value,
        color: 'bg-blue-500',
      }));
  }, [driverRequests, insightMetric]);

  const maxInsightValue = Math.max(...driverInsightData.map((item) => item.value), 1);

  const fetchDrivers = React.useCallback(async () => {
    try {
      const response = await adminService.getDriverList(currentPage, limit);
      let driversList: any[] = [];
      
      const resData = response?.data as any;
      const summarySource = {
        ...(typeof response === 'object' && response ? response : {}),
        ...(typeof resData === 'object' && resData ? resData : {}),
      };

      const parseCount = (...keys: string[]) => {
        for (const key of keys) {
          const value = summarySource[key];
          if (value !== undefined && value !== null && value !== '') {
            const parsed = Number(value);
            if (!Number.isNaN(parsed)) return parsed;
          }
        }
        return null;
      };

      const totalDriversFromApi = parseCount(
        'total_drivers',
        'totalDrivers',
        'total driver',
        'total_driver',
        'totalCount',
        'total'
      );
      const totalCustomersFromApi = parseCount(
        'total_customers',
        'totalCustomers',
        'total customer',
        'total_customer'
      );

      if (totalDriversFromApi !== null) setTotalDriversCount(totalDriversFromApi);
      if (totalCustomersFromApi !== null) setTotalCustomersCount(totalCustomersFromApi);

      if (resData && Array.isArray(resData.drivers)) {
        driversList = resData.drivers;
        if (resData.totalPages) setTotalPages(resData.totalPages);
        else if (totalDriversFromApi !== null) {
          setTotalPages(Math.ceil(totalDriversFromApi / limit));
        }
      } else if (response && response.data && Array.isArray(response.data)) {
        driversList = response.data;
        if (response.totalPages) setTotalPages(response.totalPages);
        else if (totalDriversFromApi !== null) {
          setTotalPages(Math.ceil(totalDriversFromApi / limit));
        }
      } else if (Array.isArray(response)) {
        driversList = response;
      }

      setDriverRequests(driversList.map((d: any) => {
        const normalizedStatus = normalizeStatusValue(
          d.status ?? d.driver_status ?? d.approval_status ?? d.is_approved
        );
        const normalizedDocsStatus = normalizeStatusValue(
          d.is_docs_verified ?? d.docs_status ?? d.document_status
        );

        return {
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
          status: normalizedStatus,
          docsStatus: normalizedDocsStatus,
          isDocsVerified: normalizedDocsStatus === 'approved',
          submittedAt: d.submittedAt || d.created_at || new Date().toISOString(),
          documents: d.documents || { license: false, registration: false, insurance: false }
        };
      }));
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

  const handleViewRequest = async (request: DriverRequest) => {
    const driverId = request.backendId ?? Number(request.id);
    setSelectedRequest(request);
    setDriverDetails(null);
    setIsLoadingDetails(true);

    try {
      const response = await adminService.getDriverDetails(driverId);
      setDriverDetails(response.data);
    } catch (error: any) {
      toast.error('Failed to load driver details: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const closeDetailsModal = () => {
    setSelectedRequest(null);
    setDriverDetails(null);
  };

  const getDocumentUrl = (path?: string) => {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return `${DOCS_BUCKET_ORIGIN}/${path.replace(/^\/+/, '')}`;
  };

  const getFileExtension = (url: string) => {
    const cleanUrl = url.split('?')[0];
    const extension = cleanUrl.split('.').pop()?.toLowerCase();
    if (extension && ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'].includes(extension)) {
      return extension === 'jpg' ? 'jpeg' : extension;
    }
    return 'jpeg';
  };

  const buildDownloadName = (fileName: string, url: string) =>
    `${fileName.replace(/[^\w\-]+/g, '_').toLowerCase()}.${getFileExtension(url)}`;

  const getMimeType = (extension: string) =>
    extension === 'pdf' ? 'application/pdf' : `image/${extension === 'jpeg' ? 'jpeg' : extension}`;

  const saveBlob = (blob: Blob, downloadName: string) => {
    // The bucket returns an invalid content type (".jpeg"), which stops the
    // browser from saving the response as a file, so it is rebuilt with a real
    // MIME type before handing it to the download anchor.
    const extension = downloadName.split('.').pop()?.toLowerCase() || 'jpeg';
    const typedBlob = new Blob([blob], { type: getMimeType(extension) });
    const blobUrl = URL.createObjectURL(typedBlob);
    const link = document.createElement('a');

    link.href = blobUrl;
    link.download = downloadName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.dispatchEvent(new MouseEvent('click', { bubbles: false, cancelable: true }));

    // Revoking in the same tick cancels the transfer in some browsers.
    setTimeout(() => {
      link.remove();
      URL.revokeObjectURL(blobUrl);
    }, 15000);
  };

  // The documents bucket sends no CORS headers, so reading bytes from its own
  // origin is blocked. Requests go through a same-origin path that proxies to
  // the bucket, which keeps the download working from the browser.
  const toProxiedDocumentUrl = (url: string) => {
    if (!url.startsWith(DOCS_BUCKET_ORIGIN)) return url;
    return `${DOCS_PROXY_PREFIX}${url.slice(DOCS_BUCKET_ORIGIN.length)}`;
  };

  const downloadDocument = async (url: string, fileName: string) => {
    const downloadName = buildDownloadName(fileName, url);
    const candidates = [toProxiedDocumentUrl(url), url];

    for (const candidate of candidates) {
      try {
        const response = await fetch(candidate);
        if (!response.ok) continue;

        // A missing proxy route falls through to the SPA shell, which would
        // otherwise be saved as an HTML file with an image extension.
        if (response.headers.get('content-type')?.includes('text/html')) continue;

        const blob = await response.blob();
        if (blob.size === 0) continue;

        saveBlob(blob, downloadName);
        return;
      } catch {
        // Try the next candidate before giving up.
      }
    }

    throw new Error('Document could not be downloaded from the browser');
  };

  const getDriverFilePrefix = () =>
    (driverDetails?.full_name || selectedRequest?.name || 'driver')
      .replace(/[^\w\-]+/g, '_')
      .toLowerCase();

  const handleDownloadDocument = async (label: string, path?: string) => {
    const imageUrl = getDocumentUrl(path);
    if (!imageUrl) {
      toast.error('Document not available');
      return;
    }

    try {
      setDownloadingDoc(label);
      await downloadDocument(imageUrl, `${getDriverFilePrefix()}_${label}`);
      toast.success(`${label} downloaded`);
    } catch (error: any) {
      toast.error(`Failed to download ${label}`);
    } finally {
      setDownloadingDoc(null);
    }
  };

  const openApproveModal = (request: DriverRequest) => {
    const knownType = rideTypeOptions.some(opt => opt.value === request.vehicleType)
      ? request.vehicleType
      : '';
    setApproveRideType(knownType);
    setApproveMessage('Background verification completed successfully.');
    setActionModal({ type: 'approve', request });
  };

  const openRejectModal = (request: DriverRequest) => {
    setRejectSelectedReasons([]);
    setRejectOtherSelected(false);
    setRejectOtherComment('');
    setActionModal({ type: 'reject', request });
  };

  const closeActionModal = () => {
    if (isSubmittingAction) return;
    setActionModal(null);
    setApproveRideType('');
    setApproveMessage('Background verification completed successfully.');
    setRejectSelectedReasons([]);
    setRejectOtherSelected(false);
    setRejectOtherComment('');
  };

  const toggleRejectReason = (reason: string) => {
    setRejectSelectedReasons(prev =>
      prev.includes(reason)
        ? prev.filter(item => item !== reason)
        : [...prev, reason]
    );
  };

  const buildRejectReason = () => {
    const reasons = [...rejectSelectedReasons];
    if (rejectOtherSelected && rejectOtherComment.trim()) {
      reasons.push(rejectOtherComment.trim());
    }
    return reasons.join('; ');
  };

  const handleConfirmApprove = async () => {
    if (!actionModal || actionModal.type !== 'approve') return;

    if (!approveRideType) {
      toast.error('Please select a ride type');
      return;
    }
    if (!approveMessage.trim()) {
      toast.error('Please enter an approval message');
      return;
    }

    const { request } = actionModal;
    const apiDriverId = request.backendId !== undefined ? request.backendId : Number(request.id);

    try {
      setIsSubmittingAction(true);
      await adminService.approveOrRejectDriver({
        driver_id: apiDriverId,
        reason: approveMessage.trim(),
        ride_type: approveRideType,
        status: 1,
      });

      toast.success('Driver request approved!');
      setSelectedRequest(null);
      setDriverDetails(null);
      setActionModal(null);
      await fetchDrivers();
      setDriverRequests(prev =>
        prev.map(req =>
          req.id === request.id
            ? { ...req, status: 'approved' as const, vehicleType: approveRideType }
            : req
        )
      );
    } catch (error: any) {
      toast.error('Failed to approve driver: ' + (error.message || 'Unknown error'));
    } finally {
      setIsSubmittingAction(false);
    }
  };

  const handleConfirmReject = async () => {
    if (!actionModal || actionModal.type !== 'reject') return;

    if (rejectSelectedReasons.length === 0 && !rejectOtherSelected) {
      toast.error('Please select at least one rejection reason');
      return;
    }

    if (rejectOtherSelected && !rejectOtherComment.trim()) {
      toast.error('Please enter your custom rejection comment');
      return;
    }

    const reason = buildRejectReason();
    if (!reason) {
      toast.error('Please provide a rejection comment');
      return;
    }

    const { request } = actionModal;
    const apiDriverId = request.backendId !== undefined ? request.backendId : Number(request.id);

    try {
      setIsSubmittingAction(true);
      await adminService.approveOrRejectDriver({
        driver_id: apiDriverId,
        reason,
        ride_type: request.vehicleType && request.vehicleType !== 'unknown'
          ? request.vehicleType
          : '',
        status: 2,
      });

      toast.success('Driver request rejected!');
      setSelectedRequest(null);
      setDriverDetails(null);
      setActionModal(null);
      await fetchDrivers();
      setDriverRequests(prev =>
        prev.map(req =>
          req.id === request.id ? { ...req, status: 'rejected' as const } : req
        )
      );
    } catch (error: any) {
      toast.error('Failed to reject driver: ' + (error.message || 'Unknown error'));
    } finally {
      setIsSubmittingAction(false);
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
      case 'approved': return 'bg-green-950 text-green-300 border border-green-800';
      case 'rejected': return 'bg-red-950 text-red-300 border border-red-800';
      case 'pending_verification': return 'bg-orange-950 text-orange-300 border border-orange-800';
      default: return 'bg-yellow-950 text-yellow-300 border border-yellow-800';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const donutTrackColor = isDark ? '#27272A' : '#E5E7EB';
  const donutDriversColor = '#7C3AED';
  const donutCustomersColor = '#2563EB';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-black text-gray-100 [color-scheme:dark]' : 'admin-theme-light bg-gray-50 text-gray-900 [color-scheme:light]'}`}>
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-zinc-950 shadow-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src={IMAGES.kuberCabLogo} alt="Kuber.cab" className="h-8 w-auto mr-3" />
              <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-zinc-700 text-gray-300 hover:text-white hover:bg-zinc-800 transition-colors"
                aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="text-sm font-medium hidden sm:inline">
                  {isDark ? 'Light' : 'Dark'}
                </span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-purple-400 text-purple-300'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => navigate('/admin/drivers')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'drivers'
                  ? 'border-purple-400 text-purple-300'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
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
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <div className="bg-zinc-900 rounded-lg shadow border border-zinc-800 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Car className="h-8 w-8 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Drivers</p>
                    <p className="text-2xl font-semibold text-white">{stats.totalDrivers.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-lg shadow border border-zinc-800 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <UserRound className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Customers</p>
                    <p className="text-2xl font-semibold text-white">{stats.totalCustomers.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-lg shadow border border-zinc-800 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Docs Pending</p>
                    <p className="text-2xl font-semibold text-white">{stats.docsPending}</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-lg shadow border border-zinc-800 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Awaiting Approval</p>
                    <p className="text-2xl font-semibold text-white">{stats.awaitingApproval}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Drivers vs Customers Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-zinc-900 rounded-2xl shadow border border-zinc-800 p-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Users Distribution</h3>
                    <p className="text-sm text-gray-500 mt-1">Drivers vs customers from listing API</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-950/50 text-purple-300 text-xs font-semibold">
                    Total {usersTotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-8">
                  <div className="relative h-44 w-44 shrink-0">
                    <svg viewBox="0 0 140 140" className="h-full w-full -rotate-90">
                      <circle
                        cx="70"
                        cy="70"
                        r="54"
                        fill="transparent"
                        stroke={donutTrackColor}
                        strokeWidth="16"
                      />
                      <circle
                        cx="70"
                        cy="70"
                        r="54"
                        fill="transparent"
                        stroke={donutDriversColor}
                        strokeWidth="16"
                        strokeDasharray={`${driversArc} ${donutCircumference}`}
                        strokeLinecap="round"
                      />
                      <circle
                        cx="70"
                        cy="70"
                        r="54"
                        fill="transparent"
                        stroke={donutCustomersColor}
                        strokeWidth="16"
                        strokeDasharray={`${customersArc} ${donutCircumference}`}
                        strokeDashoffset={-driversArc}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Users</p>
                      <p className="text-2xl font-bold text-white">{usersTotal}</p>
                    </div>
                  </div>

                  <div className="w-full space-y-4">
                    <div className="rounded-xl border border-purple-800/50 bg-purple-950/40 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-purple-600" />
                          <span className="text-sm font-medium text-gray-300">Drivers</span>
                        </div>
                        <span className="text-sm font-bold text-white">{stats.totalDrivers}</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-purple-600 transition-all duration-500"
                          style={{ width: `${driversShare}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{driversShare.toFixed(1)}% of total users</p>
                    </div>

                    <div className="rounded-xl border border-blue-800/50 bg-blue-950/40 p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="h-3 w-3 rounded-full bg-blue-600" />
                          <span className="text-sm font-medium text-gray-300">Customers</span>
                        </div>
                        <span className="text-sm font-bold text-white">{stats.totalCustomers}</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-zinc-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-600 transition-all duration-500"
                          style={{ width: `${customersShare}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{customersShare.toFixed(1)}% of total users</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-2xl shadow border border-zinc-800 p-6">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Driver Insights</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Distribution from the drivers loaded on this page
                    </p>
                  </div>
                  <div className="inline-flex rounded-xl bg-zinc-800 p-1">
                    {[
                      { key: 'rideType', label: 'Ride Type' },
                      { key: 'docs', label: 'Docs' },
                      { key: 'registrations', label: 'Created' },
                    ].map(({ key, label }) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => setInsightMetric(key as typeof insightMetric)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                          insightMetric === key
                            ? 'bg-purple-600 text-white shadow'
                            : 'text-gray-400 hover:text-gray-300'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {driverInsightData.length > 0 ? (
                  <div className="h-64 flex items-end gap-3 sm:gap-4 pt-8">
                    {driverInsightData.map((item) => {
                      const height = item.value > 0
                        ? Math.max((item.value / maxInsightValue) * 100, 8)
                        : 0;

                      return (
                        <div key={item.label} className="flex-1 min-w-0 h-full flex flex-col justify-end items-center">
                          <span className="text-sm font-bold text-white mb-2">{item.value}</span>
                          <div className="w-full h-44 rounded-xl bg-zinc-800 flex items-end overflow-hidden">
                            <div
                              className={`w-full ${item.color} rounded-xl transition-all duration-500`}
                              style={{ height: `${height}%` }}
                              title={`${item.label}: ${item.value}`}
                            />
                          </div>
                          <span
                            className="mt-3 w-full text-center text-xs font-medium text-gray-400 truncate"
                            title={item.label}
                          >
                            {item.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="h-64 rounded-xl bg-zinc-800/60 flex items-center justify-center">
                    <p className="text-sm text-gray-500">No driver data available</p>
                  </div>
                )}

                <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between text-xs text-gray-500">
                  <span>
                    {insightMetric === 'rideType' && 'Grouped by ride_type'}
                    {insightMetric === 'docs' && 'Grouped by is_docs_verified'}
                    {insightMetric === 'registrations' && 'Grouped by created_at (latest 7 dates)'}
                  </span>
                  <span>{driverRequests.length} loaded drivers</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-zinc-900 rounded-lg shadow border border-zinc-800">
              <div className="px-6 py-4 border-b border-zinc-800">
                <h3 className="text-lg font-medium text-white">Recent Driver Requests</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {driverRequests.slice(0, 5).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 bg-zinc-900/80 rounded-lg">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {request.profileImage ? (
                            <img src={request.profileImage} alt={request.name} className="h-10 w-10 rounded-full object-cover" />
                          ) : (
                            <div className="h-10 w-10 bg-purple-950 rounded-full flex items-center justify-center">
                              <Users className="h-5 w-5 text-purple-600" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-white">{request.name}</p>
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
            <div className="bg-zinc-900 rounded-lg shadow border border-zinc-800 p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search drivers..."
                    className="w-full pl-10 pr-4 py-2 bg-zinc-950 border border-zinc-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
            <div className="bg-zinc-900 rounded-lg shadow border border-zinc-800 overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-800">
                <h3 className="text-lg font-medium text-white">
                  Driver Requests ({filteredRequests.length})
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-zinc-800">
                  <thead className="bg-zinc-950">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Driver
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Docs
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-zinc-900 divide-y divide-zinc-800">
                    {filteredRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-zinc-800/60 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center max-w-[180px]">
                            <div className="flex-shrink-0 h-9 w-9">
                              {request.profileImage ? (
                                <img src={request.profileImage} alt={request.name} className="h-9 w-9 rounded-full object-cover" />
                              ) : (
                                <div className="h-9 w-9 bg-purple-950 rounded-full flex items-center justify-center">
                                  <Users className="h-4 w-4 text-purple-600" />
                                </div>
                              )}
                            </div>
                            <div className="ml-3 min-w-0">
                              <div className="text-sm font-medium text-white truncate" title={request.name}>
                                {request.name}
                              </div>
                              {request.city && (
                                <div className="text-xs text-gray-500 truncate" title={request.city}>
                                  {request.city}
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white truncate max-w-[180px]" title={request.email}>{request.email}</div>
                          <div className="text-xs text-gray-500">{request.phone}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-white uppercase">{request.vehicleType}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.docsStatus)}`}>
                            {formatStatus(request.docsStatus)}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(request.submittedAt)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleViewRequest(request)}
                              className="p-2 rounded-lg text-purple-400 hover:text-purple-300 hover:bg-zinc-800 transition-colors"
                              title="View"
                              aria-label="View"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => openApproveModal(request)}
                              disabled={request.status === 'approved'}
                              className={`p-2 rounded-lg transition-colors ${
                                request.status === 'approved'
                                  ? 'text-zinc-600 cursor-not-allowed'
                                  : 'text-green-500 hover:text-green-400 hover:bg-zinc-800'
                              }`}
                              title="Approve"
                              aria-label="Approve"
                            >
                              <CheckCircle className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => openRejectModal(request)}
                              disabled={request.status === 'rejected'}
                              className={`p-2 rounded-lg transition-colors ${
                                request.status === 'rejected'
                                  ? 'text-zinc-600 cursor-not-allowed'
                                  : 'text-red-500 hover:text-red-400 hover:bg-zinc-800'
                              }`}
                              title="Reject"
                              aria-label="Reject"
                            >
                              <XCircle className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-zinc-800 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing page {currentPage} of {totalPages} {totalDriversCount ? `(Total ${totalDriversCount})` : ''}
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                        currentPage === 1 
                          ? 'border-zinc-800 text-gray-500 bg-zinc-900 cursor-not-allowed' 
                          : 'border-zinc-700 text-gray-200 bg-zinc-900 hover:bg-zinc-800'
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 border rounded-lg text-sm font-medium ${
                        currentPage === totalPages 
                          ? 'border-zinc-800 text-gray-500 bg-zinc-900 cursor-not-allowed' 
                          : 'border-zinc-700 text-gray-200 bg-zinc-900 hover:bg-zinc-800'
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
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-950 rounded-3xl border border-zinc-800 max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 sm:px-8 py-5 bg-zinc-950/95 backdrop-blur border-b border-zinc-800 rounded-t-3xl">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-purple-600">Driver profile</p>
                <h3 className="text-2xl font-bold text-white">Driver Request Details</h3>
              </div>
              <button
                onClick={closeDetailsModal}
                className="h-10 w-10 rounded-full bg-zinc-800 text-gray-500 hover:bg-zinc-700 hover:text-white transition-colors"
                aria-label="Close driver details"
              >
                ✕
              </button>
            </div>

            {isLoadingDetails ? (
              <div className="min-h-[420px] flex flex-col items-center justify-center text-gray-500">
                <Loader2 className="h-10 w-10 animate-spin text-purple-600 mb-4" />
                <p className="font-medium">Loading driver details...</p>
              </div>
            ) : (
              <div className="p-6 sm:p-8 space-y-6">
                <section className="driver-details-banner overflow-hidden rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 text-white shadow-lg">
                  <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                    <div className="flex items-center gap-4">
                      {(() => {
                        const profileUrl = getDocumentUrl(
                          driverDetails?.profile_image || selectedRequest.profileImage
                        );
                        return profileUrl ? (
                          <a
                            href={profileUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="shrink-0 block h-20 w-20 rounded-2xl overflow-hidden ring-2 ring-white/40 shadow-lg hover:ring-white transition-all"
                          >
                            <img
                              src={profileUrl}
                              alt={driverDetails?.full_name || selectedRequest.name}
                              className="h-full w-full object-cover"
                            />
                          </a>
                        ) : (
                          <div className="h-20 w-20 rounded-2xl bg-white/15 ring-1 ring-white/30 flex items-center justify-center shrink-0">
                            <Users className="h-8 w-8 text-white" />
                          </div>
                        );
                      })()}
                      <div>
                        <h4 className="text-2xl font-bold text-white">
                          {driverDetails?.full_name || selectedRequest.name}
                        </h4>
                        <p className="text-purple-100">
                          Driver ID #{driverDetails?.id || selectedRequest.backendId || selectedRequest.id}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 rounded-full bg-white/15 ring-1 ring-white/30 text-sm font-semibold uppercase text-white">
                        {driverDetails?.ride_type || selectedRequest.vehicleType || 'Not assigned'}
                      </span>
                      {driverDetails?.vehicle_type && (
                        <span className="px-4 py-2 rounded-full bg-zinc-100 text-purple-700 text-sm font-semibold uppercase">
                          {driverDetails.vehicle_type}
                        </span>
                      )}
                    </div>
                  </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <section className="lg:col-span-2 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-sm p-6">
                    <h4 className="font-bold text-white mb-5 flex items-center">
                      <Users className="h-5 w-5 mr-2 text-purple-600" />
                      Personal Information
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { label: 'Full Name', value: driverDetails?.full_name || selectedRequest.name, icon: Users },
                        { label: 'Email Address', value: driverDetails?.email || selectedRequest.email, icon: Mail },
                        { label: 'Mobile Number', value: driverDetails?.mobile || selectedRequest.phone, icon: Phone },
                        { label: 'City', value: selectedRequest.city || 'Not provided', icon: MapPin },
                      ].map(({ label, value, icon: Icon }) => (
                        <div key={label} className="rounded-xl bg-zinc-900/80 border border-zinc-800 p-4">
                          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                            <Icon className="h-4 w-4 text-purple-600" />
                            {label}
                          </div>
                          <p className="font-semibold text-white break-words">{value}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-sm p-6">
                    <h4 className="font-bold text-white mb-5 flex items-center">
                      <Car className="h-5 w-5 mr-2 text-purple-600" />
                      Vehicle
                    </h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Ride Type</p>
                        <p className="mt-1 text-lg font-bold text-white uppercase">
                          {driverDetails?.ride_type || selectedRequest.vehicleType || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Vehicle Type</p>
                        <p className="mt-1 text-lg font-bold text-white uppercase">
                          {driverDetails?.vehicle_type || 'N/A'}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-zinc-800 flex flex-wrap gap-2">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedRequest.docsStatus)}`}>
                          Docs: {formatStatus(selectedRequest.docsStatus)}
                        </span>
                      </div>
                    </div>
                  </section>
                </div>

                <section className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-sm p-6">
                  <div className="mb-5">
                    <h4 className="font-bold text-white flex items-center">
                      <FileText className="h-5 w-5 mr-2 text-purple-600" />
                      Documents & Images
                    </h4>
                    <p className="text-sm text-gray-500 mt-1">Preview, open, or download each document.</p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {[
                      { label: 'License — Front', path: driverDetails?.license_front_image },
                      { label: 'License — Back', path: driverDetails?.license_back_image },
                      { label: 'Registration Certificate', path: driverDetails?.rc_image },
                      { label: 'Vehicle Image', path: driverDetails?.vehicle_image },
                      { label: 'Vehicle Insurance', path: driverDetails?.vehicle_insurance_image },
                    ].map(({ label, path }) => {
                      const imageUrl = getDocumentUrl(path);
                      const isDownloading = downloadingDoc === label;
                      return (
                        <div key={label} className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80">
                          {imageUrl ? (
                            <a href={imageUrl} target="_blank" rel="noreferrer" className="block">
                              <div className="relative h-48 overflow-hidden bg-zinc-800">
                                <img
                                  src={imageUrl}
                                  alt={label}
                                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                  <span className="opacity-0 group-hover:opacity-100 transition-opacity h-11 w-11 rounded-full bg-zinc-100 text-purple-700 flex items-center justify-center shadow-lg">
                                    <ExternalLink className="h-5 w-5" />
                                  </span>
                                </div>
                              </div>
                            </a>
                          ) : (
                            <div className="h-48 bg-zinc-800 flex flex-col items-center justify-center text-gray-400">
                              <FileText className="h-9 w-9 mb-2" />
                              <span className="text-sm">Not uploaded</span>
                            </div>
                          )}
                          <div className="p-4 flex items-center justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-semibold text-sm text-white truncate">{label}</p>
                              <span className={`inline-block mt-1 h-2 w-2 rounded-full ${imageUrl ? 'bg-green-500' : 'bg-zinc-600'}`} />
                            </div>
                            {imageUrl && (
                              <button
                                type="button"
                                onClick={() => handleDownloadDocument(label, path)}
                                disabled={isDownloading}
                                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-950 border border-zinc-700 text-purple-300 text-xs font-semibold hover:bg-purple-950/50 transition-colors disabled:opacity-50"
                              >
                                {isDownloading ? (
                                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                ) : (
                                  <Download className="h-3.5 w-3.5" />
                                )}
                                {isDownloading ? 'Saving...' : 'Download'}
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <button
                    onClick={() => openApproveModal(selectedRequest)}
                    disabled={selectedRequest.status === 'approved'}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center ${
                      selectedRequest.status === 'approved'
                        ? 'bg-zinc-800 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Approve Request
                  </button>
                  <button
                    onClick={() => openRejectModal(selectedRequest)}
                    disabled={selectedRequest.status === 'rejected'}
                    className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-colors flex items-center justify-center ${
                      selectedRequest.status === 'rejected'
                        ? 'bg-zinc-800 text-gray-500 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    <XCircle className="h-5 w-5 mr-2" />
                    Reject Request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Approve / Reject Action Modal */}
      {actionModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-zinc-900 rounded-2xl max-w-md border border-zinc-800 w-full shadow-xl overflow-hidden">
            {actionModal.type === 'approve' ? (
              <>
                <div className="approve-confirm-banner relative px-6 pt-6 pb-5 bg-gradient-to-br from-green-700 via-emerald-700 to-teal-800 text-white">
                  <button
                    onClick={closeActionModal}
                    disabled={isSubmittingAction}
                    className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors disabled:opacity-50"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 rounded-2xl bg-white/15 ring-1 ring-white/30 flex items-center justify-center overflow-hidden shrink-0">
                      {actionModal.request.profileImage ? (
                        <img
                          src={actionModal.request.profileImage}
                          alt={actionModal.request.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <CheckCircle className="h-7 w-7" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wider text-green-100/90">
                        Ready to approve
                      </p>
                      <h3 className="text-xl font-bold truncate">{actionModal.request.name}</h3>
                      <p className="text-sm text-green-50/90 mt-0.5">
                        Let’s get them on the road with Kuber.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ride Type <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      {rideTypeOptions.map((option) => {
                        const isSelected = approveRideType === option.value;
                        return (
                          <button
                            key={option.value}
                            type="button"
                            onClick={() => setApproveRideType(option.value)}
                            disabled={isSubmittingAction}
                            className={`flex-1 min-w-0 px-1.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border transition-all disabled:opacity-50 ${
                              isSelected
                                ? 'bg-green-600 border-green-500 text-white shadow-md shadow-green-900/30'
                                : 'bg-zinc-950 border-zinc-700 text-gray-400 hover:border-green-700 hover:text-green-300'
                            }`}
                          >
                            {option.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Approval Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2.5 bg-zinc-950 border border-zinc-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      value={approveMessage}
                      onChange={(e) => setApproveMessage(e.target.value)}
                      disabled={isSubmittingAction}
                      placeholder="Enter approval message"
                    />
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      type="button"
                      onClick={closeActionModal}
                      disabled={isSubmittingAction}
                      className="flex-1 px-4 py-2.5 border border-zinc-700 text-gray-300 rounded-lg font-medium hover:bg-zinc-800 transition-colors disabled:opacity-50"
                    >
                      Not now
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmApprove}
                      disabled={isSubmittingAction}
                      className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg shadow-green-900/40"
                    >
                      {isSubmittingAction ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Approving...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4" />
                          Let’s Go
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-white">Reject Driver</h3>
                  <button
                    onClick={closeActionModal}
                    disabled={isSubmittingAction}
                    className="text-gray-400 hover:text-gray-300 p-2 disabled:opacity-50"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-sm text-gray-400 mb-5">
                  Reject request for {actionModal.request.name}. Select one or more reasons below.
                </p>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-300">
                    Rejection Reasons <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {defaultRejectReasons.map((reason) => (
                      <label
                        key={reason}
                        className="flex items-start gap-3 p-3 rounded-lg border border-zinc-800 hover:bg-zinc-800 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5 h-4 w-4 rounded border-zinc-700 text-red-600 focus:ring-red-500"
                          checked={rejectSelectedReasons.includes(reason)}
                          onChange={() => toggleRejectReason(reason)}
                          disabled={isSubmittingAction}
                        />
                        <span className="text-sm text-gray-300">{reason}</span>
                      </label>
                    ))}

                    <label className="flex items-start gap-3 p-3 rounded-lg border border-zinc-800 hover:bg-zinc-800 cursor-pointer">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 rounded border-zinc-700 text-red-600 focus:ring-red-500"
                        checked={rejectOtherSelected}
                        onChange={(e) => {
                          setRejectOtherSelected(e.target.checked);
                          if (!e.target.checked) setRejectOtherComment('');
                        }}
                        disabled={isSubmittingAction}
                      />
                      <span className="text-sm text-gray-300">Other</span>
                    </label>
                  </div>

                  {rejectOtherSelected && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Custom Comment <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-2 bg-zinc-950 border border-zinc-700 text-white placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                        value={rejectOtherComment}
                        onChange={(e) => setRejectOtherComment(e.target.value)}
                        disabled={isSubmittingAction}
                        placeholder="Enter your rejection comment"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  <button
                    type="button"
                    onClick={closeActionModal}
                    disabled={isSubmittingAction}
                    className="flex-1 px-4 py-2.5 border border-zinc-700 text-gray-300 rounded-lg font-medium hover:bg-zinc-900/80 transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmReject}
                    disabled={isSubmittingAction}
                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center disabled:opacity-50"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    {isSubmittingAction ? 'Rejecting...' : 'Confirm Reject'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;