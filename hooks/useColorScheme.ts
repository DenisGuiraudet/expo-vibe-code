import { useThemeContext } from '@/contexts/ThemeContext';

export function useColorScheme() {
  const { theme } = useThemeContext();
  return theme;
}
