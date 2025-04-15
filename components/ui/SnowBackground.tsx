import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  Easing,
  interpolate,
  withDelay,
  cancelAnimation,
  withSequence,
} from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';
import { useColorScheme } from '@/hooks/useColorScheme';

// Snowflake component with randomized properties
const Snowflake = ({ 
  x, 
  y, 
  size, 
  opacity, 
  delay, 
  duration, 
  colorScheme 
}: { 
  x: number; 
  y: number; 
  size: number; 
  opacity: number; 
  delay: number; 
  duration: number; 
  colorScheme: string;
}) => {
  const translateY = useSharedValue(y);
  const translateX = useSharedValue(x);
  const scale = useSharedValue(1);
  const fadeOpacity = useSharedValue(0);

  useEffect(() => {
    // Initial fade in
    fadeOpacity.value = withDelay(
      delay,
      withTiming(opacity, { duration: 1000, easing: Easing.out(Easing.ease) })
    );

    // Continuous falling animation
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(Dimensions.get('window').height + 100, { 
          duration, 
          easing: Easing.linear 
        }),
        -1, // Infinite
        false
      )
    );

    // Gentle horizontal sway
    translateX.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(x - 30, { duration: duration / 3, easing: Easing.inOut(Easing.ease) }),
          withTiming(x + 30, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
          withTiming(x, { duration: duration / 3, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );

    // Subtle size pulsing
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(0.8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
          withTiming(1.2, { duration: 2000, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        true
      )
    );

    return () => {
      cancelAnimation(translateY);
      cancelAnimation(translateX);
      cancelAnimation(scale);
      cancelAnimation(fadeOpacity);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: translateY.value },
        { translateX: translateX.value },
        { scale: scale.value },
      ],
      opacity: fadeOpacity.value,
    };
  });

  // Determine snowflake color based on theme - make it more visible
  const snowColor = colorScheme === 'dark'
    ? 'rgba(255, 255, 255, 0.65)'  // Brighter white in dark mode
    : 'rgba(200, 200, 255, 0.75)'; // Brighter blue tint in light mode

  return (
    <Animated.View style={[styles.snowflakeContainer, animatedStyle]}>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2}
          fill={snowColor}
        />
      </Svg>
    </Animated.View>
  );
};

interface SnowBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
}

export function SnowBackground({ intensity = 'medium' }: SnowBackgroundProps) {
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'light';
  const [snowflakes, setSnowflakes] = useState<React.ReactNode[]>([]);
  
  // Determine number of snowflakes based on intensity
  const getFlakeCount = () => {
    switch (intensity) {
      case 'low': return Math.floor(width / 40); // Fewer snowflakes
      case 'high': return Math.floor(width / 12); // Many snowflakes
      default: return Math.floor(width / 25); // Medium density
    }
  };

  useEffect(() => {
    // Create snowflakes with randomized properties
    const flakeCount = getFlakeCount();
    const newSnowflakes: React.ReactNode[] = [];

    for (let i = 0; i < flakeCount; i++) {
      const size = Math.random() * 6 + 3; // Increased size between 3 and 9
      const x = Math.random() * width;
      const y = Math.random() * -height; // Start above screen
      const opacity = Math.random() * 0.5 + 0.4; // Higher base opacity
      const delay = Math.random() * 5000; // Random delay for staggered animation
      const duration = Math.random() * 15000 + 10000; // Random duration between 10-25s
      
      newSnowflakes.push(
        <Snowflake
          key={`snowflake-${i}`}
          x={x}
          y={y}
          size={size}
          opacity={opacity}
          delay={delay}
          duration={duration}
          colorScheme={colorScheme}
        />
      );
    }
    
    setSnowflakes(newSnowflakes);
    
    // Recreate snowflakes when dimensions change
    const handleDimensionsChange = () => {
      setSnowflakes([]);
      setTimeout(() => setSnowflakes(newSnowflakes), 100);
    };
    
    Dimensions.addEventListener('change', handleDimensionsChange);
    
    return () => {
      // This cleanup approach is simplified for this example
      // In a real implementation, you might need a different cleanup approach for Dimensions listeners
    };
  }, [width, height, intensity, colorScheme]);

  return (
    <View style={[styles.container, { width, height }]} pointerEvents="none">
      {snowflakes}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1, // Changed from -1 to 1 to make it visible above the background but below content
    overflow: 'hidden',
  },
  snowflakeContainer: {
    position: 'absolute',
  },
});