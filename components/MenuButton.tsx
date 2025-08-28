import { useTheme } from '@/context/ThemeContext';
import { useThemeColor } from '@/hooks/useThemeColor';
import { TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface MenuButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
  delay?: number;
}

export function MenuButton({ icon, label, onPress, delay = 0 }: MenuButtonProps) {
  const { currentTheme } = useTheme();
  const tintColor = useThemeColor({}, 'tint');
  const bgColor = currentTheme === 'light' ? 'bg-white' : 'bg-gray-800';
  const borderColor = currentTheme === 'light' ? 'border-gray-100' : 'border-gray-700';

  return (
    <AnimatedTouchable
      entering={FadeInDown.delay(delay).springify()}
      onPress={onPress}
      className={`${bgColor} ${borderColor} flex-1 aspect-square rounded-3xl p-6 items-center justify-center border shadow-sm`}
      style={{
        shadowColor: currentTheme === 'light' ? '#000000' : '#ffffff',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 5,
      }}>
      <IconSymbol
        name={icon as any}
        size={40}
        color={tintColor}
        weight="semibold"
      />
      <ThemedText className="mt-3 text-center font-semibold">{label}</ThemedText>
    </AnimatedTouchable>
  );
}
