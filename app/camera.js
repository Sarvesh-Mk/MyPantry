import { CameraView } from "expo-camera";
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';

export default function Page() {
  const [cameraRef, setCameraRef] = useState(null);
  var currentBarcode = 0;

  const barcodeScanned = async (result) => {
    if (result.data != currentBarcode) {
      currentBarcode = result.data;
      console.log(currentBarcode)
    }
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