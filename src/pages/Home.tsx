import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getReports } from '../firebase/firestore';
import { Report } from '../firebase/firestore';
import { Shield, AlertTriangle, Map, Users, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsData = await getReports();
        setReports(reportsData);
      } catch (error) {
        console.error('Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const safeReports = reports.filter(report => report.type === 'safe');
  const unsafeReports = reports.filter(report => report.type === 'unsafe');
  const totalReports = reports.length;

  const stats = [
    {
      title: 'Total Reports',
      value: reports.length,
      icon: Map,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Safe Areas',
      value: safeReports.length,
      icon: Shield,
      color: 'text-safe-600',
      bgColor: 'bg-safe-100'
    },
    {
      title: 'Unsafe Areas',
      value: unsafeReports.length,
      icon: AlertTriangle,
      color: 'text-unsafe-600',
      bgColor: 'bg-unsafe-100'
    },
    {
      title: 'Community Members',
      value: totalReports > 0 ? Math.max(1, Math.floor(totalReports / 2)) : 0,
      icon: Users,
      color: 'text-primary-600',
      bgColor: 'bg-primary-100'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Safe Route
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Building safer communities through crowd-sourced safety awareness
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/map"
                className="inline-flex items-center px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 border border-white/20"
              >
                <Map className="w-5 h-5 mr-2" />
                View Safety Map
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              {user && (
                <Link
                  to="/add-report"
                  className="inline-flex items-center px-6 py-3 bg-white text-primary-600 font-semibold rounded-xl hover:bg-white/90 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Add Safety Report
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Impact</h2>
          <p className="text-lg text-gray-600">
            Real-time safety data from verified community members
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl p-6 text-center transition-all duration-300 ease-in-out transform hover:scale-105 border border-white/20">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:scale-110`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-600 font-medium">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Real-time Map Updates</h3>
                  <p className="text-gray-600">
                    View safe and unsafe areas on an interactive map with detailed descriptions and timestamps.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Safe Route Planning</h3>
                  <p className="text-gray-600">
                    Get route suggestions that avoid unsafe areas and highlight safer alternatives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Reports</h3>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : reports.length > 0 ? (
              <div className="space-y-4">
                {reports.slice(0, 5).map((report) => (
                  <div key={report.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                    {report.type === 'safe' ? (
                      <Shield className="w-5 h-5 text-safe-600 mt-0.5" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-unsafe-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {report.type === 'safe' ? 'Safe Area' : 'Unsafe Area'}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">{report.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {report.userDisplayName} • {new Date(report.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Map className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No reports yet. Be the first to contribute!</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="text-center mt-16 bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Community</h2>
            <p className="text-lg text-gray-600 mb-8">
              Help make your city safer by sharing safety information and planning safer routes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Users className="w-5 h-5 mr-2" />
                Sign Up Now
              </Link>
              <Link
                to="/map"
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Map className="w-5 h-5 mr-2" />
                Explore Map
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
