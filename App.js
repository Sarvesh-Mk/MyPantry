import { StatusBar } from 'expo-status-bar';
import { CameraView, useCameraPermissions} from 'expo-camera';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import * as MediaLibrary from 'expo-media-library';

import Button from "./components/Button"

export default function App() {
  const  [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mdeiaPermissionResponse, requestMediaPermission] = MediaLibrary.usePermissions();
  const [cameraRef, setCameraRef] = useState(null);
  var currentBarcode = 0;

  
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
      currentBarcode = result.data;
      console.log(currentBarcode)
    }
  }
  
  return (
    <View style={styles.container}>
      <Link push href="/components/Camera">About</Link>
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
