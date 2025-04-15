/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

// Glassmorphic theme colors
const pinkColor = '#FF80AB';
const skyBlueColor = '#81D4FA';
const whiteSmokeColor = '#F5F5F5';
const glassBgLight = 'rgba(255, 255, 255, 0.25)';
const glassBgDark = 'rgba(40, 40, 40, 0.25)';
const glassBorderLight = 'rgba(255, 255, 255, 0.5)';
const glassBorderDark = 'rgba(255, 255, 255, 0.1)';

export const Colors = {
  light: {
    text: '#11181C',
    background: whiteSmokeColor,
    tint: pinkColor,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: pinkColor,
    // Glassmorphic theme colors
    pink: pinkColor,
    skyBlue: skyBlueColor,
    whiteSmoke: whiteSmokeColor,
    glassBg: glassBgLight,
    glassBorder: glassBorderLight,
    primary: pinkColor,
    secondary: skyBlueColor,
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
