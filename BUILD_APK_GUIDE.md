# 📱 Building APK for Cashlik Mobile App

## 🎯 Two Methods to Build APK

---

## Method 1: EAS Build (Recommended) ☁️

### Prerequisites
1. **Expo Account** (Free)
2. **EAS CLI** installed globally

### Step 1: Install EAS CLI
```powershell
npm install -g eas-cli
```

### Step 2: Login to Expo
```powershell
cd "C:\Users\aziz\Desktop\Do-shopping\mobile"
eas login
```
- Enter your Expo username/email
- Enter your password
- Or create a new account if you don't have one

### Step 3: Configure EAS Build
```powershell
eas build:configure
```
- This will use the `eas.json` file I created

### Step 4: Build APK (Preview Build)
```powershell
eas build --platform android --profile preview
```

**What happens:**
- ✅ Builds on Expo's cloud servers (no local Android Studio needed!)
- ✅ Takes 10-15 minutes
- ✅ Provides download link when complete
- ✅ APK file ready to install on any Android device

### Step 5: Build APK (Production Build)
For final release version:
```powershell
eas build --platform android --profile production
```

### Step 6: Download APK
- Check your terminal for the build URL
- Or go to: https://expo.dev/accounts/[your-username]/projects/cashlik-mobile/builds
- Download the APK file
- Install on Android device

---

## Method 2: Local Build (Alternative) 💻

### Prerequisites
1. **Android Studio** installed
2. **Java JDK 17** installed
3. **Android SDK** configured

### Step 1: Install Expo CLI
```powershell
npm install -g expo-cli
```

### Step 2: Build Locally
```powershell
cd "C:\Users\aziz\Desktop\Do-shopping\mobile"
npx expo prebuild
npx expo run:android --variant release
```

⚠️ **Note:** This method requires full Android development environment setup.

---

## 🚀 Quick Start (Recommended Path)

### For Your Case - Use EAS Build:

```powershell
# 1. Install EAS CLI (one-time)
npm install -g eas-cli

# 2. Navigate to project
cd "C:\Users\aziz\Desktop\Do-shopping\mobile"

# 3. Login (one-time)
eas login

# 4. Build APK
eas build --platform android --profile preview

# 5. Wait for build to complete (10-15 minutes)
# 6. Download APK from provided URL
```

---

## 📋 Build Profiles Explained

### Preview Profile
- **Use for:** Testing, sharing with team
- **Output:** APK file (easy to install)
- **Distribution:** Internal only
- **Command:** `eas build --platform android --profile preview`

### Production Profile
- **Use for:** Final release, Play Store
- **Output:** APK or AAB
- **Distribution:** Public release
- **Command:** `eas build --platform android --profile production`

### Development Profile
- **Use for:** Development with live reload
- **Output:** Development client
- **Distribution:** Development only
- **Command:** `eas build --platform android --profile development`

---

## 📦 What I've Set Up For You

### 1. `eas.json` (Build Configuration)
```json
{
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"  // ← Builds APK instead of AAB
      }
    },
    "production": {
      "android": {
        "buildType": "apk"
      }
    }
  }
}
```

### 2. `app.json` (Android Configuration)
```json
{
  "android": {
    "package": "com.cashlik.mobile",  // ← Your app's unique ID
    "versionCode": 1,                 // ← Increment for updates
    "permissions": [
      "CAMERA",                        // ← For QR scanner
      "READ_EXTERNAL_STORAGE",         // ← For image picker
      "WRITE_EXTERNAL_STORAGE"
    ]
  }
}
```

---

## 🎯 Step-by-Step: Your First Build

### Complete Command Sequence:

```powershell
# Open PowerShell

# Step 1: Install EAS CLI (if not already installed)
npm install -g eas-cli

# Step 2: Navigate to project
cd "C:\Users\aziz\Desktop\Do-shopping\mobile"

# Step 3: Login to Expo (creates account if needed)
eas login

# Step 4: Build APK
eas build --platform android --profile preview

# Follow the prompts:
# - Generate new Android keystore? → Yes
# - The build will start on Expo's servers

# Step 5: Wait for completion
# You'll see: "Build finished. Download: https://expo.dev/..."

# Step 6: Download APK
# Click the link or copy to browser
```

---

## 📱 Installing APK on Android Device

### Method A: Direct Download
1. Open the build URL on your Android device
2. Download the APK
3. Open the APK file
4. Allow "Install from Unknown Sources" if prompted
5. Install and run!

### Method B: Transfer via USB
1. Download APK on your computer
2. Connect Android device via USB
3. Copy APK to device
4. Use file manager on device to open APK
5. Install and run!

### Method C: Share via Link
1. Copy the download link from EAS build
2. Send to your phone (WhatsApp, Email, etc.)
3. Open link on phone
4. Download and install

---

## 🔧 Troubleshooting

### Error: "eas: command not found"
```powershell
npm install -g eas-cli
```

### Error: "Not logged in"
```powershell
eas login
```

### Error: "No credentials configured"
```powershell
# Just say "Yes" when EAS asks to generate new keystore
# EAS will handle everything automatically
```

### Error: "Build failed"
- Check the build logs on expo.dev
- Common issues:
  - Missing dependencies → Run `npm install`
  - Expo SDK version mismatch → Update in package.json
  - Asset issues → Check assets folder exists

### Build takes too long
- First build: 15-20 minutes (normal)
- Subsequent builds: 5-10 minutes
- Check build queue at expo.dev

---

## 📊 Build Status Tracking

### Check Build Status:
```powershell
eas build:list
```

### View Specific Build:
```powershell
eas build:view [BUILD_ID]
```

### Cancel Build:
```powershell
eas build:cancel
```

---

## 🎨 Before Building - Checklist

### ✅ Required Assets
- [ ] `assets/icon.png` (1024x1024px)
- [ ] `assets/adaptive-icon.png` (1024x1024px)
- [ ] `assets/splash.png` (1284x2778px recommended)

### ✅ Configuration
- [ ] App name in `app.json`
- [ ] Package name (com.cashlik.mobile)
- [ ] Version number
- [ ] Permissions listed

### ✅ Code
- [ ] All features tested
- [ ] No console.log errors
- [ ] API keys configured
- [ ] Supabase credentials set

---

## 🚀 Production Build (Play Store)

### When ready for Play Store:

1. **Build AAB (not APK) for Play Store:**
```powershell
eas build --platform android --profile production
```

2. **Update eas.json for AAB:**
```json
{
  "build": {
    "production": {
      "android": {
        "buildType": "app-bundle"  // ← AAB for Play Store
      }
    }
  }
}
```

3. **Submit to Play Store:**
```powershell
eas submit --platform android
```

---

## 💡 Pro Tips

### Tip 1: Version Management
Update version in `app.json` before each build:
```json
{
  "version": "1.0.1",  // ← Human-readable
  "android": {
    "versionCode": 2   // ← Must increment with each build
  }
}
```

### Tip 2: Build Locally for Testing
```powershell
npx expo start --android
```
This doesn't create APK but tests on emulator/device via Expo Go

### Tip 3: Check Build Logs
If build fails, detailed logs are at:
https://expo.dev/accounts/[username]/projects/cashlik-mobile/builds

### Tip 4: Free Tier Limits
- Expo EAS Build Free Plan: 30 builds/month
- More than enough for development!

### Tip 5: Speed Up Builds
Use `--clear-cache` if build has issues:
```powershell
eas build --platform android --profile preview --clear-cache
```

---

## 🎯 What Happens Next?

### After Running `eas build`:
1. ✅ EAS uploads your code to cloud
2. ✅ Creates Android build environment
3. ✅ Installs dependencies
4. ✅ Generates keystore (first time)
5. ✅ Compiles native code
6. ✅ Bundles JavaScript
7. ✅ Creates APK file
8. ✅ Provides download link

### You Get:
- **APK file** ready to install
- **Download URL** valid for 30 days
- **Build logs** for debugging
- **Keystore** managed by Expo (secure!)

---

## 📞 Support

### If You Need Help:
1. Check logs: https://expo.dev
2. Expo docs: https://docs.expo.dev/build/setup/
3. Forum: https://forums.expo.dev

---

## 🎉 Quick Reference Card

```powershell
# Install EAS
npm install -g eas-cli

# Login
eas login

# Build APK
cd "C:\Users\aziz\Desktop\Do-shopping\mobile"
eas build --platform android --profile preview

# Check status
eas build:list

# That's it! 🚀
```

---

## 📝 Summary

✅ I've created `eas.json` with APK build configuration
✅ I've updated `app.json` with Android package details
✅ You're ready to build!

**Next step:** Run the commands above to create your APK! 🎯

---

**Build Time:** ~10-15 minutes (first build)
**Output:** APK file ready to install on any Android device
**Cost:** FREE (with Expo account)

Good luck with your build! 🚀
