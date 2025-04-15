import { useEffect, useState } from 'react';
import { useThemeContext } from '@/contexts/ThemeContext';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const { theme } = useThemeContext();
  return theme;
}
