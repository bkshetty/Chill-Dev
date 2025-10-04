#!/bin/bash

# Safe Route - Deployment Script
echo "🚀 Deploying Safe Route Community Map..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Check if user is logged in to Firebase
if ! firebase projects:list &> /dev/null; then
    echo "🔐 Please login to Firebase..."
    firebase login
fi

# Build the application
echo "📦 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Deploy Firestore rules
echo "🔒 Deploying Firestore security rules..."
firebase deploy --only firestore:rules

# Deploy to Firebase Hosting
echo "🌐 Deploying to Firebase Hosting..."
firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🎉 Your Safe Route app is now live!"
else
    echo "❌ Deployment failed. Please check the errors above."
    exit 1
fi
