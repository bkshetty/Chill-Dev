# Environment Variables Setup Guide

## Overview
This project uses environment variables to securely store sensitive API keys and configuration values. Never commit the `.env` file to version control.

---

## 📋 Required Environment Variables

### Google Maps API Key
```bash
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```
- **Purpose**: Required for Google Maps integration and location services
- **Where to get it**: [Google Cloud Console](https://console.cloud.google.com/)
- **Required APIs**: Maps JavaScript API, Places API

### Firebase Configuration
```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```
- **Purpose**: Firebase Authentication, Firestore Database, and Storage
- **Where to get it**: [Firebase Console](https://console.firebase.google.com/) → Project Settings → General

---

## 🚀 Setup Instructions

### 1. Create Your Environment File
Copy the example file and add your actual keys:
```bash
cp .env.example .env
```

### 2. Get Your Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. (Recommended) Restrict the API key:
   - **Application restrictions**: HTTP referrers
   - **API restrictions**: Select only the required APIs
6. Copy the API key to `VITE_GOOGLE_MAPS_API_KEY` in your `.env` file

### 3. Get Your Firebase Configuration
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon → **Project Settings**
4. Scroll down to **Your apps** section
5. Click on the web app (</>) icon
6. Copy all the config values to your `.env` file

### 4. Verify Your Setup
Run the development server:
```bash
npm run dev
```

If environment variables are missing, you'll see helpful error messages in the console.

---

## 🔒 Security Best Practices

### DO ✅
- ✅ Keep `.env` file in `.gitignore` (already configured)
- ✅ Use `.env.example` as a template (without real keys)
- ✅ Use different API keys for development and production
- ✅ Restrict API keys with appropriate limits and domains
- ✅ Rotate API keys periodically
- ✅ Share keys securely with team members (use password managers)

### DON'T ❌
- ❌ Commit `.env` file to Git
- ❌ Share API keys in public channels (Slack, Discord, etc.)
- ❌ Use production keys in development
- ❌ Hardcode API keys in source code
- ❌ Include API keys in client-side error messages

---

## 🌍 Environment-Specific Configuration

### Development
Use `.env` or `.env.development`:
```bash
VITE_GOOGLE_MAPS_API_KEY=dev_key_here
VITE_FIREBASE_PROJECT_ID=dev-project
```

### Production
Use `.env.production`:
```bash
VITE_GOOGLE_MAPS_API_KEY=prod_key_here
VITE_FIREBASE_PROJECT_ID=prod-project
```

---

## 🐛 Troubleshooting

### "Missing required Firebase configuration" Error
**Cause**: Environment variables are not loaded properly.

**Solutions**:
1. Ensure `.env` file exists in the project root
2. Verify all `VITE_FIREBASE_*` variables are set
3. Restart the development server after adding variables
4. Check for typos in variable names (must start with `VITE_`)

### "Missing Google Maps API key" Error
**Cause**: `VITE_GOOGLE_MAPS_API_KEY` is not set.

**Solutions**:
1. Add the key to your `.env` file
2. Ensure the variable name starts with `VITE_`
3. Restart the development server

### Maps Not Loading
**Possible causes**:
1. Invalid API key
2. Required APIs not enabled (Maps JavaScript API, Places API)
3. API key restrictions too strict
4. Billing not enabled on Google Cloud project

**Solutions**:
1. Verify API key in Google Cloud Console
2. Check API enablement status
3. Review API key restrictions
4. Ensure billing is enabled (Google Maps requires it)

---

## 📝 File Structure

```
project-root/
├── .env                    # Your actual keys (NEVER commit)
├── .env.example            # Template file (safe to commit)
├── .gitignore              # Excludes .env files
├── src/
│   ├── vite-env.d.ts      # TypeScript definitions for env vars
│   └── firebase/
│       └── config.ts       # Firebase initialization with env vars
```

---

## 🔄 For Team Members

When joining the project:

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chill-Dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create your environment file**
   ```bash
   cp .env.example .env
   ```

4. **Get API keys from team lead** (via secure channel)

5. **Add keys to `.env` file**

6. **Start development**
   ```bash
   npm run dev
   ```

---

## 📚 Additional Resources

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Firebase Setup Guide](https://firebase.google.com/docs/web/setup)
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/get-api-key)
- [Best Practices for API Keys](https://cloud.google.com/docs/authentication/api-keys)

---

## ⚠️ Important Notes

1. **Vite Requirement**: All environment variables must be prefixed with `VITE_` to be exposed to the client
2. **Build Time**: Environment variables are embedded at build time, not runtime
3. **Client-Side**: These variables are visible in the client-side code (browser), so never store secrets that should only be server-side
4. **TypeScript**: Type definitions in `vite-env.d.ts` provide autocomplete and type safety

---

## 🎯 Quick Reference

| Variable | Purpose | Required |
|----------|---------|----------|
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps integration | ✅ Yes |
| `VITE_FIREBASE_API_KEY` | Firebase authentication | ✅ Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | ✅ Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project identifier | ✅ Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage | ✅ Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging | ✅ Yes |
| `VITE_FIREBASE_APP_ID` | Firebase app identifier | ✅ Yes |
| `VITE_FIREBASE_MEASUREMENT_ID` | Firebase analytics | ⚠️ Optional |

