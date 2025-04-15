import React from 'react';
import { View, StyleSheet, ImageBackground, useWindowDimensions } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

interface SnowTextureBackgroundProps {
  intensity?: 'low' | 'medium' | 'high';
}

export function SnowTextureBackground({ intensity = 'medium' }: SnowTextureBackgroundProps) {
  const { width, height } = useWindowDimensions();
  const colorScheme = useColorScheme() ?? 'light';
  
  // Get a semi-transparent overlay color based on theme and intensity
  const getOverlayColor = () => {
    if (colorScheme === 'dark') {
      // Dark theme overlay - slightly blue-tinted dark
      return intensity === 'high' 
        ? 'rgba(15, 20, 30, 0.4)' 
        : intensity === 'medium'
          ? 'rgba(15, 20, 30, 0.6)'
          : 'rgba(15, 20, 30, 0.7)';
    } else {
      // Light theme overlay - very faint blue tint
      return intensity === 'high'
        ? 'rgba(235, 240, 250, 0.25)'
        : intensity === 'medium'
          ? 'rgba(235, 240, 250, 0.4)'
          : 'rgba(235, 240, 250, 0.5)';
    }
  };

  // Use PNG instead of JPG to avoid the file type error
  return (
    <View style={[styles.container, { width, height, zIndex: 1 }]}>
      <ImageBackground 
        source={require('@/assets/images/textures/snow-texture.png')} 
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={[
          styles.overlay, 
          { backgroundColor: getOverlayColor() }
        ]} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
  }
});