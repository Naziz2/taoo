# DailyRewardsWheel Component - Updated to Match Web Version

## ✅ Changes Completed

### Previous Version (Removed):
- Animated spinning wheel with Animated API
- 8 prize segments (20-2000 points)
- Weighted probability system
- 3-second spin animation
- Interactive spin button
- Win result display

### New Version (Web-Based Design):
Based on the web component reference (`DailyRewardsWheel.tsx` from web app), the new component features:

## 🎨 Design Features

### 1. **7-Day Progress Tracker**
- Shows daily check-in streak (days 1-7)
- Visual progress chain with colored circles
- **Completed days**: Yellow background (#EAB308)
- **Current day**: White background with yellow border
- **Locked days**: Gray background (#6B7280)
- Connected with progress lines

### 2. **Account Level Integration**
- **Basic**: 1 point per day
- **Silver**: 5 points per day  
- **Gold**: 7 points per day
- Points display based on user's account level

### 3. **Visual Components**

#### Header Section:
- **Daily Rewards (Days 1-6)**:
  - "Récompense quotidienne"
  - "vous avez reçu"
  - Daily points: "+1", "+5", or "+7" (based on level)
  - Coin icon with yellow background

- **Day 7 (Grand Prize)**:
  - "Bravo!"
  - "Récompense pour votre série de 7 jours"
  - "2000 points" display
  - "Tournez la roue" button (navigates to DailyRewardsScreen)

#### Wheel Preview:
- Static wheel icon (MaterialCommunityIcons: `google-circles-communities`)
- Yellow/gold color (#EAB308)
- Pointer at top (menu-down icon)
- Blue gift decoration in bottom-right corner

#### 7-Day Progress Section:
- Countdown text: "Plus que X jours pour accéder au GRAND PRIX"
- 7 numbered circles (1-7) with connecting lines
- Days completed show checkmark (✓)
- Day 7 shows gift emoji (🎁)
- Grand Prize badge: "GRAND PRIX: jusqu'à 2000 pts"

### 4. **Styling**
- **Background**: ImageBackground with semi-transparent dark overlay
- **Container**: Rounded corners (16px), gray gradient (#4B5563 with 85% opacity)
- **Decorative circles**: Subtle white circles in corners for visual depth
- **Responsive**: Adapts to screen width
- **Typography**: White text with bold weights

## 📱 Component Props

```typescript
interface DailyRewardsWheelProps {
  onPointsWon?: (points: number) => void;
}
```

## 🔧 Technical Implementation

### Dependencies:
- `react-native`: View, Text, StyleSheet, TouchableOpacity, Dimensions, ImageBackground
- `@expo/vector-icons/MaterialCommunityIcons`: Icons
- `useUser` context: Access user data (level, points)
- `useNavigation`: Navigate to DailyRewardsScreen

### State:
```typescript
const [currentDay] = useState(Math.floor(Math.random() * 6) + 1);
```
- Randomly set to days 1-6 to show progress
- In production, this would be fetched from backend

### Functions:
- `getDayStatus(day)`: Returns 'completed', 'current', or 'locked'
- `getDayIcon(day)`: Returns day number, checkmark, or gift emoji
- `getDayColor(day)`: Returns appropriate style for day circle
- `handlePlayNow()`: Navigates to full DailyRewardsScreen

## 🎯 User Experience

### Days 1-6 Flow:
1. User sees their daily check-in reward (+1, +5, or +7 points)
2. Views progress toward 7-day streak
3. Sees how many days remaining for grand prize
4. Progress chain shows completed days in yellow

### Day 7 Flow:
1. Header changes to "Bravo!" message
2. Shows 2000 points reward
3. "Tournez la roue" button appears
4. Clicking button navigates to full DailyRewardsScreen with spinning wheel

## 📊 Layout Structure

```
DailyRewardsWheel Component
├── ImageBackground (scenic background)
│   ├── Decorative Circles (top-right, bottom-left)
│   └── Content Container (dark overlay)
│       ├── Header Section
│       │   ├── Left Side
│       │   │   ├── Title: "Récompense quotidienne"
│       │   │   ├── Subtitle: "vous avez reçu"
│       │   │   ├── Points Display: "+X" + coin icon
│       │   │   └── [Day 7] Play Button: "Tournez la roue"
│       │   └── Right Side (Wheel Preview)
│       │       ├── Wheel Icon (static)
│       │       ├── Pointer (top)
│       │       └── Gift Decoration (bottom-right)
│       └── [Days 1-6] Progress Section
│           ├── Progress Text: "Plus que X jours..."
│           ├── Progress Chain (7 circles + connectors)
│           └── Grand Prize Badge: "GRAND PRIX: jusqu'à 2000 pts"
```

## 🎨 Color Palette

| Element | Color | Hex Code |
|---------|-------|----------|
| Primary (Yellow) | Gold | #EAB308 |
| Background Overlay | Dark Gray | #4B5563 (85% opacity) |
| Text Primary | White | #FFFFFF |
| Text Secondary | Dark Gray | #1F2937 |
| Completed Day | Yellow | #EAB308 |
| Current Day | White + Yellow Border | #FFFFFF + #EAB308 |
| Locked Day | Gray | #6B7280 |
| Connector Active | Yellow | #EAB308 |
| Connector Inactive | Gray | #6B7280 |
| Gift Decoration | Blue | #3B82F6 |
| Coin Background | Light Yellow | #FEF3C7 |

## ✅ Benefits of New Design

1. **More Informative**: Shows progress and remaining days
2. **Better Engagement**: Visual 7-day streak encourages daily visits
3. **Account Level Integration**: Different rewards for different tiers
4. **Cleaner UI**: Less cluttered than spinning wheel
5. **Matches Web App**: Consistent cross-platform experience
6. **Performance**: No animations = faster render
7. **Clear CTA**: Day 7 button drives to main wheel experience

## 🔄 Comparison: Old vs New

| Feature | Old Version | New Version |
|---------|-------------|-------------|
| **Interaction** | Spin on HomeScreen | Navigate to full screen |
| **Animation** | 3-second wheel spin | Static preview |
| **Info Display** | Prize after spin | Progress + daily points |
| **User Level** | Not considered | Integrated (1/5/7 pts) |
| **Visual Complexity** | High (animated wheel) | Medium (progress tracker) |
| **Performance** | Animated (heavier) | Static (lighter) |
| **Engagement** | One-time spin | 7-day streak tracking |

## 📝 Next Steps

- [x] Remove category navigation
- [x] Create new DailyRewardsWheel component
- [x] Match web version design
- [x] Integrate with user context
- [x] Add navigation to DailyRewardsScreen
- [ ] Connect to backend for real progress tracking
- [ ] Persist daily check-in status
- [ ] Add animations for day completion
- [ ] Add confetti for day 7

## 🚀 Summary

The **DailyRewardsWheel** component has been completely redesigned to match the web app version. It now features a **7-day progress tracker** with visual indicators, **account level-based rewards**, and a **clean, informative design** that encourages daily engagement. The component serves as a preview/teaser on the home screen, with the full spinning wheel experience available on the dedicated DailyRewardsScreen.

**Result**: More engaging, informative, and consistent with the web app! 🎉
