import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserReports, deleteReport } from '../firebase/firestore';
import { Report } from '../firebase/firestore';
import { Shield, AlertTriangle, Trash2, Edit, Calendar, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';

const MyReports: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchReports();
    }
  }, [user]);

  const fetchReports = async () => {
    if (!user) return;

    try {
      const userReports = await getUserReports(user.uid);
      setReports(userReports);
    } catch (error) {
      console.error('Error fetching user reports:', error);
      toast.error('Failed to load your reports');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReport = async (reportId: string) => {
    if (!confirm('Are you sure you want to delete this report?')) {
      return;
    }

    try {
      await deleteReport(reportId);
      setReports(reports.filter(report => report.id !== reportId));
      toast.success('Report deleted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete report');
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reports</h1>
          <p className="text-gray-600">Manage your safety reports and contributions to the community</p>
        </div>

        {reports.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Reports Yet</h2>
            <p className="text-gray-600 mb-6">
              You haven't added any safety reports yet. Start contributing to help make your community safer.
            </p>
            <a
              href="/add-report"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Shield className="w-5 h-5 mr-2" />
              Add Your First Report
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {reports.map((report) => (
              <div key={report.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      {report.type === 'safe' ? (
                        <div className="flex items-center space-x-2">
                          <Shield className="w-5 h-5 text-safe-600" />
                          <span className="font-semibold text-safe-700">Safe Area</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-5 h-5 text-unsafe-600" />
                          <span className="font-semibold text-unsafe-700">Unsafe Area</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-700 mb-4">{report.description}</p>

                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-4 h-4" />
                        <span>{report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(report.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleDeleteReport(report.id!)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {reports.length > 0 && (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {reports.filter(r => r.type === 'safe').length}
              </h3>
              <p className="text-gray-600">Safe Areas Reported</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                {reports.filter(r => r.type === 'unsafe').length}
              </h3>
              <p className="text-gray-600">Unsafe Areas Reported</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{reports.length}</h3>
              <p className="text-gray-600">Total Reports</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;
