import { StatusBar } from 'expo-status-bar';
import { CameraView, useCameraPermissions, takePictureAsync } from 'expo-camera';
import { StyleSheet, Text, View } from 'react-native';

import Button from "./components/Button"

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

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

  const takeImageAsync = async () => {
    takePictureAsync();
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing='back'></CameraView>
      <View style={styles.footerContainer}>
        <Button Label="take a photo" onPress={takeImageAsync}/>
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
