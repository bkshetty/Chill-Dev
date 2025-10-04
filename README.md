# Safe Route Community Map 🗺️

A comprehensive web application that empowers verified women to report and share information about safe and unsafe areas in their communities. Built with modern web technologies to create safer cities through crowd-sourced safety awareness.

## 🌟 Features

- **Interactive Safety Map**: Real-time visualization of safe (green) and unsafe (red) areas
- **Verified Women-Only Reporting**: Ensures authentic, trustworthy safety information
- **Smart Route Planning**: AI-powered route suggestions that avoid unsafe areas
- **Real-time Updates**: Live synchronization using Firebase Firestore
- **Multi-Platform Authentication**: Email/password and Google Sign-In support
- **Mobile-Responsive Design**: Optimized for all devices with TailwindCSS
- **Secure Data Management**: Comprehensive Firestore security rules
- **User Dashboard**: Personal report management and profile settings

## 🛠️ Tech Stack

### Frontend

- **React 18** - Modern UI framework with hooks
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing

### Maps & Location

- **Leaflet.js** - Interactive maps library
- **React-Leaflet** - React components for Leaflet
- **Leaflet Routing Machine** - Route planning and navigation

### Backend & Database

- **Firebase Authentication** - User management and security
- **Firestore Database** - Real-time NoSQL database
- **Firebase Hosting** - Scalable web hosting

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📁 Project Structure

```bash
Chill-Dev/
├── public/                    # Static assets
│   └── vite.svg              # Vite logo
├── src/                      # Source code
│   ├── components/           # Reusable UI components
│   │   ├── auth/            # Authentication components
│   │   │   ├── Login.tsx    # Login form
│   │   │   └── Signup.tsx   # Registration form
│   │   ├── layout/          # Layout components
│   │   │   └── Navbar.tsx   # Navigation bar
│   │   └── map/             # Map-related components
│   │       ├── AddReportModal.tsx    # Report creation modal
│   │       ├── GoogleMapComponent.tsx # Main map component
│   │       └── SafeRouteComponent.tsx # Route planning
│   ├── contexts/            # React context providers
│   │   └── AuthContext.tsx  # Authentication state
│   ├── firebase/            # Firebase configuration
│   │   ├── auth.ts          # Authentication functions
│   │   ├── config.ts        # Firebase configuration
│   │   └── firestore.ts     # Database operations
│   ├── pages/               # Main application pages
│   │   ├── Home.tsx         # Landing page
│   │   ├── Map.tsx          # Main map view
│   │   ├── AddReport.tsx    # Report creation page
│   │   └── MyReports.tsx    # User reports dashboard
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles
├── firebase.json            # Firebase configuration
├── firestore.rules          # Database security rules
├── firestore.indexes.json   # Database indexes
├── storage.rules            # Storage security rules
├── tailwind.config.js       # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)
- **Firebase Account** - [Sign up here](https://console.firebase.google.com/)

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone https://github.com/DZ1shetty/Chill-Dev.git

# Navigate to the project directory
cd Chill-Dev
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install
```

This will install all the dependencies listed in `package.json`, including React, Firebase, Leaflet, and development tools.

### Step 3: Set Up Firebase

#### 3.1 Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter your project name (e.g., "safe-route-community")
4. Follow the setup wizard to create your project

#### 3.2 Enable Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click on the **"Sign-in method"** tab
3. Enable the following sign-in providers:
   - **Email/Password**: Click enable
   - **Google**: Click enable, then configure with your project details

#### 3.3 Set Up Firestore Database

1. Go to **Firestore Database** in the left sidebar
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Select a location for your database (choose the one closest to your users)

#### 3.4 Get Your Firebase Configuration

1. Go to **Project Settings** (gear icon in the left sidebar)
2. Scroll down to the **"Your apps"** section
3. Click **"Add app"** and select the **Web** icon (`</>`)
4. Register your app with a nickname (e.g., "Safe Route Web App")
5. Copy the configuration object - you'll need this in the next step

### Step 4: Configure the Application

1. Open `src/firebase/config.ts` in your code editor
2. Replace the placeholder configuration with your actual Firebase config:

```typescript
// src/firebase/config.ts
const firebaseConfig = {
  apiKey: "your-actual-api-key-here",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

**Important**: Replace all the placeholder values with the actual values from your Firebase config.

### Step 5: Deploy Security Rules

```bash
# Install Firebase CLI (if not already installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init
# When prompted:
# - Select "Firestore" and "Hosting"
# - Choose your existing Firebase project
# - Accept default settings for files

# Deploy Firestore security rules
firebase deploy --only firestore:rules
```

### Step 6: Run the Development Server

```bash
# Start the development server
npm run dev
```

The application will start and be available at:

- **Local**: `http://localhost:3000`
- **Network**: `http://your-ip:3000` (accessible from other devices on your network)

## 🔧 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🌐 Deployment

### Deploy to Firebase Hosting

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**:
   ```bash
   firebase deploy
   ```

Your app will be live at `https://your-project-id.web.app`

### Environment Variables (Optional)

For enhanced security in production, you can use environment variables:

1. Create a `.env.local` file in the root directory:

   ```env
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id
   ```

2. Update `src/firebase/config.ts`:
   ```typescript
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID
   };
   ```

## 📖 Usage Guide

### For Users

#### Getting Started
1. **Sign Up**: Create an account and verify your identity during registration
2. **Explore the Map**: Browse existing safety reports in your area
3. **Add Reports**: Click on the map to report safe or unsafe locations
4. **Plan Routes**: Use the route planning feature to find safer paths

#### User Features
- **View Safety Map**: See color-coded safety information
- **Add Safety Reports**: Contribute to community safety (verified women only)
- **Personal Dashboard**: Manage your reports in "My Reports"
- **Route Planning**: Get directions that avoid unsafe areas

### For Developers

#### Authentication Flow
- Users register with email/password or Google account
- Identity verification ensures only women can create reports
- Secure token-based authentication with Firebase

#### Database Schema

**Users Collection** (`/users/{userId}`):
```typescript
interface User {
  uid: string;
  email: string;
  displayName: string;
  isVerifiedWoman: boolean;
  createdAt: Date;
}
```

**Reports Collection** (`/reports/{reportId}`):
```typescript
interface Report {
  type: 'safe' | 'unsafe';
  description: string;
  latitude: number;
  longitude: number;
  userId: string;
  userDisplayName: string;
  isVerifiedWoman: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## 🔒 Security Features

- **Verified Users Only**: Only women can submit safety reports
- **Authentication Required**: All report actions require login
- **Data Validation**: Comprehensive input validation
- **Firestore Rules**: Database-level security controls
- **User Ownership**: Users can only modify their own reports

## 🐛 Troubleshooting

### Common Issues and Solutions

#### 1. "Firebase config not found" Error
- Ensure you've updated `src/firebase/config.ts` with your actual Firebase configuration
- Check that all required fields are present in the config object

#### 2. Authentication Not Working
- Verify Authentication is enabled in Firebase Console
- Check that your domain is added to authorized domains
- Ensure OAuth consent screen is configured for Google sign-in

#### 3. "Permission Denied" in Firestore
- Deploy security rules: `firebase deploy --only firestore:rules`
- Check that rules are properly formatted in `firestore.rules`

#### 4. Map Not Loading
- Ensure Leaflet CSS is included in `index.html`
- Check browser console for JavaScript errors
- Verify internet connection for map tiles

#### 5. Build Errors
- Clear dependencies: `rm -rf node_modules && npm install`
- Check for TypeScript errors: `npm run lint`
- Ensure Node.js version is 16 or higher

#### 6. Port 3000 Already in Use
- Kill the process using the port or use a different port:
  ```bash
  npm run dev -- --port 3001
  ```

### Getting Help

- 📖 **Documentation**: Check [Firebase Docs](https://firebase.google.com/docs) and [React-Leaflet Docs](https://react-leaflet.js.org/)
- 🐛 **Issues**: Open an issue on [GitHub](https://github.com/DZ1shetty/Chill-Dev/issues)
- 💬 **Community**: Join discussions in the GitHub repository

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the Repository**
2. **Create a Feature Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make Your Changes**
4. **Test Thoroughly**:
   ```bash
   npm run lint
   npm run build
   ```
5. **Commit Your Changes**:
   ```bash
   git commit -m "Add: Brief description of your changes"
   ```
6. **Push to Your Branch**:
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write clear, concise commit messages
- Test all features before submitting
- Update documentation for new features
- Ensure code passes linting checks

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Firebase** for backend services and hosting
- **Leaflet** for the mapping functionality
- **React Community** for the amazing framework
- **Open Source Contributors** for their valuable contributions

## 📞 Support

For support, questions, or feedback:

- 📧 **Email**: Open an issue on GitHub
- 🐛 **Bug Reports**: Use GitHub Issues
- 💡 **Feature Requests**: Submit via GitHub Issues
- 📖 **Documentation**: Check this README and inline code comments

---

**🌟 Note**: This application is designed to empower communities and improve safety through verified, crowd-sourced information. Please use responsibly and report only factual safety observations to maintain the integrity of the platform.
4. Enable Firestore Database:
   - Go to Firestore Database
   - Create database in production mode
5. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps" and add a web app
   - Copy the config object

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Firebase

1. Open `src/firebase/config.ts`
2. Replace the placeholder config with your actual Firebase config:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

### 5. Deploy Firestore Rules

```bash
# Install Firebase CLI if you haven't already
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

### 6. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Deployment

### Deploy to Firebase Hosting

1. Build the application:
```bash
npm run build
```

2. Deploy to Firebase Hosting:
```bash
firebase deploy --only hosting
```

## Usage

### For Users

1. **Sign Up**: Create an account and verify as a woman during signup
2. **View Map**: Browse the safety map to see reported areas
3. **Add Reports**: Click on the map to add safety reports (verified women only)
4. **Plan Routes**: Use route planning to find safer paths between locations

### For Developers

- **Authentication**: Uses Firebase Auth with email/password and Google Sign-In
- **Database**: Firestore stores user profiles and safety reports
- **Security**: Firestore rules ensure only verified women can create reports
- **Maps**: Leaflet.js provides interactive mapping with custom markers

## Security Features

- **Verified Women Only**: Only users who identify as women can add safety reports
- **User Authentication**: All report actions require authentication
- **Data Validation**: Firestore rules validate all data before storage
- **Privacy**: Users can only edit/delete their own reports

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the GitHub repository.

---

**Note**: This application is designed to help improve community safety through verified, crowd-sourced information. Please use responsibly and report only factual safety observations.