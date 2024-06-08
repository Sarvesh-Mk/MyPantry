import { CameraView } from "expo-camera";
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button";
import editItemModal from "../components/editItem";

export default function cameraPage() {
  const [cameraRef, setCameraRef] = useState(null);
  const [isScanning, setScanning] = useState(false);
  const router = useRouter();
  
  const barcodeScanned = async (result) => {
    if (!isScanning && result.type != 'qr') {
      setScanning(true);
      try {
        const value = await AsyncStorage.getItem(result.data);
        if (value !== null) {
          await AsyncStorage.setItem(result.data, JSON.stringify(parseInt(value)+1));
        } else {
          await AsyncStorage.setItem(result.data, JSON.stringify(1));
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
      <View style={styles.footerContainer}>
        <Button Label="Go Home" onPress={async () => {router.replace('/')}} icon={"home"}/>
        <Button Label="check list" onPress={async () => {router.replace('/list')}} icon={"list"}/>
      </View>
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
    width: 340,
    height: 540, 
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-evenly",
  }
});