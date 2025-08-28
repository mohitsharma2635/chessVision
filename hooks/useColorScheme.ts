import { useTheme } from '@/context/ThemeContext';

export function useColorScheme() {
  const { currentTheme } = useTheme();
  return currentTheme;
}
