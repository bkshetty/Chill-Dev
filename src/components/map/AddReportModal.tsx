import React, { useState } from 'react';
import { X, MapPin, AlertTriangle, Shield, Send } from 'lucide-react';
import { addReport } from '../../firebase/firestore';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

interface AddReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  latitude: number;
  longitude: number;
}

const AddReportModal: React.FC<AddReportModalProps> = ({
  isOpen,
  onClose,
  latitude,
  longitude
}) => {
  const { user, userProfile } = useAuth();
  const [reportType, setReportType] = useState<'safe' | 'unsafe'>('safe');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !userProfile?.isVerifiedWoman) {
      toast.error('Only verified women can add reports');
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
        userDisplayName: userProfile.displayName,
        isVerifiedWoman: userProfile.isVerifiedWoman
      });

      toast.success('Report added successfully!');
      setDescription('');
      setReportType('safe');
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Failed to add report');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/20 animate-fadeIn">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Add Safety Report</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-1 transition-all duration-300 ease-in-out transform hover:scale-110"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6 p-4 bg-gray-50/80 backdrop-blur-sm rounded-xl border border-gray-200/50">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
              <MapPin className="w-4 h-4" />
              <span className="font-medium">Location</span>
            </div>
            <p className="text-sm text-gray-800 font-mono">
              {latitude.toFixed(6)}, {longitude.toFixed(6)}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Report Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setReportType('safe')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    reportType === 'safe'
                      ? 'border-safe-500 bg-safe-50 text-safe-700 shadow-lg'
                      : 'border-gray-200 bg-white/80 backdrop-blur-sm text-gray-600 hover:border-safe-300 hover:shadow-md'
                  }`}
                >
                  <Shield className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-medium">Safe Area</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReportType('unsafe')}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${
                    reportType === 'unsafe'
                      ? 'border-unsafe-500 bg-unsafe-50 text-unsafe-700 shadow-lg'
                      : 'border-gray-200 bg-white/80 backdrop-blur-sm text-gray-600 hover:border-unsafe-300 hover:shadow-md'
                  }`}
                >
                  <AlertTriangle className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-medium">Unsafe Area</span>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all duration-300 ease-in-out bg-white/80 backdrop-blur-sm"
                rows={4}
                placeholder={`Describe why this area is ${reportType === 'safe' ? 'safe' : 'unsafe'}...`}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Be specific about what makes this area {reportType === 'safe' ? 'safe' : 'unsafe'}
              </p>
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 text-gray-700 bg-gray-100/80 backdrop-blur-sm rounded-xl hover:bg-gray-200 hover:shadow-md transition-all duration-300 ease-in-out transform hover:scale-105 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !description.trim()}
                className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 hover:shadow-lg focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-all duration-300 ease-in-out transform hover:scale-105 font-medium"
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
