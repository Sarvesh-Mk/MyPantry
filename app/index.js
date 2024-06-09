import { StatusBar } from 'expo-status-bar';
import { useCameraPermissions} from 'expo-camera';
import { StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button"

export default function App() {
  const  [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const router = useRouter();

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
         <Button Label="Settings" onPress={async () => {router.replace('/settings')}} icon={"cog"}/>
        <Button Label="Scan Barcode" onPress={async () => {router.replace('/camera')}} icon={"camera"}/>
        <Button Label="go to list" onPress={async () => {router.replace('/list')}} icon={"list"}/>
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
