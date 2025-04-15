/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

// Glassmorphic theme colors with improved light theme visibility
const pinkColor = '#FF80AB';
const skyBlueColor = '#81D4FA';
const whiteSmokeColor = '#F5F5F5';
const glassBgLight = 'rgba(255, 255, 255, 0.45)';  // Increased opacity for light mode
const glassBgDark = 'rgba(40, 40, 40, 0.25)';
const glassBorderLight = 'rgba(180, 180, 180, 0.8)'; // Darker borders for light mode
const glassBorderDark = 'rgba(255, 255, 255, 0.1)';

export const Colors = {
  light: {
    text: '#11181C',
    background: whiteSmokeColor,
    tint: '#E91E63',  // Changed to a stronger pink for better contrast in light mode
    icon: '#555555',  // Darker icon color for better visibility
    tabIconDefault: '#555555',
    tabIconSelected: '#E91E63',
    // Glassmorphic theme colors
    pink: '#FF4081',  // Slightly darker pink for light mode
    skyBlue: '#29B6F6',  // Slightly darker blue for light mode
    whiteSmoke: whiteSmokeColor,
    glassBg: glassBgLight,
    glassBorder: glassBorderLight,
    primary: '#E91E63',
    secondary: '#29B6F6',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    // Glassmorphic theme colors
    pink: pinkColor,
    skyBlue: skyBlueColor,
    whiteSmoke: whiteSmokeColor,
    glassBg: glassBgDark,
    glassBorder: glassBorderDark,
    primary: pinkColor,
    secondary: skyBlueColor,
  },
};
