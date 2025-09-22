import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Alert, ScrollView, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ProfileButton } from '@/components/ProfileButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { theme, currentTheme } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              router.replace('/auth/welcome');
            } catch (error) {
              console.error('Logout error:', error);
            }
          },
        },
      ]
    );
  };

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
          <ThemedText type="title">{user?.fullName || 'User'}</ThemedText>
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
          onPress={handleLogout}
          showChevron={false}
          style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: currentTheme === 'dark' ? '#333' : '#e5e5e5', paddingTop: 20 }}
        />
      </ScrollView>
    </ThemedView>
  );
}
