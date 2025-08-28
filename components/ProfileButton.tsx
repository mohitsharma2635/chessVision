import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { TouchableOpacity } from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

interface ProfileButtonProps {
  icon: string;
  label: string;
  onPress: () => void;
  showChevron?: boolean;
}

export function ProfileButton({ icon, label, onPress, showChevron = true }: ProfileButtonProps) {
  const theme = useColorScheme() ?? 'light';
  const bgColor = theme === 'light' ? 'bg-white' : 'bg-gray-800';
  const borderColor = theme === 'light' ? 'border-gray-100' : 'border-gray-700';

  return (
    <TouchableOpacity
      onPress={onPress}
      className={`${bgColor} ${borderColor} flex-row items-center p-4 rounded-2xl border mb-3 shadow-sm`}
      style={{
        shadowColor: theme === 'light' ? '#000000' : '#ffffff',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
      }}>
      <IconSymbol
        name={icon as any}
        size={24}
        color={Colors[theme].tint}
        weight="semibold"
      />
      <ThemedText className="flex-1 ml-3">{label}</ThemedText>
      {showChevron && (
        <IconSymbol
          name="chevron.right"
          size={18}
          color={theme === 'light' ? '#C0C0C0' : '#404040'}
          weight="semibold"
        />
      )}
    </TouchableOpacity>
  );
}
