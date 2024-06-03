import { StatusBar } from 'expo-status-bar';
import { CameraView, Camera, useCameraPermissions} from 'expo-camera';
import { StyleSheet, Text, View } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

import Button from "./components/Button"
import { useState, useRef } from 'react';

export default function App() {
  const  [permission, requestPermission] =  useCameraPermissions();
  const [permissionResponse, requestMediaPermission] = MediaLibrary.usePermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [photo, setPhoto] = useState(null);

  
  if(!permission) {
    return <View></View>
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Button Label="Allow Camera" onPress={requestPermission} icon={"camera"}/>
      </View>
    );
  }
  

  const takePicture = async () => {
    if (cameraRef) {
      const options = { quality: 1, base64: true, exif: false };
      const photo = await cameraRef.takePictureAsync(options);
      setPhoto(photo);
      await MediaLibrary.saveToLibraryAsync(photo.uri);
      alert("saved Picture!");
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing='back' ref={(ref) => setCameraRef(ref)} ></CameraView>
      <View style={styles.footerContainer}>
        <Button Label="take a photo" onPress={takePicture}/>
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
