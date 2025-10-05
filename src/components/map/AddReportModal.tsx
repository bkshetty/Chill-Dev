import React, { useState } from 'react';
import { X, MapPin, AlertTriangle, Shield, Send } from 'lucide-react';
import { addReport } from '../../firebase/firestore';
import { Report } from '../../firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import { findNearestPolice, formatDistance } from '../../utils/mapUtils';
import toast from 'react-hot-toast';

interface AddReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  latitude: number;
  longitude: number;
  onSuccess?: () => void;
}

const AddReportModal: React.FC<AddReportModalProps> = ({
  isOpen,
  onClose,
  latitude,
  longitude,
  onSuccess
}) => {
  const { user, userProfile } = useAuth();
  const [reportType, setReportType] = useState<'safe' | 'unsafe'>('safe');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !userProfile) {
      toast.error('You must be logged in to add reports');
      return;
    }

    if (!description.trim()) {
      toast.error('Please provide a description');
      return;
    }

    setLoading(true);

    try {
      await addReport({
        type: reportType,
        description: description.trim(),
        latitude,
        longitude,
        userId: user.uid,
        userDisplayName: userProfile.displayName || user.displayName || 'Anonymous' // Fallback for safety
      });

      toast.success('Report added successfully!');
      console.log('Report added:', { type: reportType, latitude, longitude }); // Optional: Debug log

      // Find and notify nearest police for unsafe reports
      if (reportType === 'unsafe') {
        try {
          console.log('Searching for nearest police station...');
          const policeStation = await findNearestPolice(latitude, longitude);
          console.log('Police station found:', policeStation);
          
          // Show detailed toast notification
          toast.success(
            () => (
              <div className="space-y-2">
                <div className="font-bold text-blue-600">🚔 Nearest Police Station</div>
                <div className="text-sm">
                  <strong>{policeStation.name}</strong>
                </div>
                <div className="text-xs text-gray-600">
                  📍 {formatDistance(policeStation.distance)} away
                </div>
                <div className="text-xs text-gray-500">
                  {policeStation.address}
                </div>
                {policeStation.phone && (
                  <div className="text-xs text-gray-600">
                    📞 {policeStation.phone}
                  </div>
                )}
              </div>
            ),
            { duration: 6000 }
          );
        } catch (policeError: any) {
          console.error('Failed to find police station:', policeError);
          toast.error(`⚠️ Report saved but couldn't find nearby police station`);
        }
      }

      // Reset form
      setDescription('');
      setReportType('safe');
      
      // Close modal - don't close automatically, let user close it
      onClose();
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error('Add report error:', error); // Optional: More specific logging
      toast.error(error.message || 'Failed to add report');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-[#2D2D44] backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-gray-700/50 animate-scaleIn">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Add Safety Report</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg p-2 transition-all duration-200 ease-in-out transform hover:scale-110 hover:rotate-90"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mb-6 p-4 bg-[#1A1A2E]/60 backdrop-blur-sm rounded-xl border border-gray-700/30">
            <div className="flex items-center space-x-2 text-sm text-gray-300 mb-2">
              <MapPin className="w-4 h-4 text-primary-400" />
              <span className="font-semibold">Location</span>
            </div>
            <p className="text-sm text-gray-200 font-mono">
              {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-3">
                Report Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setReportType('safe')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ease-in-out transform hover:scale-105 ${
                    reportType === 'safe'
                      ? 'border-green-500 bg-green-500/20 text-green-300 shadow-lg shadow-green-500/20 scale-105'
                      : 'border-gray-600 bg-gray-800/40 text-gray-300 hover:border-green-400 hover:bg-green-500/10 hover:shadow-md'
                  }`}
                >
                  <Shield className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-semibold text-base">Safe Area</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReportType('unsafe')}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ease-in-out transform hover:scale-105 ${
                    reportType === 'unsafe'
                      ? 'border-red-500 bg-red-500/20 text-red-300 shadow-lg shadow-red-500/20 scale-105'
                      : 'border-gray-600 bg-gray-800/40 text-gray-300 hover:border-red-400 hover:bg-red-500/10 hover:shadow-md'
                  }`}
                >
                  <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-semibold text-base">Unsafe Area</span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-200 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-600 bg-gray-800/40 text-gray-100 placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none transition-all duration-200 ease-in-out"
                rows={4}
                placeholder={`Describe why this area is ${reportType === 'safe' ? 'safe' : 'unsafe'}...`}
                required
              />
              <p className="text-xs text-gray-400 mt-2">
                Be specific about what makes this area {reportType === 'safe' ? 'safe' : 'unsafe'}
              </p>
            </div>

            <div className="flex space-x-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 text-gray-300 bg-gray-700/50 backdrop-blur-sm rounded-xl hover:bg-gray-700 hover:text-white hover:shadow-md transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-95 font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !description.trim()}
                className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-[#2D2D44] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2 transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-95 font-semibold"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Add Report</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReportModal;