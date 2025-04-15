import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme as useNativeColorScheme } from 'react-native';
import { ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const THEME_STORAGE_KEY = 'user-theme-preference';
const IS_SYSTEM_DEFAULT_KEY = 'is-system-default';

type ThemeContextType = {
  theme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
  toggleTheme: () => void;
  isSystemDefault: boolean;
  setIsSystemDefault: (value: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const systemColorScheme = useNativeColorScheme();
  const [theme, setThemeState] = useState<ColorSchemeName>(systemColorScheme);
  const [isSystemDefault, setIsSystemDefaultState] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load saved theme preferences when component mounts
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        const storedIsSystemDefault = await AsyncStorage.getItem(IS_SYSTEM_DEFAULT_KEY);
        
        if (storedIsSystemDefault !== null) {
          const isDefault = storedIsSystemDefault === 'true';
          setIsSystemDefaultState(isDefault);
          
          if (isDefault) {
            setThemeState(systemColorScheme);
          } else if (storedTheme !== null) {
            setThemeState(storedTheme as ColorSchemeName);
          }
        }
      } catch (error) {
        console.error('Failed to load theme preferences:', error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadThemePreference();
  }, [systemColorScheme]);

  // Update theme when system theme changes if following system default
  useEffect(() => {
    if (isSystemDefault && isInitialized) {
      setThemeState(systemColorScheme);
    }
  }, [systemColorScheme, isSystemDefault, isInitialized]);

  // Helper function to save theme preference
  const saveThemePreference = async (newTheme: ColorSchemeName, isDefault: boolean) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme as string);
      await AsyncStorage.setItem(IS_SYSTEM_DEFAULT_KEY, isDefault.toString());
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  // Setter with persistence
  const setTheme = (newTheme: ColorSchemeName) => {
    setThemeState(newTheme);
    saveThemePreference(newTheme, isSystemDefault);
  };

  // System default setter with persistence
  const setIsSystemDefault = (value: boolean) => {
    setIsSystemDefaultState(value);
    saveThemePreference(value ? systemColorScheme : theme, value);
  };

  // Toggle theme and save preference
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeState(newTheme);
    setIsSystemDefaultState(false);
    saveThemePreference(newTheme, false);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      setTheme, 
      toggleTheme, 
      isSystemDefault, 
      setIsSystemDefault 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}