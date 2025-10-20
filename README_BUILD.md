# 🚀 Quick Build Guide

## ✅ Setup Complete!

I've configured everything you need to build an APK:

### Files Created:
- ✅ `eas.json` - Build configuration
- ✅ `app.json` - Updated with Android settings
- ✅ `build-apk.ps1` - Automated build script
- ✅ `BUILD_APK_GUIDE.md` - Comprehensive documentation

---

## 🎯 Build Your APK (3 Simple Steps)

### Step 1: Login to Expo
```powershell
cd "C:\Users\aziz\Desktop\Do-shopping\mobile"
eas login
```
**First time?** Create a free account when prompted!

### Step 2: Build APK
```powershell
eas build --platform android --profile preview
```

### Step 3: Download & Install
- Wait 10-15 minutes for build to complete
- Download APK from the URL provided
- Install on your Android device

---

## ⚡ Or Use the Automated Script

```powershell
cd "C:\Users\aziz\Desktop\Do-shopping\mobile"
.\build-apk.ps1
```

This script will:
1. Check if EAS CLI is installed
2. Verify your login status
3. Start the build process
4. Provide download link when done

---

## 📱 What You'll Get

- **File:** `cashlik-mobile.apk`
- **Size:** ~50-80 MB
- **Install:** Works on any Android device (5.0+)
- **Valid:** 30 days download link

---

## 🔍 Check Build Status

### View all builds:
```powershell
eas build:list
```

### Check specific build:
```powershell
eas build:view [BUILD_ID]
```

### Visit web dashboard:
https://expo.dev

---

## 📦 Build Profiles

### Preview (APK) - Current Setup
- **For:** Testing & sharing
- **Output:** APK file
- **Command:** `eas build --platform android --profile preview`

### Production (APK)
- **For:** Final release
- **Output:** APK file
- **Command:** `eas build --platform android --profile production`

---

## ⚙️ Your App Configuration

```json
Package: com.cashlik.mobile
Version: 1.0.0 (Code: 1)
Permissions:
  - Camera (QR scanner)
  - Storage (image picker)
```

---

## 🆘 Troubleshooting

### "eas: command not found"
```powershell
npm install -g eas-cli
```

### "Not logged in"
```powershell
eas login
```

### "Build failed"
Check logs at: https://expo.dev
Common fixes:
- Run `npm install` 
- Check internet connection
- Verify all files are saved

---

## 📞 Need Help?

1. Read: `BUILD_APK_GUIDE.md` (comprehensive guide)
2. Check: https://docs.expo.dev/build/setup/
3. Visit: https://expo.dev (build dashboard)

---

## 🎉 Ready to Build!

**Quick command:**
```powershell
eas build --platform android --profile preview
```

**That's it!** Your APK will be ready in ~15 minutes! 🚀
