# 🗺️ Safe Route - Community Safety Map

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Firebase](https://img.shields.io/badge/Firebase-10.0-orange?logo=firebase)
![License](https://img.shields.io/badge/License-MIT-green)

A community-driven safety mapping application where verified users can report and view safe and unsafe areas in their city. Built with React, TypeScript, Firebase, and Google Maps to help create safer communities through crowd-sourced safety awareness.

## 📸 Screenshots

![Home Page](docs/screenshot-home.png)
*Interactive dashboard showing safety statistics and recent reports*

![Safety Map](docs/screenshot-map.png)
*Real-time safety map with color-coded markers*

## 🎯 Problem Statement

Many people, especially women, face safety concerns when navigating unfamiliar areas in cities. This application addresses that by creating a community-driven platform where verified users can share real-time safety information about different locations.

## 💡 Solution

**Safe Route** provides:
- Real-time safety reporting system
- Interactive map visualization with color-coded safe/unsafe zones
- Route planning that considers safety ratings
- Community-driven data to help users make informed decisions
- Verified-user only reporting to ensure data authenticity

## ✨ Features

### Core Features
- 🗺️ **Interactive Safety Map**: View safe (green) and unsafe (red) areas on a real-time interactive map
- ✅ **Verified User System**: Only verified users can add safety reports to ensure authentic information
- ⚡ **Real-time Updates**: Reports are stored in Firebase Firestore and update instantly across all users
- 🛣️ **Safe Route Planning**: Get intelligent route suggestions that prioritize safer areas
- 🔐 **User Authentication**: Secure Firebase Authentication with email/password and Google Sign-In
- 📱 **Responsive Design**: Beautiful mobile-friendly interface built with TailwindCSS
- 🌙 **Dark Theme**: Modern dark theme optimized for comfortable viewing
- 📊 **Safety Statistics**: Dashboard showing total safe areas, unsafe areas, and community contributions
- 👤 **User Profiles**: Manage your reports and view your contribution history
- 🔍 **Location Search**: Find specific locations and view their safety status
- 📸 **Photo Upload**: Attach images to reports for better context (optional)
- 🎨 **Smooth Animations**: Polished UI with Framer Motion animations

### Technical Features
- TypeScript for type safety and better developer experience
- Real-time database synchronization with Firestore
- Google Maps integration with custom markers
- Progressive Web App (PWA) capabilities
- Optimized performance with code splitting
- SEO-friendly routing

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript for better code quality
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework for rapid UI development
- **Framer Motion** - Smooth animations and transitions
- **React Router v6** - Client-side routing

### Backend & Services
- **Firebase Firestore** - NoSQL cloud database for storing reports
- **Firebase Authentication** - User authentication and authorization
- **Firebase Storage** - Cloud storage for user-uploaded images
- **Google Maps API** - Interactive mapping and location services
- **Google Places API** - Location search and autocomplete

### Development Tools
- **ESLint** - Code linting and quality checks
- **Prettier** - Code formatting
- **Git** - Version control
- **npm** - Package management

### Hosting & Deployment
- **Firebase Hosting** - Fast and secure web hosting
- **GitHub** - Code repository and version control

## Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Navbar)
│   └── map/           # Map-related components
├── contexts/          # React contexts (AuthContext)
├── firebase/          # Firebase configuration and services
├── pages/             # Main application pages
└── main.tsx          # Application entry point
```

## 🚀 Getting Started (For Beginners)

This guide will walk you through setting up the project from scratch, even if you're new to web development!

### 📋 Prerequisites

Before you begin, make sure you have these installed on your computer:

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Check installation: Open terminal/command prompt and type `node --version`
   - Should show something like: `v16.x.x` or higher

2. **Git** (for version control)
   - Download from: https://git-scm.com/
   - Check installation: Type `git --version`
   - Should show: `git version 2.x.x`

3. **Code Editor** (recommended: VS Code)
   - Download from: https://code.visualstudio.com/

4. **Firebase Account** (free)
   - Sign up at: https://console.firebase.google.com/

5. **Google Cloud Account** (free tier)
   - Sign up at: https://console.cloud.google.com/

### 📥 Step 1: Clone the Repository

Open your terminal/command prompt and run:

```bash
# Clone the repository
git clone https://github.com/DZ1shetty/Chill-Dev.git

# Navigate to the project folder
cd Chill-Dev

# Open in VS Code (optional)
code .
```

### 📦 Step 2: Install Dependencies

In the terminal (make sure you're in the project folder):

```bash
npm install
```

This will download all required packages. It might take a few minutes.

### 🔥 Step 3: Firebase Setup (Detailed)

#### 3.1 Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter a project name (e.g., "safe-route-app")
4. (Optional) Disable Google Analytics if you don't need it
5. Click **"Create project"** and wait for it to finish

#### 3.2 Enable Authentication

1. In your Firebase project, click **"Authentication"** from the left sidebar
2. Click **"Get started"** button
3. Go to **"Sign-in method"** tab
4. Enable **"Email/Password"**:
   - Click on Email/Password
   - Toggle the first switch to "Enabled"
   - Click "Save"
5. Enable **"Google"**:
   - Click on Google
   - Toggle to "Enabled"
   - Select a support email
   - Click "Save"

#### 3.3 Create Firestore Database

1. Click **"Firestore Database"** from the left sidebar
2. Click **"Create database"** button
3. Choose **"Start in production mode"** (we'll add security rules later)
4. Select a location (choose closest to your users)
5. Click **"Enable"**

#### 3.4 Enable Firebase Storage

1. Click **"Storage"** from the left sidebar
2. Click **"Get started"**
3. Click **"Next"** (keep default rules)
4. Choose same location as Firestore
5. Click **"Done"**

#### 3.5 Get Firebase Configuration

1. Click the **gear icon** (⚙️) next to "Project Overview"
2. Click **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **"</>"** (Web) icon
5. Register your app:
   - App nickname: "Safe Route Web App"
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"
6. **IMPORTANT**: Copy all the config values (you'll need these in Step 5)
   - apiKey
   - authDomain
   - projectId
   - storageBucket
   - messagingSenderId
   - appId
   - measurementId

### 🗺️ Step 4: Google Maps Setup (Detailed)

#### 4.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **"Select a project"** at the top
3. Click **"New Project"**
4. Enter project name (e.g., "safe-route-maps")
5. Click **"Create"**

#### 4.2 Enable Required APIs

1. In the search bar, type **"Maps JavaScript API"**
2. Click on it and click **"Enable"**
3. Go back and search for **"Places API"**
4. Click on it and click **"Enable"**
5. Search for **"Geocoding API"** and enable it too

#### 4.3 Create API Key

1. Go to **"Credentials"** from the left sidebar
2. Click **"Create Credentials"** → **"API key"**
3. Copy the API key (you'll need this in Step 5)
4. Click **"Restrict Key"** (recommended for security)

#### 4.4 Restrict API Key (Recommended)

1. Under **"Application restrictions"**:
   - Select "HTTP referrers (web sites)"
   - Add: `localhost:3000/*` (for development)
   - Add your production domain later
2. Under **"API restrictions"**:
   - Select "Restrict key"
   - Select: Maps JavaScript API, Places API, Geocoding API
3. Click **"Save"**

#### 4.5 Enable Billing (Required for Google Maps)

⚠️ **IMPORTANT**: Google Maps requires a billing account, but it has a generous free tier ($200 credit/month)

1. Go to **"Billing"** from the main menu
2. Click **"Link a billing account"**
3. Follow the steps to add a credit card
4. Don't worry - you won't be charged unless you exceed the free tier (unlikely for development)

### 🔐 Step 5: Configure Environment Variables

This is the most important step! We'll create a file to store your API keys securely.

#### 5.1 Create Environment File

**Windows (PowerShell):**
```powershell
Copy-Item .env.example .env
```

**Mac/Linux (Terminal):**
```bash
cp .env.example .env
```

**Or manually**: Just duplicate the `.env.example` file and rename it to `.env`

#### 5.2 Add Your API Keys

Open the `.env` file in your code editor and replace the placeholder values:

```bash
# Google Maps API Key (from Step 4)
VITE_GOOGLE_MAPS_API_KEY=AIzaSyA... (paste your Google Maps API key here)

# Firebase Configuration (from Step 3)
VITE_FIREBASE_API_KEY=AIzaSyB... (paste from Firebase config)
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123def456
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

#### 5.3 Save and Verify

1. **Save** the `.env` file
2. **IMPORTANT**: Never share this file or commit it to Git!
3. The `.env` file is already in `.gitignore` so it won't be uploaded

📖 **Need more help?** See detailed guide: [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md)

⚠️ **Security Note**: Your `.env` file contains sensitive keys. Keep it private!

### 🔒 Step 6: Deploy Security Rules

Security rules protect your database from unauthorized access.

#### 6.1 Install Firebase CLI

```bash
npm install -g firebase-tools
```

#### 6.2 Login to Firebase

```bash
firebase login
```

This will open a browser window. Sign in with your Google account.

#### 6.3 Initialize Firebase

```bash
firebase init
```

When prompted:
- Select **"Firestore"** and **"Storage"** (use spacebar to select)
- Choose **"Use an existing project"**
- Select your project from the list
- Accept default file names (press Enter)
- **Don't overwrite** existing files (type `N` if asked)

#### 6.4 Deploy Rules

```bash
firebase deploy --only firestore:rules,storage:rules
```

✅ Your database is now secured!

### 🎉 Step 7: Run the Application

Start the development server:

```bash
npm run dev
```

You should see:
```
VITE v4.5.14  ready in 180 ms

➜  Local:   http://localhost:3000/
➜  Network: http://192.168.x.x:3000/
```

**Open your browser** and go to: http://localhost:3000

🎊 **Congratulations!** Your app should now be running!

### 🧪 Step 8: Test the Application

1. **Sign Up**: Create a new account with email/password
2. **Login**: Sign in with your new account
3. **View Map**: Click on "Map" to see the interactive safety map
4. **Add Report**: Click anywhere on the map to add a safety report
5. **View Reports**: Go to "My Reports" to see your submissions

## 📝 Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to Firebase Hosting
firebase deploy

# Check for errors
npm run lint
```

## 🌐 Deployment to Production

### Option 1: Firebase Hosting (Recommended)

#### Build the Application
```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

#### Deploy to Firebase
```bash
firebase deploy --only hosting
```

Your app will be live at: `https://your-project-id.web.app`

### Option 2: Vercel (Alternative)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables in Vercel dashboard
6. Deploy!

### Option 3: Netlify (Alternative)

1. Build the project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder
4. Configure environment variables
5. Done!

## 📖 How to Use the Application

### For End Users

#### 1. Creating an Account
- Click **"Sign Up"** on the homepage
- Enter your email and password
- Fill in your name and verification details
- Click **"Create Account"**

#### 2. Logging In
- Click **"Login"** on the homepage
- Enter your credentials
- Or use **"Sign in with Google"** for quick access

#### 3. Viewing the Safety Map
- Click **"Map"** in the navigation bar
- 🟢 **Green markers** = Safe areas
- 🔴 **Red markers** = Unsafe areas
- Click on any marker to see details

#### 4. Adding a Safety Report
- Go to the Map page
- Click on a location on the map
- Select whether it's **Safe** or **Unsafe**
- Add a description (what makes it safe/unsafe)
- Optionally add a photo
- Click **"Submit Report"**

#### 5. Planning Safe Routes
- Click **"Plan Route"** on the Map page
- Enter your starting point
- Enter your destination
- The app will suggest routes avoiding unsafe areas

#### 6. Managing Your Reports
- Click **"My Reports"** in the navigation
- View all your submitted reports
- Edit or delete your reports
- See statistics about your contributions

### For Developers

#### Project Architecture

```
src/
├── components/
│   ├── auth/                 # Authentication components
│   │   ├── Login.tsx        # Login form
│   │   └── Signup.tsx       # Signup form
│   ├── layout/              # Layout components
│   │   └── Navbar.tsx       # Navigation bar
│   └── map/                 # Map-related components
│       ├── GoogleMapComponent.tsx    # Main map component
│       ├── AddReportModal.tsx        # Report submission modal
│       └── SafeRouteComponent.tsx    # Route planning
├── contexts/
│   └── AuthContext.tsx      # Authentication state management
├── firebase/
│   ├── config.ts           # Firebase configuration
│   ├── auth.ts             # Authentication functions
│   ├── firestore.ts        # Database operations
│   └── storage.ts          # File upload functions
├── pages/
│   ├── Home.tsx            # Landing page
│   ├── Map.tsx             # Interactive map page
│   ├── AddReport.tsx       # Report submission page
│   └── MyReports.tsx       # User's reports page
├── App.tsx                 # Main app component
└── main.tsx                # Application entry point
```

#### Key Technologies Used

- **State Management**: React Context API
- **Routing**: React Router v6
- **Styling**: TailwindCSS with custom utilities
- **Maps**: Google Maps JavaScript API
- **Animations**: Framer Motion
- **Forms**: React controlled components
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

#### API Integration

**Google Maps**:
```typescript
import { GOOGLE_MAPS_API_KEY } from './firebase/config';
// Used in GoogleMapComponent.tsx
```

**Firebase Firestore**:
```typescript
import { db } from './firebase/config';
import { collection, addDoc } from 'firebase/firestore';

// Add a report
await addDoc(collection(db, 'reports'), reportData);
```

**Firebase Authentication**:
```typescript
import { auth } from './firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Login user
await signInWithEmailAndPassword(auth, email, password);
```

## 🔒 Security Features

### Application Security
- ✅ **Environment Variables**: All API keys stored securely in `.env`
- ✅ **Firebase Security Rules**: Database protected with custom rules
- ✅ **User Authentication**: Required for all sensitive operations
- ✅ **Data Validation**: Server-side validation for all inputs
- ✅ **XSS Protection**: React's built-in protection against cross-site scripting
- ✅ **HTTPS Only**: All connections encrypted

### Database Security Rules

Our Firestore rules ensure:
- Only authenticated users can read reports
- Only verified users can create reports
- Users can only edit/delete their own reports
- All data is validated before storage

### Privacy Features
- ✅ User emails are never displayed publicly
- ✅ Users can delete their reports anytime
- ✅ Location data is approximate (not exact GPS coordinates)
- ✅ Optional photo uploads (not required)

## 🐛 Troubleshooting

### Common Issues and Solutions

#### Issue: "Missing required Firebase configuration"
**Solution**: Make sure your `.env` file exists and contains all required variables.
```bash
# Check if .env file exists
ls -la | grep .env

# If missing, copy from example
cp .env.example .env
```

#### Issue: "Maps not loading"
**Solutions**:
1. Check if Google Maps API key is correct in `.env`
2. Verify Maps JavaScript API is enabled in Google Cloud Console
3. Check if billing is enabled (required for Maps API)
4. Clear browser cache and reload

#### Issue: "Firebase permission denied"
**Solutions**:
1. Deploy Firestore rules: `firebase deploy --only firestore:rules`
2. Make sure you're logged in: Check top-right corner of the app
3. Verify your account is marked as verified in Firestore

#### Issue: "npm install fails"
**Solutions**:
1. Delete `node_modules` folder and `package-lock.json`
2. Clear npm cache: `npm cache clean --force`
3. Run `npm install` again
4. Make sure you have Node.js v16 or higher

#### Issue: "Port 3000 already in use"
**Solutions**:
- The dev server is already running in another terminal
- Kill the process and restart: `npx kill-port 3000`
- Or use a different port: `npm run dev -- --port 3001`

#### Issue: "Cannot connect to Firebase"
**Solutions**:
1. Check your internet connection
2. Verify Firebase project is active
3. Check if billing is enabled for Firebase
4. Review `.env` file for typos in configuration

### Getting Help

If you're still stuck:
1. Check the [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) for detailed setup
2. Review [SECURITY_IMPLEMENTATION.md](./SECURITY_IMPLEMENTATION.md) for security details
3. Open an issue on GitHub with:
   - Description of the problem
   - Steps to reproduce
   - Screenshots (if applicable)
   - Error messages from console

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### For Beginners
1. **Fork** the repository (click Fork button on GitHub)
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/Chill-Dev.git`
3. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Make changes** and test thoroughly
5. **Commit**: `git commit -m "Add: your feature description"`
6. **Push**: `git push origin feature/your-feature-name`
7. **Create Pull Request** on GitHub

### Contribution Ideas
- 🐛 Fix bugs
- ✨ Add new features
- 📝 Improve documentation
- 🎨 Enhance UI/UX
- 🧪 Add tests
- 🌐 Add translations
- ♿ Improve accessibility

### Code Style Guidelines
- Use TypeScript for type safety
- Follow existing code structure
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

This means you can:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Use privately

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Firebase** for backend services
- **Google Maps** for mapping services
- **TailwindCSS** for styling utilities
- **Lucide** for beautiful icons
- All contributors who help improve this project

## 📧 Contact & Support

### For Users
- 🐛 **Bug Reports**: [Open an issue](https://github.com/DZ1shetty/Chill-Dev/issues)
- 💡 **Feature Requests**: [Open an issue](https://github.com/DZ1shetty/Chill-Dev/issues)
- ❓ **Questions**: Check existing issues or create a new one

### For Developers
- 📖 **Documentation**: Check the `/docs` folder and `.md` files
- 🔧 **Technical Issues**: Open an issue with detailed description
- 💬 **Discussions**: Use GitHub Discussions for general questions

### Project Maintainer
- **GitHub**: [@DZ1shetty](https://github.com/DZ1shetty)
- **Repository**: [Chill-Dev](https://github.com/DZ1shetty/Chill-Dev)

## 📚 Additional Documentation

- 📖 [Environment Setup Guide](./ENVIRONMENT_SETUP.md) - Detailed setup instructions
- 🔒 [Security Implementation](./SECURITY_IMPLEMENTATION.md) - Security features explained
- 🔑 [API Keys Reference](./API_KEYS_REFERENCE.md) - Quick reference for environment variables
- 📊 [Project Summary](./PROJECT_SUMMARY.md) - Technical overview

## 🎯 Project Status

- ✅ **Status**: Active Development
- 🚀 **Version**: 1.0.0
- 📅 **Last Updated**: October 2025
- 🔄 **Build Status**: Passing
- 📦 **Dependencies**: Up to date

## 🌟 Star This Repository

If you find this project helpful, please consider giving it a ⭐ on GitHub!

---

## ⚠️ Important Notes

1. **API Keys**: Never commit your `.env` file to Git. It contains sensitive information.
2. **Testing**: Always test on `localhost` before deploying to production.
3. **Security**: Keep your Firebase and Google Cloud projects secure with proper rules.
4. **Costs**: Monitor your Google Maps API usage to avoid unexpected charges.
5. **Privacy**: Respect user privacy and comply with local data protection laws.
6. **Content**: Report only factual, helpful safety information.

---

<div align="center">

### 🗺️ Built with ❤️ for Community Safety

**[Report Bug](https://github.com/DZ1shetty/Chill-Dev/issues)** • **[Request Feature](https://github.com/DZ1shetty/Chill-Dev/issues)** • **[Documentation](./ENVIRONMENT_SETUP.md)**

Made by [DZ1shetty](https://github.com/DZ1shetty)

</div>