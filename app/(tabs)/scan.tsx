import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/context/ThemeContext';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function ScanBoardScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const insets = useSafeAreaInsets();
  const { currentTheme } = useTheme();

  useEffect(() => {
    if (permission && !permission.granted && !permission.canAskAgain) {
      Alert.alert(
        'Camera Permission Required',
        'Please enable camera permission in your device settings to scan chess boards.',
        [{ text: 'OK' }]
      );
    }
  }, [permission]);

  if (!permission) {
    // Camera permissions are still loading
    return (
      <ThemedView className="flex-1 items-center justify-center">
        <ThemedText>Loading camera...</ThemedText>
      </ThemedView>
    );
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <ThemedView className="flex-1 items-center justify-center p-6">
        <View style={{ marginBottom: 24 }}>
          <IconSymbol 
            name="camera.fill" 
            size={80} 
            color={currentTheme === 'dark' ? '#ffffff' : '#000000'} 
          />
        </View>
        <ThemedText type="title" className="text-center mb-4">
          Camera Access Required
        </ThemedText>
        <ThemedText className="text-center mb-8 text-gray-500">
          ChessVision needs camera access to scan chess boards and analyze positions.
        </ThemedText>
        <TouchableOpacity
          style={[
            styles.permissionButton,
            { backgroundColor: currentTheme === 'dark' ? '#007AFF' : '#007AFF' }
          ]}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </ThemedView>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const capturePhoto = async () => {
    if (!cameraRef.current || isScanning) return;
    
    try {
      setIsScanning(true);
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      
      // Here you would typically process the image for chess board detection
      Alert.alert(
        'Photo Captured!',
        'Chess board analysis will be implemented here. Photo saved to: ' + photo.uri,
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to capture photo. Please try again.');
      console.error('Camera capture error:', error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <ThemedView className="flex-1">
      <CameraView 
        ref={cameraRef}
        style={styles.camera} 
        facing={facing}
        ratio="16:9"
      >
        {/* Header with safe area */}
        <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
          <ThemedText type="title" style={styles.headerText}>
            Scan Chess Board
          </ThemedText>
          <ThemedText style={styles.instructionText}>
            Position the chess board within the frame
          </ThemedText>
        </View>

        {/* Scanning overlay */}
        <View style={styles.overlay}>
          <View style={styles.scanFrame}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
          </View>
        </View>

        {/* Bottom controls */}
        <View style={[styles.controls, { paddingBottom: insets.bottom + 20 }]}>
          <TouchableOpacity 
            style={styles.controlButton} 
            onPress={toggleCameraFacing}
          >
            <IconSymbol name="camera.rotate.fill" size={24} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.captureButton, isScanning && styles.captureButtonDisabled]}
            onPress={capturePhoto}
            disabled={isScanning}
          >
            <View style={styles.captureButtonInner}>
              {isScanning ? (
                <ThemedText style={styles.scanningText}>Scanning...</ThemedText>
              ) : (
                <IconSymbol name="camera.fill" size={32} color="#000000" />
              )}
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.controlButton}>
            <IconSymbol name="photo.fill" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </CameraView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructionText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
    opacity: 0.9,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: width * 0.8,
    height: width * 0.8,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#ffffff',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  controls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 40,
    paddingTop: 30,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  captureButtonDisabled: {
    opacity: 0.6,
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanningText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  permissionButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
