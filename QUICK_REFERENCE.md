# Cashlik Mobile App - Quick Reference

## ✅ What's Been Created

### 📦 Root Configuration
- **package.json** – Expo & React Native dependencies
- **app.json** – Expo configuration with icon & splash setup
- **babel.config.js** – Babel presets for Expo
- **tsconfig.json** – TypeScript configuration
- **.gitignore** – Git exclusions

### 📱 App Entry Point
- **App.tsx** – Root component with auth state & providers

### 🎨 Screens (in `src/screens/`)
1. **AuthScreen.tsx** – Login/Register with Supabase
2. **HomeScreen.tsx** – Points, promotions, partners, hot deals
3. **DealsScreen.tsx** – List of available deals
4. **StoresScreen.tsx** – Partner stores with cashback
5. **WalletScreen.tsx** – Points balance & transactions
6. **AccountScreen.tsx** – Profile, settings, logout

### 🔧 Contexts (in `src/contexts/`)
- **LanguageContext.tsx** – Multi-language (en, fr, ar) with RTL support
- **ThemeContext.tsx** – Light/Dark theme with AsyncStorage persistence

### 🧭 Navigation (in `src/navigation/`)
- **AppNavigator.tsx** – Stack navigator (Auth → Main), Tab navigator (5 main screens)

### 📡 Libraries (in `src/lib/`)
- **supabase.ts** – Supabase client setup with AsyncStorage for auth

### 📂 Assets
- **assets/** – Placeholder for icon.png (copy from `cashlik/mobile-app/assets/`)

## 🚀 Quick Start

```powershell
cd C:\Users\aziz\Desktop\Do-shopping\mobile
npm install
npm run start
```

Scan QR code with Expo Go or pick a simulator.

## 🎯 UI/UX Features
- ✨ Tailwind-inspired color scheme (yellow #EAB308, gray scale)
- 📐 Flexbox-based responsive layouts
- 🌍 3-language support with i18n
- 🌓 Theme switching with system preference detection
- 🔐 Supabase authentication ready
- 💾 AsyncStorage for theme & future preferences

## 📋 Architecture
- Clean separation: screens → contexts → lib
- Providers wrap at App.tsx root
- Tab navigation for main flow, Stack for modals/details
- Language strings centralized in LanguageContext
- Supabase client pre-configured

---

**Status**: ✅ Complete scaffold ready for development
