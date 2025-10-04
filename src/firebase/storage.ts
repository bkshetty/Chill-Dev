import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject,
  UploadResult 
} from 'firebase/storage';
import { storage } from './config';

/**
 * Upload an image file for a safety report
 * @param file - The image file to upload
 * @param reportId - The ID of the report this image belongs to
 * @param fileName - Optional custom filename
 * @returns Promise<string> - The download URL of the uploaded image
 */
export const uploadReportImage = async (
  file: File, 
  reportId: string, 
  fileName?: string
): Promise<string> => {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('File size must be less than 5MB');
    }

    // Generate filename if not provided
    const finalFileName = fileName || `${Date.now()}_${file.name}`;
    
    // Create storage reference
    const storageRef = ref(storage, `reports/${reportId}/${finalFileName}`);
    
    // Upload file
    const uploadResult: UploadResult = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(uploadResult.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

/**
 * Upload a profile picture for a user
 * @param file - The image file to upload
 * @param userId - The ID of the user
 * @param fileName - Optional custom filename
 * @returns Promise<string> - The download URL of the uploaded image
 */
export const uploadProfileImage = async (
  file: File, 
  userId: string, 
  fileName?: string
): Promise<string> => {
  try {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      throw new Error('Only image files are allowed');
    }

    // Validate file size (2MB limit)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      throw new Error('File size must be less than 2MB');
    }

    // Generate filename if not provided
    const finalFileName = fileName || `profile_${Date.now()}_${file.name}`;
    
    // Create storage reference
    const storageRef = ref(storage, `users/${userId}/profile/${finalFileName}`);
    
    // Upload file
    const uploadResult: UploadResult = await uploadBytes(storageRef, file);
    
    // Get download URL
    const downloadURL = await getDownloadURL(uploadResult.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
};

/**
 * Delete an image from storage
 * @param imageUrl - The download URL of the image to delete
 * @returns Promise<void>
 */
export const deleteImage = async (imageUrl: string): Promise<void> => {
  try {
    // Extract the file path from the URL
    const url = new URL(imageUrl);
    const pathMatch = url.pathname.match(/\/o\/(.+)\?/);
    
    if (!pathMatch) {
      throw new Error('Invalid image URL');
    }
    
    // Decode the path
    const filePath = decodeURIComponent(pathMatch[1]);
    
    // Create storage reference
    const storageRef = ref(storage, filePath);
    
    // Delete the file
    await deleteObject(storageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};

/**
 * Get a reference to a storage path
 * @param path - The storage path
 * @returns StorageReference
 */
export const getStorageRef = (path: string) => {
  return ref(storage, path);
};

