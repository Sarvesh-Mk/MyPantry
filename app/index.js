import { StatusBar } from 'expo-status-bar';
import { useCameraPermissions} from 'expo-camera';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';

import Button from "../components/Button"

export default function App() {
  const  [cameraPermission, requestCameraPermission] = useCameraPermissions();

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
  
  return (
    <View style={styles.container}>
      <View style={styles.footerContainer}>
        <Link push href="/camera">Scan Barcode</Link>
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
  footerContainer: {
    flex: 1 / 2,
    alignItems: 'center',
    justifyContent: "space-evenly",
  }
});
