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
        <div className="glass backdrop-blur-sm shadow-sm border-b border-gray-700 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Safety Map</h1>
              <p className="text-gray-300 text-sm md:text-base mt-1">View and contribute to real-time community safety reports</p>
            </div>
            
            <div className="flex items-center space-x-3">
              {user && (
                <button
                  onClick={() => setShowAddReportModal(true)}
                  className="flex items-center space-x-2 px-4 md:px-5 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 hover:shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
                >
                  <Plus className="w-4 h-4" />
                  <span className="font-semibold hidden sm:inline">Add Report</span>
                </button>
              )}
              
              <button
                onClick={() => setShowRoutePlanning(!showRoutePlanning)}
                className={`flex items-center space-x-2 px-4 md:px-5 py-2.5 rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105 ${
                  showRoutePlanning
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'glass text-gray-200 hover:bg-dark-700 hover:shadow-md border border-gray-600'
                }`}
              >
                <Route className="w-4 h-4" />
                <span className="font-semibold hidden sm:inline">Route Planning</span>
              </button>
            </div>
          </div>
        </div>

        {/* Route Planning Panel */}
        {showRoutePlanning && (
          <div className="glass backdrop-blur-sm border-b border-gray-700 p-4 animate-fadeIn">
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-3 md:space-y-0">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <span className="text-sm font-semibold text-white whitespace-nowrap">Start Point:</span>
                  {startPoint ? (
                    <span className="text-sm text-gray-300 font-mono">
                      {startPoint[0].toFixed(4)}, {startPoint[1].toFixed(4)}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400 italic">Click on map to select</span>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0" />
                  <span className="text-sm font-semibold text-white whitespace-nowrap">End Point:</span>
                  {endPoint ? (
                    <span className="text-sm text-gray-300 font-mono">
                      {endPoint[0].toFixed(4)}, {endPoint[1].toFixed(4)}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-400 italic">Click on map to select</span>
                  )}
                </div>

                {(startPoint || endPoint) && (
                  <button
                    onClick={clearRoute}
                    className="text-sm text-gray-400 hover:text-white font-medium transition-colors md:ml-auto"
                  >
                    Clear Route
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
          <div className="glass-card rounded-lg shadow-lg p-5 absolute bottom-4 left-4 z-10">
            <h3 className="font-bold text-white mb-4 text-base tracking-tight">Map Legend</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-safe-600 rounded-full shadow-sm"></div>
                <span className="text-sm text-gray-200 font-medium">Safe Area</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-unsafe-600 rounded-full shadow-sm"></div>
                <span className="text-sm text-gray-200 font-medium">Unsafe Area</span>
              </div>
              {showRoutePlanning && (
                <>
                  <div className="flex items-center space-x-3 pt-2 mt-2 border-t border-gray-700">
                    <div className="w-4 h-4 bg-blue-500 rounded-full shadow-sm"></div>
                    <span className="text-sm text-gray-200 font-medium">Start Point</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-purple-500 rounded-full shadow-sm"></div>
                    <span className="text-sm text-gray-200 font-medium">End Point</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Instructions */}
          {!user && (
            <div className="glass-card rounded-lg shadow-lg p-5 max-w-xs absolute top-4 right-4 z-10">
              <div className="flex items-center space-x-3 text-gray-300 mb-3">
                <Navigation className="w-6 h-6 text-primary-400 flex-shrink-0" />
                <span className="font-bold text-white text-base">Get Started</span>
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">
                Sign up to contribute safety reports and help build safer communities for everyone.
              </p>
            </div>
          )}

          {/* Floating Add Report Button */}
          {user && !showAddReportModal && (
            <button
              onClick={() => setShowAddReportModal(true)}
              className="absolute top-20 right-4 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 z-10"
              title="Add Safety Report"
            >
              <Plus className="w-6 h-6" />
            </button>
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
