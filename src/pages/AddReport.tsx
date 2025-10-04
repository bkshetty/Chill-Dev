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
    <div className="w-full h-full bg-gray-50">
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/map')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Map</span>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add Safety Report</h1>
                <p className="text-gray-600">Click on the map to add a safety report</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 px-3 py-2 bg-primary-100 rounded-lg">
              <Shield className="w-4 h-4 text-primary-600" />
              <span className="text-sm font-medium text-primary-700">Community Member</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-primary-50 border-b border-primary-200 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-start space-x-3">
              <Plus className="w-5 h-5 text-primary-600 mt-0.5" />
              <div>
                <h3 className="font-semibold text-primary-900 mb-1">How to Add a Report</h3>
                <p className="text-sm text-primary-700">
                  1. Click anywhere on the map to select a location<br/>
                  2. Choose whether the area is safe or unsafe<br/>
                  3. Provide a detailed description of why<br/>
                  4. Submit your report to help the community
                </p>
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
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-safe-600" />
                <span className="text-sm text-gray-700">Safe Area</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-unsafe-600" />
                <span className="text-sm text-gray-700">Unsafe Area</span>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
            <h3 className="font-semibold text-gray-900 mb-2">Tips for Good Reports</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Be specific about what makes an area safe/unsafe</li>
              <li>• Include details about lighting, foot traffic, etc.</li>
              <li>• Mention time of day if relevant</li>
              <li>• Focus on factual observations</li>
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
