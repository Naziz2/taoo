# 🚀 Build APK with Expo - 3 Simple Steps

## ⚠️ Important Note
Your app uses **Expo Managed Workflow**, NOT bare React Native.  
The `react-native bundle` and `./gradlew` commands won't work.

---

## ✅ For Expo Apps - Use These 3 Steps Instead:

### Step 1: Login to Expo
```powershell
cd "C:\Users\aziz\Desktop\Do-shopping\mobile"
eas login
```
**First time?** Create a free account when prompted.

### Step 2: Start Build
```powershell
eas build --platform android --profile preview
```

### Step 3: Download APK
- Wait 10-15 minutes for build to complete
- Download APK from the URL provided
- Install on your Android device

**That's it!** ✅

---

## 🤔 Why Not Use React Native Commands?

### Your Project Type: **Expo Managed**
```
mobile/
  ├── app.json       ← Expo config
  ├── package.json   ← Uses "expo": "~52.0.0"
  ├── src/           ← React Native code
  └── NO android/    ← No native folders!
```

### Bare React Native Projects:
```
mobile/
  ├── android/       ← Has native Android folder
  ├── ios/           ← Has native iOS folder
  └── Can use gradlew commands
```

**Your app doesn't have an `android/` folder**, so those commands won't work.

---

## 📋 Full Build Command (Copy & Paste)

```powershell
cd "C:\Users\aziz\Desktop\Do-shopping\mobile"
eas build --platform android --profile preview
```

---

## 🎯 Alternative: Local Build (Advanced)

If you want to use Gradle commands, you need to **eject from Expo**:

### Option A: Prebuild (Keep Expo Features)
```powershell
cd "C:\Users\aziz\Desktop\Do-shopping\mobile"
npx expo prebuild
```
This creates `android/` and `ios/` folders while keeping Expo.

**After prebuild, you can use:**
```powershell
cd android
.\gradlew.bat assembleRelease
```

**⚠️ Warning:** This makes your project more complex. Only do this if you need native modules.

---

## 🚀 Recommended: Stick with EAS Build

### Why EAS Build is Better:
✅ No need for Android Studio  
✅ No need for Java/Gradle setup  
✅ Builds on cloud (no local setup)  
✅ Works on any computer  
✅ Free for 30 builds/month  
✅ Handles everything automatically  

### Why Gradle Method is Harder:
❌ Need to install Android Studio  
❌ Need to install Java JDK  
❌ Need to configure Android SDK  
❌ Need to set up environment variables  
❌ Need powerful computer  
❌ Longer setup time (hours)  

---

## 📱 Quick Comparison

### EAS Build (What You Have):
```powershell
# 1 command, done!
eas build --platform android --profile preview
```
⏱️ Time: 15 minutes  
💻 Requirements: Internet connection  
🎯 Result: APK ready to install

### Gradle Method (Requires Ejecting):
```powershell
# Multiple steps
npx expo prebuild
cd android
.\gradlew.bat assembleRelease
```
⏱️ Time: 1-2 hours setup + 10 min build  
💻 Requirements: Android Studio, Java, Gradle, powerful PC  
🎯 Result: APK ready to install

**Both produce the same APK!** EAS is just easier.

---

## 🛠️ If You Really Want Gradle Method

### Step 1: Prebuild (Creates android folder)
```powershell
cd "C:\Users\aziz\Desktop\Do-shopping\mobile"
npx expo prebuild --platform android
```

### Step 2: Install Android Studio
- Download from: https://developer.android.com/studio
- Install Android SDK
- Install Java JDK 17
- Set up environment variables

### Step 3: Build with Gradle
```powershell
cd android
.\gradlew.bat assembleRelease
```

### Step 4: Find APK
```
mobile/android/app/build/outputs/apk/release/app-release.apk
```

**But this is much more work!** 😅

---

## ✅ Recommended Path for You

### Just Use EAS Build:

```powershell
# Open PowerShell
cd "C:\Users\aziz\Desktop\Do-shopping\mobile"

# Login (first time only)
eas login

# Build APK
eas build --platform android --profile preview

# Wait 15 minutes
# Download APK from URL provided
# Install on Android device
# Done! 🎉
```

---

## 🎯 What EAS Does Behind the Scenes

When you run `eas build`, it actually does this:

1. ✅ Runs `expo prebuild` (creates android folder)
2. ✅ Installs all dependencies
3. ✅ Configures Gradle
4. ✅ Runs `./gradlew assembleRelease`
5. ✅ Bundles JavaScript
6. ✅ Creates APK
7. ✅ Provides download link

**It's literally doing all those steps for you!** 🚀

---

## 💡 Summary

### Your Question:
> How to use react-native bundle and gradlew commands?

### Answer:
**You can't directly** because you're using Expo managed workflow.

### Solutions:

#### ✅ Easy Way (Recommended):
```powershell
eas build --platform android --profile preview
```

#### 🔧 Hard Way (If You Need Native Code):
```powershell
npx expo prebuild
cd android
.\gradlew.bat assembleRelease
```

---

## 📞 Need Help?

- **Stick with EAS?** Follow `BUILD_READY.md`
- **Want to eject?** This is a big decision - ask first!
- **Having issues?** Check build logs at expo.dev

---

**My Recommendation:** Use EAS Build. It's literally the same result, but 100x easier! 🎯
