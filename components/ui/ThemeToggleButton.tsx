import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { useThemeContext } from '@/contexts/ThemeContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface ThemeToggleButtonProps {
  size?: number;
}

export function ThemeToggleButton({ size = 46 }: ThemeToggleButtonProps) {
  const { toggleTheme } = useThemeContext();
  const colorScheme = useColorScheme() ?? 'light';
  
  const buttonSize = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };
  
  const iconSize = size * 0.52;
  
  return (
    <TouchableOpacity 
      style={[
        styles.themeToggleButton,
        buttonSize,
        { 
          backgroundColor: colorScheme === 'dark' ? 'rgba(70, 70, 70, 0.7)' : 'rgba(255, 255, 255, 0.7)',
          borderColor: colorScheme === 'dark' ? 'rgba(100, 100, 100, 0.8)' : 'rgba(255, 255, 255, 0.8)'
        }
      ]} 
      onPress={toggleTheme}
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={colorScheme === 'dark' 
          ? ['rgba(50, 50, 50, 0.9)', 'rgba(30, 30, 30, 0.7)'] 
          : ['rgba(255, 255, 255, 0.9)', 'rgba(240, 240, 240, 0.7)']}
        style={[styles.buttonGradient, { borderRadius: size / 2 }]}>
        <Ionicons 
          name={colorScheme === 'dark' ? 'moon' : 'sunny'} 
          size={iconSize} 
          color={Colors[colorScheme].tint} 
        />
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  themeToggleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  }
});