# 🚔 Police Station Feature - Quick Start Guide

## What It Does
When users report an **unsafe area**, the app automatically:
- ✅ Finds the nearest police station (within 5km)
- ✅ Shows distance (e.g., "1.2km away")
- ✅ Displays full address
- ✅ Shows phone number (if available)
- ✅ Displays in a beautiful toast notification

---

## Required Setup

### 1. Enable Google Places API
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Click **APIs & Services** → **Library**
4. Search for **"Places API"**
5. Click **Enable**
6. ⚠️ **Important:** Billing must be enabled

### 2. Your .env File
Make sure you have:
```env
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

---

## How to Test

### Test 1: Basic Functionality
1. **Login** to the app
2. **Click anywhere** on the map (urban area recommended)
3. Select **"Unsafe Area"** (red button)
4. Type: "Testing police feature"
5. Click **"Add Report"**
6. **Look for toast notification** with police info (appears for 6 seconds)

### Expected Result:
```
🚔 Nearest Police Station
─────────────────────────
Mumbai Police Station
📍 1.2km away
123 Main Street, Mumbai
📞 +91 123-456-7890
```

### Test 2: Error Handling
1. Click on **ocean or remote area**
2. Submit unsafe report
3. **Expected:** "⚠️ Report saved but police notification failed"

---

## Code Structure

### Main Files Modified:

**1. `src/utils/mapUtils.ts`** - Police utilities
```typescript
// New interface
export interface PoliceStation { ... }

// Enhanced function
export async function findNearestPolice(lat, lng): Promise<PoliceStation>

// Helper functions
export function formatDistance(meters): string
export function getDirectionsToPolice(...): DirectionsRenderer
export function createPoliceMarker(...): Marker
```

**2. `src/components/map/AddReportModal.tsx`** - UI integration
- Imports `findNearestPolice` and `formatDistance`
- Calls police API when unsafe report submitted
- Shows rich toast with all details

---

## Common Issues

### ❌ "Google Maps API not loaded"
**Fix:** Check if script tag in `index.html` has correct API key

### ❌ "No police stations found"
**Fix:** 
- Test in urban areas
- Verify Places API is enabled in Google Cloud
- Check billing is active

### ❌ Phone numbers not showing
**Note:** This is normal - not all police stations have phone data in Google Places

---

## What's New?

### Before (Basic):
```typescript
// Returned simple string
"Mumbai Police Station - Andheri West"
```

### After (Enhanced):
```typescript
// Returns full object
{
  name: "Mumbai Police Station",
  address: "123 Main St, Andheri West, Mumbai",
  distance: 1234,  // meters
  location: { lat: 19.076, lng: 72.877 },
  phone: "+91 123-456-7890",
  rating: 4.5,
  placeId: "ChIJ..."
}
```

---

## Optional Features (Ready to Use)

### 1. Show Police Marker on Map
```typescript
import { createPoliceMarker } from './utils/mapUtils';

// In your map component
const marker = createPoliceMarker(
  policeStation.location,
  map,
  policeStation.name
);
```

### 2. Get Directions
```typescript
import { getDirectionsToPolice } from './utils/mapUtils';

// Show route to police
getDirectionsToPolice(userLocation, policeStation.location, map);
```

---

## Performance

- **API Call:** ~500-1000ms per unsafe report
- **Cost:** ~$0.032 per Places API request
- **Caching:** Consider caching for same location (future optimization)

---

## Need More Details?

See full documentation: **`POLICE_STATION_FEATURE.md`**

---

**Status:** ✅ Fully Implemented & Ready to Use
