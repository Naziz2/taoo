# Daily Spin Wheel Implementation

## What's Been Done

### 1. Updated DailyRewardsScreen.tsx
- Changed title from "Roue de la Fortune" to "Spin Quotidien"
- Replaced the programmatic wheel segments with image-based wheel
- Implemented three-layer wheel design:
  - **Outer Frame** (wheel-frame.png) - Static border with yellow edge
  - **Inner Wheel** (wheel-segments.png) - Rotating wheel with reward segments
  - **Center Logo** (wheel-center.png) - Static center logo/pin
- Added custom red triangle pointer at the top

### 2. Wheel Structure
The wheel now uses the images you provided:
- The outer frame stays fixed
- Only the inner wheel (segments) rotates
- Center logo remains static
- Pointer indicates the winning segment

### 3. Placeholder Images Created
Temporary placeholder images have been created using logo.png:
- `wheel-frame.png` - Replace with the circular frame image (dark border with yellow edge)
- `wheel-center.png` - Replace with the center pin/marker logo
- `wheel-segments.png` - Replace with the yellow wheel showing 8 segments

### 4. How to Replace Placeholders

**IMPORTANT:** Replace these placeholder images with your actual wheel images:

1. **wheel-frame.png** - Use the first image (outer circular frame)
2. **wheel-center.png** - Use the second image (center logo with pin)
3. **wheel-segments.png** - Use the third image (yellow wheel with segments)

Save them in: `mobile/assets/`

### 5. Wheel Behavior
- Spins for 3 seconds with smooth animation
- Lands on random reward based on probability
- Shows winning points with animation
- Disabled after first spin (daily limit)
- Awards: 20, 50, 100, 200, 500, 700, 1000, 2000 points

### 6. Probabilities
- 2000 points: 1% chance
- 1000 points: 2% chance
- 700 points: 3% chance
- 500 points: 4% chance
- 200 points: 10% chance
- 100 points: 10% chance
- 50 points: 40% chance
- 20 points: 30% chance

## Next Steps

1. Replace the three placeholder images with your actual wheel design images
2. Test the wheel spinning animation
3. Adjust wheel size if needed (currently 70% of screen width)
4. Verify the pointer alignment with segments

## Files Modified
- `mobile/src/screens/DailyRewardsScreen.tsx`
- `mobile/assets/wheel-frame.png` (placeholder - needs replacement)
- `mobile/assets/wheel-center.png` (placeholder - needs replacement)
- `mobile/assets/wheel-segments.png` (placeholder - needs replacement)
