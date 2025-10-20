# Logout Button Debugging

## Changes Made

I've added comprehensive logging to track the logout flow and added visual feedback. Here's what was updated:

### 1. AccountScreen.tsx
- ✅ Added `console.log` at each step
- ✅ Added `activeOpacity={0.7}` for visual feedback when pressed
- ✅ Added try-catch error handling
- ✅ Added error alert if logout fails

### 2. UserContext.tsx
- ✅ Added detailed console logging throughout logout process
- ✅ Logs when user state is cleared
- ✅ Logs when parent callback is called

### 3. App.tsx
- ✅ Added logging for each step of AsyncStorage cleanup
- ✅ Logs when authentication state changes

## How to Test

### Step 1: Open Developer Tools
In Expo, shake the device or press:
- **iOS Simulator:** Cmd+D
- **Android Emulator:** Cmd+M (Mac) or Ctrl+M (Windows)
- Select "Debug Remote JS"

Or check the terminal running `npm start` for console output.

### Step 2: Test Logout Flow
1. Go to **Account** tab
2. Tap **"Se déconnecter"** button
3. Check console for this sequence:

```
Logout button pressed
[Alert dialog appears]
[User taps "Se déconnecter"]
Logout confirmed, calling logout()
UserContext: logout() called
UserContext: user state cleared
UserContext: calling parent onLogout callback
App: handleLogout() called
App: removing user_data from AsyncStorage
App: user_data removed successfully
App: userData state cleared
App: isAuthenticated set to false
UserContext: parent onLogout completed
Logout completed successfully
[Navigation redirects to Auth screen]
```

### Step 3: Identify Issues

**If you see:**
- `Logout button pressed` → ✅ Button is working
- Alert doesn't appear → ❌ Alert API issue
- Alert appears but no "Logout confirmed" → User cancelled or Alert button issue
- `UserContext: no onLogout callback provided` → ❌ UserProvider not receiving callback
- Error in AsyncStorage → ❌ AsyncStorage permission issue
- Navigation doesn't change → ❌ AppNavigator not responding to isAuthenticated

## Common Issues & Solutions

### Issue 1: Button Not Responding
**Symptoms:** No console log when tapping button
**Solution:** 
- Check if ScrollView is blocking touch events
- Verify TouchableOpacity is not disabled
- Check if there's an overlay blocking the button

### Issue 2: Alert Not Appearing
**Symptoms:** "Logout button pressed" logs but no alert
**Solution:**
- Alert API requires proper permissions
- Make sure app is in foreground
- Check if another alert is already open

### Issue 3: Logout Called But No Navigation
**Symptoms:** All logs appear but stays on Account screen
**Solution:**
- Check `isAuthenticated` state in App.tsx
- Verify AppNavigator conditional rendering
- Check NavigationContainer structure

### Issue 4: AsyncStorage Error
**Symptoms:** Error when removing user_data
**Solution:**
```bash
# Clear AsyncStorage manually
# In Expo DevTools or console:
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.clear();
```

## Manual Test

If automatic logout doesn't work, test manually:

```typescript
// In App.tsx or any screen, add a test button:
import AsyncStorage from '@react-native-async-storage/async-storage';

<Button 
  title="Manual Logout Test"
  onPress={async () => {
    await AsyncStorage.removeItem('user_data');
    console.log('Manually removed user_data');
  }}
/>
```

Then restart the app to see if it shows Auth screen.

## Current State

All code is properly configured with:
- ✅ Async/await handling
- ✅ Error handling
- ✅ Console logging
- ✅ Visual feedback (activeOpacity)
- ✅ Proper TypeScript types
- ✅ French labels

## Next Steps

1. **Run the app** and try the logout flow
2. **Check the console** for the log sequence
3. **Report which logs appear** and where it stops
4. Based on the logs, we can identify exactly where the issue is

## Expected Console Output

### On Successful Logout:
```
Logout button pressed
Logout confirmed, calling logout()
UserContext: logout() called
UserContext: user state cleared
UserContext: calling parent onLogout callback
App: handleLogout() called
App: removing user_data from AsyncStorage
App: user_data removed successfully
App: userData state cleared
App: isAuthenticated set to false
UserContext: parent onLogout completed
Logout completed successfully
```

### On Cancelled Logout:
```
Logout button pressed
Logout cancelled
```

### On Error:
```
Logout button pressed
Logout confirmed, calling logout()
UserContext: logout() called
UserContext: user state cleared
UserContext: calling parent onLogout callback
App: handleLogout() called
App: Error logging out: [error details]
Logout error: [error details]
```

## Files Modified

1. ✅ `src/screens/AccountScreen.tsx` - Added logging and activeOpacity
2. ✅ `src/contexts/UserContext.tsx` - Added detailed logging
3. ✅ `App.tsx` - Added step-by-step logging

All changes maintain functionality while adding visibility into the process.
