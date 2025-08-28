import { router } from 'expo-router';
import { View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';
import { TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ThemeOption = ({ 
  label, 
  icon, 
  isSelected, 
  onSelect,
  delay
}: { 
  label: string; 
  icon: string; 
  isSelected: boolean; 
  onSelect: () => void;
  delay: number;
}) => {
  const { currentTheme } = useTheme();
  const bgColor = currentTheme === 'light' ? 'bg-white' : 'bg-gray-800';
  const borderColor = isSelected 
    ? currentTheme === 'light' ? 'border-blue-500' : 'border-blue-400'
    : currentTheme === 'light' ? 'border-gray-100' : 'border-gray-700';

  return (
    <AnimatedTouchable
      entering={FadeInDown.delay(delay).springify()}
      onPress={onSelect}
      className={`${bgColor} ${borderColor} flex-row items-center p-4 rounded-2xl border-2 mb-4`}
      style={{
        shadowColor: currentTheme === 'light' ? '#000000' : '#ffffff',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
      }}>
      <View className="w-12 h-12 items-center justify-center">
        <IconSymbol
          name={icon as any}
          size={28}
          color={isSelected ? '#3B82F6' : currentTheme === 'light' ? '#374151' : '#9CA3AF'}
          weight="semibold"
        />
      </View>
      <ThemedText className={`flex-1 ml-3 text-lg ${isSelected ? 'font-semibold' : ''}`}>
        {label}
      </ThemedText>
      {isSelected && (
        <IconSymbol
          name="checkmark.circle.fill"
          size={24}
          color="#3B82F6"
          weight="semibold"
        />
      )}
    </AnimatedTouchable>
  );
};

export default function ThemeScreen() {
  const { theme, setTheme } = useTheme();
  const insets = useSafeAreaInsets();

  const selectTheme = (newTheme: 'system' | 'light' | 'dark') => {
    setTheme(newTheme);
    router.back();
  };

  return (
    <ThemedView 
      className="flex-1" 
      style={{ 
        paddingTop: insets.top + 20,
        paddingBottom: insets.bottom + 20,
        paddingHorizontal: 20,
      }}>
      <View className="flex-row items-center mb-8">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 items-center justify-center rounded-full">
          <IconSymbol name="chevron.left" size={24} color={theme === 'light' ? '#374151' : '#9CA3AF'} />
        </TouchableOpacity>
        <ThemedText type="title" className="flex-1 ml-2">Choose Theme</ThemedText>
      </View>

      <ThemeOption
        label="System"
        icon="iphone"
        isSelected={theme === 'system'}
        onSelect={() => selectTheme('system')}
        delay={200}
      />
      <ThemeOption
        label="Light"
        icon="sun.max.fill"
        isSelected={theme === 'light'}
        onSelect={() => selectTheme('light')}
        delay={300}
      />
      <ThemeOption
        label="Dark"
        icon="moon.fill"
        isSelected={theme === 'dark'}
        onSelect={() => selectTheme('dark')}
        delay={400}
      />
    </ThemedView>
  );
}
