# Wheel Images Setup

## Required Images

Please save the provided wheel images to this directory with these names:

1. **wheel-frame.png** - The outer circular frame with dark border and yellow edge (first image)
2. **wheel-center.png** - The center logo with the pin/marker icon (second image)  
3. **wheel-segments.png** - The yellow wheel with segments showing reward values (third image)

## Image Requirements

- Format: PNG with transparency
- Size: Recommended 800x800px or higher for quality
- The wheel-segments.png should show the different reward amounts in each segment

## Current Implementation

The DailyRewardsScreen now uses these three images:
- `wheel-frame.png` - Static outer frame (doesn't rotate)
- `wheel-segments.png` - Inner wheel that spins
- `wheel-center.png` - Center logo (doesn't rotate)

The wheel will spin and land on random reward amounts based on probability.
