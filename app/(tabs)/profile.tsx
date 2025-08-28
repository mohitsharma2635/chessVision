import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ScrollView, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProfileButton } from '@/components/ProfileButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/context/ThemeContext';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { theme, currentTheme } = useTheme();

  return (
    <ThemedView className="flex-1">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 20,
          paddingHorizontal: 20,
        }}>
        <Animated.View
          entering={FadeIn.delay(200)}
          className="items-center mb-8 mt-4">
          <View className="rounded-full overflow-hidden mb-4">
            <Image
              source={require('@/assets/images/default-avatar.png')}
              style={{ width: 120, height: 120 }}
              contentFit="cover"
            />
          </View>
          <ThemedText type="title">John Doe</ThemedText>
          <ThemedText className="text-gray-500">Chess Enthusiast</ThemedText>
        </Animated.View>

        <View className="mb-8">
          <ProfileButton
            icon="person.fill"
            label="Edit Profile"
            onPress={() => {}}
          />
          <ProfileButton
            icon="gear"
            label="Settings"
            onPress={() => {}}
          />
          <ProfileButton
            icon={currentTheme === 'dark' ? 'moon.fill' : 'sun.max.fill'}
            label={`Theme (${theme === 'system' ? 'System' : theme === 'dark' ? 'Dark' : 'Light'})`}
            onPress={() => router.push('/theme')}
          />
          <ProfileButton
            icon="bell.fill"
            label="Notifications"
            onPress={() => {}}
          />
          <ProfileButton
            icon="questionmark.circle.fill"
            label="Help & Support"
            onPress={() => {}}
          />
        </View>

        <ProfileButton
          icon="rectangle.portrait.and.arrow.right"
          label="Sign Out"
          onPress={() => {}}
          showChevron={false}
        />
      </ScrollView>
    </ThemedView>
  );
}
