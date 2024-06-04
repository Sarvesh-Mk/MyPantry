import { StatusBar } from 'expo-status-bar';
import { CameraView, useCameraPermissions, onModernBarcodeScanned} from 'expo-camera';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import * as MediaLibrary from 'expo-media-library';

import Button from "./components/Button"

export default function App() {
  const  [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mdeiaPermissionResponse, requestMediaPermission] = MediaLibrary.usePermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [currentBarcode, setBarcode] = useState(null);

  
  if(!cameraPermission) {
    return <View></View>
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Button Label="Allow Camera" onPress={requestCameraPermission} icon={"camera"}/>
      </View>
    );
  }
  

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 1, base64: true, exif: false };
      const photo = await cameraRef.takePictureAsync(options);
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      alert("saved Picture!");
    }
  }

  const barcodeScanned = async (result) => {
    if (result.data != currentBarcode) {
      setBarcode(result.data);
      alert("Barcode Scanned!" + result.data);
    }
  }
  

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing='back' ref={(ref) => setCameraRef(ref)} onBarcodeScanned={barcodeScanned} ></CameraView>
      <View style={styles.footerContainer}>
        <Button Label="Scan Barcode" onPress={takePicture}/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
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
