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
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignUpScreen() {
  const { currentTheme } = useTheme();
  const { signup } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

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
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const success = await signup(formData.fullName, formData.email, formData.password);
      
      if (success) {
        router.replace('/(tabs)');
      } else {
        Alert.alert('Error', 'Failed to create account. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            <ThemedText style={styles.title}>Create Account</ThemedText>
            <ThemedText style={styles.subtitle}>
              Join ChessVision to start digitizing chess positions
            </ThemedText>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Full Name */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Full Name</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: currentTheme === 'dark' ? '#333' : '#f5f5f5',
                    color: currentTheme === 'dark' ? '#fff' : '#000',
                    borderColor: errors.fullName ? '#ff4444' : currentTheme === 'dark' ? '#555' : 'transparent',
                  }
                ]}
                placeholder="Enter your full name"
                placeholderTextColor={currentTheme === 'dark' ? '#888' : '#666'}
                value={formData.fullName}
                onChangeText={(value) => handleInputChange('fullName', value)}
                autoCapitalize="words"
              />
              {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
            </View>

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
                placeholder="Create a password"
                placeholderTextColor={currentTheme === 'dark' ? '#888' : '#666'}
                value={formData.password}
                onChangeText={(value) => handleInputChange('password', value)}
                secureTextEntry
              />
              {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
            </View>

            {/* Confirm Password */}
            <View style={styles.inputGroup}>
              <ThemedText style={styles.label}>Confirm Password</ThemedText>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: currentTheme === 'dark' ? '#333' : '#f5f5f5',
                    color: currentTheme === 'dark' ? '#fff' : '#000',
                    borderColor: errors.confirmPassword ? '#ff4444' : currentTheme === 'dark' ? '#555' : 'transparent',
                  }
                ]}
                placeholder="Confirm your password"
                placeholderTextColor={currentTheme === 'dark' ? '#888' : '#666'}
                value={formData.confirmPassword}
                onChangeText={(value) => handleInputChange('confirmPassword', value)}
                secureTextEntry
              />
              {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            </View>

            {/* Social Sign Up Options */}
            <View style={styles.socialSection}>
              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: currentTheme === 'dark' ? '#444' : '#ddd' }]} />
                <ThemedText style={styles.dividerText}>or</ThemedText>
                <View style={[styles.dividerLine, { backgroundColor: currentTheme === 'dark' ? '#444' : '#ddd' }]} />
              </View>

              <TouchableOpacity style={[styles.socialButton, { borderColor: currentTheme === 'dark' ? '#444' : '#ddd' }]}>
                <Text style={[styles.socialButtonText, { color: currentTheme === 'dark' ? '#fff' : '#000' }]}>
                  Sign up with Google
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.socialButton, { borderColor: currentTheme === 'dark' ? '#444' : '#ddd' }]}>
                <Text style={[styles.socialButtonText, { color: currentTheme === 'dark' ? '#fff' : '#000' }]}>
                  Sign up with Apple
                </Text>
              </TouchableOpacity>
            </View>

            {/* Sign Up Button */}
            <TouchableOpacity
              style={[
                styles.signUpButton,
                {
                  backgroundColor: Colors[currentTheme].tint,
                  opacity: isLoading ? 0.7 : 1,
                }
              ]}
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text style={[styles.signUpButtonText, { color: '#fff' }]}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>

            {/* Login Link */}
            <View style={styles.loginLink}>
              <ThemedText style={styles.loginLinkText}>
                Already have an account?{' '}
              </ThemedText>
              <TouchableOpacity onPress={() => router.push('/auth/login')}>
                <Text style={[styles.loginLinkButton, { color: Colors[currentTheme].tint }]}>
                  Login
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
  signUpButton: {
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
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32,
  },
  loginLinkText: {
    fontSize: 16,
  },
  loginLinkButton: {
    fontSize: 16,
    fontWeight: '600',
  },
});
