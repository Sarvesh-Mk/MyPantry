import { CameraView } from "expo-camera";
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function cameraPage() {
  const [cameraRef, setCameraRef] = useState(null);
  const [isScanning, setScanning] = useState(false);

  const barcodeScanned = async (result) => {
    if (!isScanning) {
      setScanning(true);
      try {
        const strResult = JSON.stringify(result.data);
        const value = await AsyncStorage.getItem(strResult);
        if (value !== null) {
          await AsyncStorage.setItem(strResult, JSON.stringify(parseInt(value)+1));
        } else {
          await AsyncStorage.setItem(strResult, JSON.stringify(1));
        }
      } catch (e) {
        // error reading value
      }
    }
    setScanning(false);
  }
  
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing='back' ref={(ref) => setCameraRef(ref)} onBarcodeScanned={barcodeScanned} ></CameraView>
      <Link push href="/">Home</Link>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: 320,
    height: 440,
  },
  footerContainer: {
    flex: 1 / 2,
    alignItems: 'center',
    justifyContent: "space-evenly",
  }
});