import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import GoogleMapComponent from '../components/map/GoogleMapComponent';
import AddReportModal from '../components/map/AddReportModal';
import { Shield, AlertTriangle, Plus, ArrowLeft } from 'lucide-react';

const AddReport: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    setShowAddReportModal(true);
  };

  const handleAddReportSuccess = () => {
    // Navigate to map page after successful report
    navigate('/map');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="glass shadow-sm border-b border-gray-700 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/map')}
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="font-medium">Back to Map</span>
              </button>
              <div className="hidden sm:block w-px h-8 bg-gray-700"></div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Add Safety Report</h1>
                <p className="text-gray-300 text-sm md:text-base mt-1">Click on the map to add a safety report for your community</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 px-4 py-2.5 bg-primary-600 rounded-lg shadow-md">
              <Shield className="w-5 h-5 text-white" />
              <span className="text-sm font-semibold text-white hidden sm:inline">Community Member</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-primary-900/30 to-primary-800/30 border-b border-primary-700/50 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start space-x-4">
              <Plus className="w-6 h-6 text-primary-400 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-white mb-2 text-base">How to Add a Report</h3>
                <div className="text-sm text-gray-300 leading-relaxed space-y-1">
                  <p><span className="font-semibold text-primary-300">1.</span> Click anywhere on the map to select a specific location</p>
                  <p><span className="font-semibold text-primary-300">2.</span> Choose whether the area is safe or unsafe based on your experience</p>
                  <p><span className="font-semibold text-primary-300">3.</span> Provide a detailed description explaining why (be specific and factual)</p>
                  <p><span className="font-semibold text-primary-300">4.</span> Submit your report to help make your community safer</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative">
          <GoogleMapComponent
            onMapClick={handleMapClick}
            showAddReportButton={true}
          />

          {/* Legend */}
          <div className="glass-card rounded-lg shadow-lg p-5 absolute bottom-4 left-4 z-10">
            <h3 className="font-bold text-white mb-4 text-base tracking-tight">Map Legend</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-safe-600 flex-shrink-0" />
                <span className="text-sm text-gray-200 font-medium">Safe Area</span>
              </div>
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-unsafe-600 flex-shrink-0" />
                <span className="text-sm text-gray-200 font-medium">Unsafe Area</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="glass-card rounded-lg shadow-lg p-5 max-w-sm absolute top-4 right-4 z-10">
            <h3 className="font-bold text-white mb-4 text-base tracking-tight">Tips for Quality Reports</h3>
            <ul className="text-sm text-gray-300 space-y-2.5 leading-relaxed">
              <li className="flex items-start">
                <span className="text-primary-400 mr-2 mt-0.5 flex-shrink-0">•</span>
                <span>Be specific about what makes an area safe or unsafe</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-400 mr-2 mt-0.5 flex-shrink-0">•</span>
                <span>Include details about lighting, foot traffic, and visibility</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-400 mr-2 mt-0.5 flex-shrink-0">•</span>
                <span>Mention time of day if it affects the safety assessment</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-400 mr-2 mt-0.5 flex-shrink-0">•</span>
                <span>Focus on factual observations, not assumptions</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add Report Modal */}
      {showAddReportModal && (
        <AddReportModal
          isOpen={showAddReportModal}
          onClose={() => {
            setShowAddReportModal(false);
            setSelectedLocation(null);
          }}
          latitude={selectedLocation?.lat || 40.7128}
          longitude={selectedLocation?.lng || -74.0060}
          onSuccess={handleAddReportSuccess}
        />
      )}
    </div>
  );
};

export default AddReport;
