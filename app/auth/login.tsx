import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function LoginScreen() {
  const { currentTheme } = useTheme();
  const { login } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'Invalid email or password. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Password reset functionality would be implemented here. For now, please contact support.',
      [{ text: 'OK' }]
    );
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ThemedView style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => router.back()}
            >
              <Text style={[styles.backButtonText, { color: Colors[currentTheme].tint }]}>
                ← Back
              </Text>
            </TouchableOpacity>
            <ThemedText style={styles.title}>Welcome Back</ThemedText>
            <ThemedText style={styles.subtitle}>
              Sign in to continue using ChessVision
            </ThemedText>
            
            {/* Developer Hint */}
            <View style={[styles.developerHint, { backgroundColor: currentTheme === 'dark' ? '#2a2a2a' : '#f0f0f0' }]}>
              <ThemedText style={styles.developerHintText}>
                🔧 Developer: admin / 123qwe
              </ThemedText>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Email</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: currentTheme === 'dark' ? '#333' : '#f5f5f5',
                    color: currentTheme === 'dark' ? '#fff' : '#000',
                    borderColor: errors.email ? '#ff4444' : currentTheme === 'dark' ? '#555' : 'transparent',
                  }
                ]}
                placeholder="Enter your email"
                placeholderTextColor={currentTheme === 'dark' ? '#888' : '#666'}
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Password */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Password</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: currentTheme === 'dark' ? '#333' : '#f5f5f5',
                    color: currentTheme === 'dark' ? '#fff' : '#000',
                    borderColor: errors.password ? '#ff4444' : currentTheme === 'dark' ? '#555' : 'transparent',
                  }
                ]}
                placeholder="Enter your password"
                placeholderTextColor={currentTheme === 'dark' ? '#888' : '#666'}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
                autoComplete="password"
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            {/* Forgot Password */}
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={handleForgotPassword}
            >
              <Text style={[styles.forgotPasswordText, { color: Colors[currentTheme].tint }]}>
                Forgot Password?
              </Text>
            </TouchableOpacity>

            {/* Social Login Options */}
            <View style={styles.socialSection}>
              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: currentTheme === 'dark' ? '#444' : '#ddd' }]} />
                <ThemedText style={styles.dividerText}>or</ThemedText>
                <View style={[styles.dividerLine, { backgroundColor: currentTheme === 'dark' ? '#444' : '#ddd' }]} />
              </View>

              <TouchableOpacity style={[styles.socialButton, { borderColor: currentTheme === 'dark' ? '#444' : '#ddd' }]}>
                <Text style={[styles.socialButtonText, { color: currentTheme === 'dark' ? '#fff' : '#000' }]}>
                  Sign in with Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.socialButton, { borderColor: currentTheme === 'dark' ? '#444' : '#ddd' }]}>
                <Text style={[styles.socialButtonText, { color: currentTheme === 'dark' ? '#fff' : '#000' }]}>
                  Sign in with Apple
                </Text>
              </TouchableOpacity>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={[
                styles.loginButton,
                {
                  backgroundColor: Colors[currentTheme].tint,
                  opacity: isLoading ? 0.7 : 1,
                }
              ]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <Text style={[styles.loginButtonText, { color: '#fff' }]}>
                {isLoading ? 'Signing In...' : 'Sign In'}
              </Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={styles.signUpLink}>
              <ThemedText style={styles.signUpLinkText}>
                Don't have an account?{' '}
              </ThemedText>
              <TouchableOpacity onPress={() => router.push('/auth/signup')}>
                <Text style={[styles.signUpLinkButton, { color: Colors[currentTheme].tint }]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.7,
    lineHeight: 24,
  },
  developerHint: {
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  developerHintText: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.8,
  },
  form: {
    paddingHorizontal: 24,
    gap: 20,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 16,
    borderWidth: 2,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 14,
    marginTop: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: -8,
  },
  forgotPasswordText: {
    fontSize: 14,
    fontWeight: '500',
  },
  socialSection: {
    marginTop: 8,
    gap: 12,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 16,
    fontSize: 14,
    opacity: 0.6,
  },
  socialButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  loginButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
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
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  signUpLinkText: {
    fontSize: 16,
  },
  signUpLinkButton: {
    fontSize: 16,
    fontWeight: '600',
  },
});
