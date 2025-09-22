import { router } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

export default function WelcomeScreen() {
  const { currentTheme } = useTheme();
  const { login } = useAuth();

  const handleDeveloperLogin = async () => {
    try {
      // Clear any existing user data first
      await AsyncStorage.removeItem('user');
      
      const success = await login('admin', '123qwe');
      
      if (success) {
        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Developer login error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <View style={[styles.logoContainer, { backgroundColor: Colors[currentTheme].tint }]}>
            <Text style={styles.logoText}>♔</Text>
          </View>
          <ThemedText style={styles.appName}>ChessVision</ThemedText>
          <ThemedText style={styles.tagline}>
            Digitize real chess positions with a photo
          </ThemedText>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonSection}>
          <TouchableOpacity
            style={[styles.primaryButton, { backgroundColor: Colors[currentTheme].tint }]}
            onPress={() => router.push('/auth/signup')}
          >
            <Text style={styles.primaryButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.secondaryButton, { borderColor: Colors[currentTheme].tint }]}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={[styles.secondaryButtonText, { color: Colors[currentTheme].tint }]}>
              Login
            </Text>
          </TouchableOpacity>

          {/* Developer Login Button */}
          <TouchableOpacity
            style={[styles.developerButton, { borderColor: '#ff6b6b' }]}
            onPress={handleDeveloperLogin}
          >
            <Text style={[styles.developerButtonText, { color: '#ff6b6b' }]}>
              🔧 Developer Login (Direct)
            </Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
  },
  logoSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logoText: {
    fontSize: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonSection: {
    paddingBottom: 40,
    gap: 16,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 52,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    minHeight: 52,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  developerButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    marginTop: 8,
    minHeight: 48,
  },
  developerButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
