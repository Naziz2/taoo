# Web Source Code (Original UI Components)

This directory contains the **original web application source code** copied from `cashlik/src`. These are React web components that use standard HTML/CSS and are **not** compatible with React Native without adaptation.

## 📁 Structure

- **components/** – All 35 web UI components (HomePage, DealsPage, AccountPage, etc.)
- **contexts/** – LanguageContext & ThemeContext (web versions)
- **data/** – JSON files (saudi-partners.json, etc.)
- **lib/** – Database utilities (database.ts)
- **repositories/** – CustomerRepository, UserRepository
- **types/** – TypeScript type definitions (entities.ts)
- **WebApp.tsx** – Original web App.tsx entry point
- **index.css** – Tailwind CSS styles

## 🎯 Purpose

These files are preserved here for:

1. **Reference** – See the original web UI logic and styling
2. **Future adaptation** – Port components to React Native as needed
3. **Shared logic** – Reuse business logic, types, and repositories

## ⚠️ Important Notes

- **These components will NOT run in React Native** without modification
- They use `div`, `className`, web-specific APIs, etc.
- TypeScript compilation excludes this folder (see `tsconfig.json`)
- To adapt a component:
  - Replace `div` → `View`, `span` → `Text`
  - Replace `className` → `style` with StyleSheet
  - Replace web routing with React Navigation
  - Remove CSS imports, use inline styles or StyleSheet

## 🔄 React Native Equivalents

The mobile app already has RN versions of core screens in `src/screens/`:

- `HomeScreen.tsx` ↔ `web/components/HomePage.tsx`
- `DealsScreen.tsx` ↔ `web/components/DealsPage.tsx`
- `StoresScreen.tsx` ↔ `web/components/StoresPage.tsx`
- `WalletScreen.tsx` ↔ `web/components/WalletPage.tsx`
- `AccountScreen.tsx` ↔ `web/components/AccountPage.tsx`
- `AuthScreen.tsx` ↔ `web/components/AuthPage.tsx`

## 📦 Shared Code

You can import types and repositories directly:

```typescript
// Import types
import { Customer, Deal } from './web/types/entities';

// Import repositories (may need adaptation for RN)
import { CustomerRepository } from './web/repositories/CustomerRepository';
```

## 🚀 Next Steps

1. Review web components for business logic to reuse
2. Adapt UI components one-by-one as React Native screens
3. Share types, contexts, and data utilities between web and mobile
4. Consider creating a shared package for common code

---

**Source**: `cashlik/src` (web app)  
**Copied**: October 20, 2025
