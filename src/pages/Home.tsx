import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Report } from '../firebase/firestore';
import { Shield, AlertTriangle, Map, Users, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const { user } = useAuth();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for reports
    const q = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const reportsData: Report[] = [];
      snapshot.forEach((doc) => {
        reportsData.push({ id: doc.id, ...doc.data() } as Report);
      });
      setReports(reportsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching reports:', error);
      setLoading(false);
    });

    return () => unsubscribe();
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
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-tight">
              Safe Route
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-10 text-primary-50 leading-relaxed max-w-3xl mx-auto">
              Building safer communities through crowd-sourced safety awareness and real-time incident reporting
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/map"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/30 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 border border-white/20 min-w-[200px]"
              >
                <Map className="w-5 h-5 mr-2" />
                <span>View Safety Map</span>
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                to="/add-report"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-white/90 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 min-w-[200px]"
              >
                <Shield className="w-5 h-5 mr-2" />
                <span>Add Safety Report</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Community Impact</h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Real-time safety data contributed by verified community members helping to create safer neighborhoods
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card rounded-xl shadow-lg hover:shadow-xl p-8 text-center transition-all duration-300 ease-in-out transform hover:scale-105">
              <div className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-5 transition-all duration-300 hover:scale-110`}>
                <stat.icon className={`w-7 h-7 ${stat.color}`} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-300 font-medium text-sm tracking-wide uppercase">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">How It Works</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-5">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Real-Time Map Updates</h3>
                  <p className="text-gray-300 leading-relaxed">
                    View safe and unsafe areas on an interactive map with detailed descriptions, user-verified information, and real-time timestamps for accurate community awareness.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-5">
                <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-3">Instant Police Station Alerts</h3>
                  <p className="text-gray-300 leading-relaxed">
                    Critical unsafe area reports are automatically forwarded to the nearest police station, enabling rapid response and proactive community safety measures.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-xl shadow-lg p-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 tracking-tight">Recent Community Reports</h3>
            {loading ? (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : reports.length > 0 ? (
              <div className="space-y-4">
                {reports.slice(0, 5).map((report) => (
                  <div key={report.id} className="flex items-start space-x-4 p-4 bg-dark-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors">
                    {report.type === 'safe' ? (
                      <Shield className="w-6 h-6 text-safe-600 mt-0.5 flex-shrink-0" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-unsafe-600 mt-0.5 flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white mb-1">
                        {report.type === 'safe' ? 'Safe Area Verified' : 'Unsafe Area Reported'}
                      </p>
                      <p className="text-sm text-gray-300 line-clamp-2 mb-2 leading-relaxed">{report.description}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        <span className="font-medium">{report.userDisplayName}</span> • {new Date(report.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-300 text-lg">No reports available yet.</p>
                <p className="text-gray-400 text-sm mt-2">Be the first to contribute to community safety!</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="text-center mt-20 glass-card rounded-xl shadow-lg p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 tracking-tight">Join Our Community</h2>
            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Help make your city safer by sharing real-time safety information, contributing to community awareness, and planning safer routes for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-primary-600 text-white font-semibold rounded-xl hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl min-w-[180px]"
              >
                <Users className="w-5 h-5 mr-2" />
                <span>Sign Up Now</span>
              </Link>
              <Link
                to="/map"
                className="inline-flex items-center justify-center px-8 py-4 bg-dark-700 text-gray-200 font-semibold rounded-xl hover:bg-dark-600 transition-all duration-300 transform hover:scale-105 border border-gray-600 hover:border-gray-500 min-w-[180px]"
              >
                <Map className="w-5 h-5 mr-2" />
                <span>Explore Map</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
