import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getUserReports, deleteReport } from '../firebase/firestore';
import { Report } from '../firebase/firestore';
import { Shield, AlertTriangle, Trash2, Calendar, MapPin } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg font-medium">Loading your reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">My Reports</h1>
          <p className="text-gray-300 text-base md:text-lg">Manage your safety reports and contributions to the community</p>
        </div>

        {reports.length === 0 ? (
          <div className="glass-card rounded-xl shadow-lg p-12 text-center">
            <Shield className="w-20 h-20 text-gray-400 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-3">No Reports Yet</h2>
            <p className="text-gray-300 mb-8 text-base leading-relaxed max-w-md mx-auto">
              You haven't added any safety reports yet. Start contributing to help make your community safer for everyone.
            </p>
            <a
              href="/add-report"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Shield className="w-5 h-5 mr-2" />
              <span>Add Your First Report</span>
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {reports.map((report) => (
              <div key={report.id} className="glass-card rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                      {report.type === 'safe' ? (
                        <div className="flex items-center space-x-2 bg-safe-100 px-4 py-2 rounded-lg">
                          <Shield className="w-5 h-5 text-safe-600" />
                          <span className="font-bold text-safe-600 tracking-wide">SAFE AREA</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2 bg-unsafe-100 px-4 py-2 rounded-lg">
                          <AlertTriangle className="w-5 h-5 text-unsafe-600" />
                          <span className="font-bold text-unsafe-600 tracking-wide">UNSAFE AREA</span>
                        </div>
                      )}
                    </div>

                    <p className="text-gray-200 mb-5 leading-relaxed text-base">{report.description}</p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="font-mono">{report.latitude.toFixed(4)}, {report.longitude.toFixed(4)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{formatDate(report.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleDeleteReport(report.id!)}
                      className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete report"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {reports.length > 0 && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-safe-100 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Shield className="w-7 h-7 text-safe-600" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {reports.filter(r => r.type === 'safe').length}
              </h3>
              <p className="text-gray-300 font-medium text-sm tracking-wide uppercase">Safe Areas Reported</p>
            </div>

            <div className="glass-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-unsafe-100 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <AlertTriangle className="w-7 h-7 text-unsafe-600" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {reports.filter(r => r.type === 'unsafe').length}
              </h3>
              <p className="text-gray-300 font-medium text-sm tracking-wide uppercase">Unsafe Areas Reported</p>
            </div>

            <div className="glass-card rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
              <div className="w-14 h-14 bg-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{reports.length}</h3>
              <p className="text-gray-300 font-medium text-sm tracking-wide uppercase">Total Reports</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReports;
