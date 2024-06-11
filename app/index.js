import { StatusBar } from 'expo-status-bar';
import { useCameraPermissions} from 'expo-camera';
import { StyleSheet, Text, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button"
import Navbar from '../components/navbar';

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
    <View style={{height: 775, alignItems: 'center'}}>
      <View style={styles.container}>
        <Text style={{fontSize: 50, width: 300, height: 100, paddingBottom: 200, textAlign: 'center'}}>Welcome to Your Pantry!</Text>
        <View style={styles.footerContainer}>
        </View>
        <StatusBar style="auto" />
      </View>
      <Navbar />
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
