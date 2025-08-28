import { Text, type TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  const getTypeClasses = () => {
    switch (type) {
      case 'default':
        return 'text-base leading-6';
      case 'title':
        return 'text-3xl font-bold leading-8';
      case 'defaultSemiBold':
        return 'text-base leading-6 font-semibold';
      case 'subtitle':
        return 'text-xl font-bold';
      case 'link':
        return 'leading-[30px] text-base text-[#0a7ea4]';
      default:
        return '';
    }
  };

  return (
    <Text
      style={[{ color }, style]}
      className={twMerge(getTypeClasses())}
      {...rest}
    />
  );
}


