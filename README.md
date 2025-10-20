# Cashlik Mobile App (React Native + Expo)

A React Native mobile application built with Expo for the Cashlik rewards platform. This app mirrors the web app's UI and functionality with native mobile components.

## 🚀 Features

- **Multi-language support** (English, French, Arabic) with RTL support for Arabic
- **Bottom tab navigation** (Home, Deals, Stores, Wallet, Account)
- **Authentication** via Supabase with email/password
- **Points & Rewards system** with visual balance display
- **Light/Dark theme support**
- **Responsive design** for iOS and Android

## 📋 Requirements

- **Node.js** (v16+) and **npm** or **yarn**
- **Expo CLI** installed globally: `npm install -g expo-cli`
- **iOS Simulator** (Mac) or **Android Emulator** / **Expo Go** app (any platform)

## 🛠️ Setup

### 1. Install Dependencies

```powershell
cd C:\Users\aziz\Desktop\Do-shopping\mobile
npm install
```

### 2. Add Icon Assets

Copy the app icon from the repository:

```powershell
Copy-Item C:\Users\aziz\Desktop\Do-shopping\cashlik\mobile-app\assets\icon.png -Destination C:\Users\aziz\Desktop\Do-shopping\mobile\assets\icon.png
```

Or manually copy `cashlik/mobile-app/assets/icon.png` to `mobile/assets/icon.png`.

### 3. Configure Supabase (Optional for Testing)

Edit `app.json` and add your Supabase credentials under `extra`:

```json
{
  "expo": {
    "extra": {
      "supabaseUrl": "your-supabase-url-here",
      "supabaseAnonKey": "your-supabase-anon-key-here"
    }
  }
}
```

Alternatively, set environment variables:

```powershell
$env:EXPO_PUBLIC_SUPABASE_URL = "your-url"
$env:EXPO_PUBLIC_SUPABASE_ANON_KEY = "your-key"
```

### 4. Start the App

```powershell
npm run start
```

You'll see a QR code. Choose your target:

- **i** = iOS Simulator (Mac only)
- **a** = Android Emulator
- **w** = Web preview
- Scan QR with **Expo Go** app (iOS/Android)

## 📁 Project Structure

```
mobile/
├── src/
│   ├── contexts/           # Language & Theme providers
│   ├── lib/                # Supabase client
│   ├── navigation/         # Stack & Tab navigation
│   ├── screens/            # Auth, Home, Deals, Stores, Wallet, Account
├── App.tsx                 # Root component
├── app.json                # Expo config
├── package.json            # Dependencies
└── README.md
```

## 🎨 Screens

- **AuthScreen**: Login/Register with email & password
- **HomeScreen**: Promotions, featured partners, hot deals
- **DealsScreen**: List of available deals (points required)
- **StoresScreen**: Partner stores with cashback rates
- **WalletScreen**: Points balance, recent transactions, quick actions
- **AccountScreen**: User profile, settings, help & support

## 🔄 Available Scripts

```powershell
npm run start          # Start dev server
npm run android        # Run on Android Emulator
npm run ios           # Run on iOS Simulator
npm run web           # Run in web browser
```

## 📝 Notes

- Lint errors in VS Code before running `npm install` are expected; they disappear once dependencies are installed.
- The app uses **lucide-react-native** for icons. If needed, replace with another icon library (e.g., `react-native-vector-icons`).
- Supabase URL and key can be added via `app.json` or environment variables.
- Theme and language preferences are saved locally to AsyncStorage.

## 🎯 Next Steps / Missing Features

- [ ] Wire up all remaining screens (DealDetail, StoreDetail, QRScanner, etc.)
- [ ] Implement Supabase authentication fully
- [ ] Add image loading for partner stores and deals
- [ ] Build and test on physical devices (EAS Build)
- [ ] Add error handling and loading indicators
- [ ] Implement API calls to backend (repositories)
- [ ] Add unit & integration tests

## 🤝 Contributing

This scaffold is ready for further development. Extend screens, add API calls via the repositories, and customize styling as needed.

---

**Created**: October 20, 2025  
**Base**: Expo 52.0.0, React Native 0.76.5, React 18.3.1
