import { ScrollView, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { MenuButton } from '@/components/MenuButton';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useUser } from '@/context/UserContext';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { userName } = useUser();

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
          className="mb-6 mt-4">
          <ThemedText type="title">Hi {userName}! 👋</ThemedText>
          <ThemedText className="mt-2 text-gray-500">Ready to improve your chess game?</ThemedText>
        </Animated.View>

        <View className="flex-row gap-4 mb-4">
          <MenuButton
            icon="brain.head.profile"
            label="Learn"
            onPress={() => {}}
            delay={400}
          />
          <MenuButton
            icon="camera.viewfinder"
            label="Scan Board"
            onPress={() => {}}
            delay={500}
          />
        </View>

        <View className="flex-row gap-4 mb-4">
          <MenuButton
            icon="gamecontroller.fill"
            label="Play"
            onPress={() => {}}
            delay={600}
          />
          <MenuButton
            icon="trophy.fill"
            label="Leaderboard"
            onPress={() => {}}
            delay={700}
          />
        </View>

        <View className="flex-row gap-4">
          <MenuButton
            icon="flame.fill"
            label="Challenges"
            onPress={() => {}}
            delay={800}
          />
        </View>
      </ScrollView>
    </ThemedView>
  );
}


