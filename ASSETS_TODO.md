# 🎨 App Icons & Assets - TODO

## ✅ Current Status
The app is configured to build **without custom icons** to avoid build errors.

Currently using:
- **App Icon:** Default Expo icon (generated automatically)
- **Splash Screen:** Gold background (#EAB308)
- **Adaptive Icon:** Gold background (#EAB308)

This allows the build to succeed and the app to be tested.

---

## 📝 To Add Custom Icons Later

### Required Files:
Create these files in the `assets/` folder:

1. **`icon.png`** - Main app icon
   - Size: 1024x1024 pixels
   - Format: PNG with transparency
   - Use: iOS and Android app icon

2. **`adaptive-icon.png`** - Android adaptive icon
   - Size: 1024x1024 pixels  
   - Format: PNG with transparency
   - Safe zone: 512x512 center area
   - Use: Android 8.0+ devices

3. **`splash.png`** - Splash screen image
   - Size: 1284x2778 pixels (iPhone 14 Pro Max)
   - Format: PNG
   - Use: App loading screen

4. **`favicon.png`** - Web favicon (optional)
   - Size: 48x48 pixels
   - Format: PNG
   - Use: Web version browser tab

### Design Guidelines:

#### App Icon (icon.png)
```
1024x1024 pixels
- Simple, recognizable design
- Works at small sizes (29x29, 40x40, etc.)
- No text (hard to read when small)
- Use brand colors (gold #EAB308)
- Transparent background or solid color
```

#### Adaptive Icon (adaptive-icon.png)
```
1024x1024 pixels
- Important content in center 512x512
- Outer 256px on each side may be cropped
- Android will apply different shapes (circle, square, squircle)
- Test with different mask shapes
```

#### Splash Screen (splash.png)
```
1284x2778 pixels (or larger)
- Centered logo/branding
- Simple design (loads quickly)
- Matches app theme
- Use backgroundColor: #EAB308
```

---

## 🔧 How to Add Icons

### Step 1: Create Icon Files
Use a design tool like:
- Figma (free)
- Canva (free)
- Adobe Illustrator
- Photoshop

### Step 2: Export Icons
- Export at exact sizes (1024x1024, etc.)
- Use PNG format with transparency
- Optimize file size (use TinyPNG.com)

### Step 3: Add to Project
Place files in `mobile/assets/` folder:
```
mobile/
  assets/
    icon.png              ← 1024x1024
    adaptive-icon.png     ← 1024x1024
    splash.png            ← 1284x2778
    favicon.png           ← 48x48
```

### Step 4: Update app.json
```json
{
  "expo": {
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#EAB308"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#EAB308"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

### Step 5: Rebuild
```powershell
eas build --platform android --profile preview
```

---

## 🎨 Quick Icon Design Tips

### For Cashlik App:

**Colors:**
- Primary: Gold (#EAB308)
- Secondary: Dark Gray (#111827)
- Accent: White (#FFFFFF)

**Icon Ideas:**
1. **Shopping Bag + Coin** 
   - Gold shopping bag with coin symbol
   - Simple and recognizable

2. **DO Letter Mark**
   - Stylized "DO" letters
   - Modern typography

3. **Cashback Symbol**
   - Circular arrow with coin
   - Represents rewards/cashback

4. **Minimal Logo**
   - Just "DO SHOPPING" text
   - Clean, professional

**Keep it simple!** Icons should be recognizable even at 29x29 pixels.

---

## 🛠️ Online Icon Generators

If you don't have design skills, use these free tools:

1. **App Icon Generator**
   - https://appicon.co
   - Upload 1024x1024 image
   - Generates all sizes

2. **Expo Icon Template**
   - https://docs.expo.dev/develop/user-interface/app-icons/
   - Download Figma template
   - Customize colors and shapes

3. **Canva**
   - https://canva.com
   - Search "app icon"
   - Customize template
   - Export 1024x1024

---

## 📐 Icon Sizes Reference

iOS requires these sizes (auto-generated from 1024x1024):
- 20x20, 29x29, 40x40, 58x58, 60x60
- 76x76, 80x80, 87x87, 120x120, 152x152
- 167x167, 180x180, 1024x1024

Android requires these (auto-generated):
- 48x48, 72x72, 96x96, 144x144, 192x192
- Plus adaptive icon with safe zone

Expo handles all resizing automatically from your 1024x1024 source!

---

## ⚡ Current Build Configuration

Your app will build successfully **without custom icons** using:

```json
{
  "expo": {
    "name": "Cashlik",
    "android": {
      "adaptiveIcon": {
        "backgroundColor": "#EAB308"
      }
    },
    "splash": {
      "backgroundColor": "#EAB308"
    }
  }
}
```

This creates a simple gold app with default Expo icon.

---

## 🎯 Priority

### Now (For Testing):
✅ Build works without custom icons
✅ App functions properly
✅ Ready for testing

### Later (Before Release):
- [ ] Design custom app icon
- [ ] Create adaptive icon
- [ ] Design splash screen
- [ ] Add favicon
- [ ] Rebuild with new assets

---

## 📝 Notes

- **Current setup allows builds to succeed**
- Users will see default Expo icon (temporary)
- Splash shows gold background
- Fully functional, just not branded yet
- Add custom icons before Play Store release

---

**For now, focus on testing functionality. Add custom icons when preparing for production release!** 🚀
