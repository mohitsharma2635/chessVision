import { useTheme } from '@/context/ThemeContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

export default function BlurTabBarBackground() {
  const { currentTheme } = useTheme();
  return (
    <BlurView
      tint={currentTheme === 'dark' ? 'dark' : 'light'}
      intensity={currentTheme === 'dark' ? 100 : 80}
      style={StyleSheet.absoluteFill}
    />
  );
}

export function useBottomTabOverflow() {
  return useBottomTabBarHeight();
}
