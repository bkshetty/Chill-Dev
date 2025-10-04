# Safe Route - Community Map

A map-based web application where verified women can report safe and unsafe areas in their city, helping build safer communities through crowd-sourced safety awareness.

## Features

- **Interactive Safety Map**: View safe (green) and unsafe (red) areas on an interactive map
- **Verified Women Only**: Only verified women can add safety reports to ensure authentic information
- **Real-time Updates**: Reports are stored in Firebase Firestore and update in real-time
- **Safe Route Planning**: Get route suggestions that avoid unsafe areas
- **User Authentication**: Firebase Authentication with email/password and Google Sign-In
- **Responsive Design**: Mobile-friendly interface built with TailwindCSS

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + TailwindCSS
- **Maps**: Leaflet.js + React-Leaflet + Leaflet Routing Machine
- **Backend**: Firebase Firestore + Firebase Authentication
- **Hosting**: Firebase Hosting
- **Routing**: React Router DOM

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

## Setup Instructions

### 1. Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication:
   - Go to Authentication > Sign-in method
   - Enable Email/Password and Google providers
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