import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

interface WheelSegment {
  value: number;
  color: string;
  angle: number;
  prob: number;
}

interface SpinWheelProps {
  size: number;
  segments: WheelSegment[];
}

export default function SpinWheel({ size, segments }: SpinWheelProps) {
  const radius = size / 2;
  const segmentAngle = 360 / segments.length;

  return (
    <View style={[styles.container, { width: size * 1.2, height: size * 1.2 }]}>
      {/* Wheel Container */}
      <View style={[styles.wheelWrapper, { width: size, height: size, borderRadius: radius }]}>
        {/* Background circle */}
        <View style={[styles.wheelBackground, { width: size, height: size, borderRadius: radius, overflow: 'hidden' }]}>
          {/* Create segments using rotated half-circles */}
          {segments.map((segment, index) => {
            const rotation = segmentAngle * index;
            const backgroundColor = index % 2 === 0 ? '#1F2937' : '#EAB308';
            
            return (
              <View
                key={`segment-${index}`}
                style={[
                  styles.segment,
                  {
                    width: radius * 2,
                    height: radius,
                    backgroundColor,
                    borderBottomLeftRadius: radius,
                    borderBottomRightRadius: radius,
                    left: 0,
                    top: 0,
                    transform: [
                      { translateX: radius },
                      { translateY: radius },
                      { rotate: `${rotation}deg` },
                      { translateX: -radius },
                    ],
                  },
                ]}
              />
            );
          })}
        </View>
        
        {/* Center white circle for button */}
        <View style={[styles.centerCircle, { 
          width: size * 0.35, 
          height: size * 0.35, 
          borderRadius: size * 0.175,
          top: size * 0.325,
          left: size * 0.325,
        }]} />
      </View>
      
      {/* Wheel Frame Overlay */}
      <Image
        source={require('../../assets/wheel-frame.png')}
        style={[
          styles.wheelFrame,
          { 
            width: size * 1.15, 
            height: size * 1.15,
            top: -size * 0.075,
            left: -size * 0.075,
          }
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  wheelFrame: {
    position: 'absolute',
    zIndex: 15,
  },
  wheelWrapper: {
    position: 'relative',
  },
  wheelBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  segment: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  centerCircle: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    zIndex: 10,
  },
});
