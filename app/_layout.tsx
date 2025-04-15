import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { View, StyleSheet } from 'react-native';

import { ThemeProvider } from '@/contexts/ThemeContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { ThemedView } from '@/components/ThemedView';

// Custom hook to wrap our new ThemeContext
function CustomThemeNavigationProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeContext();
  
  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={styles.rootContainer}>
        {/* App content container with transparent background */}
        <ThemedView style={styles.container} transparent>
          <View style={styles.contentContainer}>
            {children}
          </View>
        </ThemedView>
      </View>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </NavigationThemeProvider>
  );
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider>
      <CustomThemeNavigationProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </CustomThemeNavigationProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    position: 'relative',
    backgroundColor: 'transparent',
  },
});
