# Firebase & Particle System Setup

## Firebase Setup (5 minutes)

### 1. Create Firebase Project
1. Go to https://console.firebase.google.com/
2. Click "Add Project"
3. Name it: `dirtyboyz-particles` (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create Project"

### 2. Enable Realtime Database
1. In Firebase Console, click "Realtime Database"
2. Click "Create Database"
3. Choose location (us-central1)
4. Start in **Test mode** for now
5. Click "Enable"

### 3. Setup Authentication
1. Click "Authentication" in sidebar
2. Click "Get Started"
3. Click "Email/Password"
4. Enable "Email/Password"
5. Click "Save"

### 4. Create Admin User
1. Go to "Authentication" → "Users"
2. Click "Add User"
3. Email: `admin@dirtyboyzsanitation.com` (or your email)
4. Password: Create a strong password
5. Click "Add User"

### 5. Get Firebase Config
1. Click the gear icon → "Project Settings"
2. Scroll down to "Your apps"
3. Click the "</>" (Web) icon
4. Register app name: "Dirty Boyz Web"
5. **Copy the firebaseConfig values**

### 6. Update .env File
Paste your Firebase config into `.env`:

```env
FIREBASE_API_KEY=your-actual-api-key
FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
FIREBASE_DATABASE_URL=https://your-project.firebaseio.com
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=123456789
FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 7. Secure Your Database (Production)
Update Realtime Database Rules:
```json
{
  "rules": {
    "particleSettings": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```

## Using the Particle System

### Admin Access
1. Go to http://localhost:49000/admin
2. Login with your admin credentials
3. Control particle effects in real-time!

### Features
- **8 Effect Types:**
  - ❄️ Snow (winter/Christmas)
  - 🎆 Fireworks (4th of July)
  - 🎉 Confetti (celebrations)
  - 🍂 Autumn Leaves (fall)
  - ⭐ Starry Night (elegant)
  - ❤️ Hearts (Valentine's Day)
  - 🫧 Bubbles (playful)
  - ❌ None (disable)

- **Mobile-First Design:**
  - Automatically reduces particle count on mobile (30 vs 80 on desktop)
  - Touch-optimized controls
  - Responsive admin panel

- **Real-Time Updates:**
  - Changes apply instantly across all connected clients
  - No page refresh needed
  - Live preview in admin panel

### Quick Date Presets
Use the preset buttons for instant holiday effects:
- 🎄 Christmas → Snow
- 🎆 4th of July → Fireworks
- ❤️ Valentine's → Hearts
- 🎉 New Year → Confetti

### Performance
- Particles are GPU-accelerated
- Minimal CPU usage
- Responsive to screen size
- No impact on core functionality

## Deployment Notes

### Production Setup
1. Update Firebase Database rules (see step 7)
2. Add Firebase config to production environment variables
3. Test on mobile devices
4. Consider scheduled effects based on dates

### Security
- ✓ Admin login required for changes
- ✓ Public can view effects only
- ✓ Firebase auth protects write access
- ✓ Environment variables not in repo

## Troubleshooting

### Particles not showing
- Check Firebase config in .env
- Ensure particles are enabled in admin panel
- Check browser console for errors

### Can't login to admin
- Verify admin user created in Firebase
- Check email/password
- Ensure Firebase Auth is enabled

### Performance issues
- Reduce particle count in ParticleEffect.vue
- Check mobile device performance
- Disable line linking for better performance

## Future Enhancements
- [ ] Schedule effects by date ranges
- [ ] Custom particle images
- [ ] Multiple effect layers
- [ ] Animation speed controls
- [ ] Color customization per effect
