# Firebase Storage Setup Guide for Safe Route

## 🎯 **Overview**

This guide will help you set up Firebase Storage for the Safe Route Community Map application, allowing verified women to upload images for their safety reports.

---

## ✅ **Files Created**

### **1. `storage.rules`**
- **Security rules** for Firebase Storage
- **Verified women only** can upload images
- **File size limits** (5MB for reports, 2MB for profiles)
- **Image files only** validation
- **Public read access** for safety information

### **2. Updated `firebase.json`**
- Added storage configuration
- Added storage emulator port (9199)
- Ready for deployment

### **3. Updated `src/firebase/config.ts`**
- Added Firebase Storage import
- Exported storage instance
- Ready for use in components

### **4. `src/firebase/storage.ts`**
- **Complete storage service** with helper functions
- **Image upload functions** for reports and profiles
- **File validation** and error handling
- **Delete functionality** for cleanup

---

## 🚀 **Setup Instructions**

### **Step 1: Enable Firebase Storage**

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `safe-route-d062e`
3. **Navigate to Storage**: In the left sidebar, click "Storage"
4. **Get started**: Click "Get started"
5. **Choose security rules**: Select "Start in production mode"
6. **Choose location**: Select a location close to your users

### **Step 2: Deploy Storage Rules**

```bash
# Deploy all Firebase rules and configuration
firebase deploy

# Or deploy only storage rules
firebase deploy --only storage
```

### **Step 3: Test Storage Rules**

```bash
# Start Firebase emulators to test locally
firebase emulators:start
```

Visit: http://localhost:4000 to use the Firebase Emulator Suite

---

## 📁 **Storage Structure**

```
Firebase Storage
├── reports/
│   └── {reportId}/
│       ├── image1.jpg
│       ├── image2.png
│       └── ...
└── users/
    └── {userId}/
        └── profile/
            └── profile_picture.jpg
```

---

## 🔒 **Security Rules Explained**

### **Report Images (`/reports/{reportId}/{fileName}`)**
- ✅ **Read**: Anyone can view (public safety information)
- ✅ **Write**: Only verified women can upload
- ✅ **File size**: Maximum 5MB
- ✅ **File type**: Images only (`image/*`)

### **Profile Images (`/users/{userId}/profile/{fileName}`)**
- ✅ **Read**: Authenticated users only
- ✅ **Write**: Only the user themselves
- ✅ **File size**: Maximum 2MB
- ✅ **File type**: Images only (`image/*`)

### **All Other Paths**
- ❌ **Denied**: No access to other storage paths

---

## 💻 **Usage in Components**

### **Upload Report Image**

```typescript
import { uploadReportImage } from '../firebase/storage';

const handleImageUpload = async (file: File, reportId: string) => {
  try {
    const imageUrl = await uploadReportImage(file, reportId);
    console.log('Image uploaded:', imageUrl);
    // Use the URL in your report
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### **Upload Profile Picture**

```typescript
import { uploadProfileImage } from '../firebase/storage';

const handleProfileUpload = async (file: File, userId: string) => {
  try {
    const imageUrl = await uploadProfileImage(file, userId);
    console.log('Profile uploaded:', imageUrl);
    // Update user profile with new image URL
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

### **Delete Image**

```typescript
import { deleteImage } from '../firebase/storage';

const handleDeleteImage = async (imageUrl: string) => {
  try {
    await deleteImage(imageUrl);
    console.log('Image deleted successfully');
  } catch (error) {
    console.error('Delete failed:', error);
  }
};
```

---

## 🧪 **Testing Storage Rules**

### **Test with Firebase Emulator**

1. **Start emulators**:
   ```bash
   firebase emulators:start
   ```

2. **Upload test image**:
   ```typescript
   // Test upload
   const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
   await uploadReportImage(testFile, 'test-report-id');
   ```

3. **Check emulator UI**: http://localhost:4000

### **Test Security Rules**

- ✅ **Verified woman** should be able to upload
- ❌ **Non-verified user** should be denied
- ❌ **Large files** should be rejected
- ❌ **Non-image files** should be rejected

---

## 🚨 **Important Notes**

### **Security Considerations**
- **Only verified women** can upload report images
- **File size limits** prevent abuse
- **Image-only validation** prevents malicious uploads
- **User isolation** for profile pictures

### **Performance Considerations**
- **5MB limit** for report images balances quality vs. performance
- **2MB limit** for profile pictures keeps them lightweight
- **Automatic cleanup** when reports are deleted

### **Cost Considerations**
- **Storage costs** based on file size and downloads
- **Consider compression** for uploaded images
- **Monitor usage** in Firebase Console

---

## 🔧 **Troubleshooting**

### **Common Issues**

1. **"Permission denied"**
   - Check if user is verified woman
   - Verify authentication status
   - Check storage rules deployment

2. **"File too large"**
   - Reduce image size before upload
   - Implement client-side compression
   - Check file size limits in rules

3. **"Invalid file type"**
   - Ensure file is an image
   - Check MIME type validation
   - Verify file extension

### **Debug Commands**

```bash
# Check Firebase project status
firebase projects:list

# View current rules
firebase firestore:rules:get
firebase storage:rules:get

# Test rules locally
firebase emulators:start --only storage
```

---

## 🎉 **Ready to Use!**

Your Firebase Storage is now configured with:

- ✅ **Secure rules** for verified women only
- ✅ **File validation** and size limits
- ✅ **Helper functions** for easy integration
- ✅ **Error handling** and validation
- ✅ **Local testing** with emulators

The Safe Route application can now handle image uploads for safety reports while maintaining security and performance!

---

## 📱 **Next Steps**

1. **Enable Storage** in Firebase Console
2. **Deploy rules**: `firebase deploy --only storage`
3. **Test locally**: `firebase emulators:start`
4. **Integrate** image upload in your components
5. **Monitor usage** in Firebase Console

Your Safe Route app is now ready for image uploads! 🚀

