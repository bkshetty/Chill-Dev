import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import GoogleMapComponent from '../components/map/GoogleMapComponent';
import AddReportModal from '../components/map/AddReportModal';
import { MapPin, Plus, Route, Navigation } from 'lucide-react';

const Map: React.FC = () => {
  const { user } = useAuth();
  const [showAddReportModal, setShowAddReportModal] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showRoutePlanning, setShowRoutePlanning] = useState(false);
  const [startPoint, setStartPoint] = useState<[number, number] | null>(null);
  const [endPoint, setEndPoint] = useState<[number, number] | null>(null);

  const handleMapClick = (lat: number, lng: number) => {
    if (user) {
      setSelectedLocation({ lat, lng });
      setShowAddReportModal(true);
    }
  };

  const clearRoute = () => {
    setStartPoint(null);
    setEndPoint(null);
    setShowRoutePlanning(false);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/50 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Safety Map</h1>
              <p className="text-gray-600">View and contribute to community safety reports</p>
            </div>
            
            <div className="flex items-center space-x-3">
              {user && (
                <button
                  onClick={() => setShowAddReportModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-medium">Add Report</span>
                </button>
              )}
              
              <button
                onClick={() => setShowRoutePlanning(!showRoutePlanning)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  showRoutePlanning
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border border-gray-200/50'
                }`}
              >
                <Route className="w-4 h-4" />
                <span className="font-medium">Route Planning</span>
              </button>
            </div>
          </div>
        </div>

        {/* Route Planning Panel */}
        {showRoutePlanning && (
          <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 p-4 animate-fadeIn">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Start Point:</span>
                  {startPoint ? (
                    <span className="text-sm text-gray-600">
                      {startPoint[0].toFixed(4)}, {startPoint[1].toFixed(4)}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">Click on map to select</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">End Point:</span>
                  {endPoint ? (
                    <span className="text-sm text-gray-600">
                      {endPoint[0].toFixed(4)}, {endPoint[1].toFixed(4)}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400">Click on map to select</span>
                  )}
                </div>

                {(startPoint || endPoint) && (
                  <button
                    onClick={clearRoute}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Map Container */}
        <div className="flex-1 relative">
          <GoogleMapComponent
            onMapClick={showRoutePlanning ? undefined : handleMapClick}
            showAddReportButton={!showRoutePlanning}
          />

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-safe-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Safe Area</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-unsafe-500 rounded-full"></div>
                <span className="text-sm text-gray-700">Unsafe Area</span>
              </div>
              {showRoutePlanning && (
                <>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Start Point</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">End Point</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Instructions */}
          {!user && (
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <Navigation className="w-5 h-5 text-primary-600" />
                <span className="font-medium">Get Started</span>
              </div>
              <p className="text-sm text-gray-600">
                Sign up to contribute safety reports and help build safer communities.
              </p>
            </div>
          )}

          {/* Location Services Info */}
          {user && (
            <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
              <div className="flex items-center space-x-2 text-gray-600 mb-1">
                <Navigation className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Location Services</span>
              </div>
              <p className="text-xs text-gray-500">
                Click the location button to find your current position and see nearby safety reports.
              </p>
            </div>
          )}
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
        />
      )}
    </div>
  );
};

export default Map;
