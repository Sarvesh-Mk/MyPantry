import { StatusBar } from 'expo-status-bar';
import { useCameraPermissions} from 'expo-camera';
import { StyleSheet, Text, View, Pressable} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navbar from '../components/navbar';

export default function App() {
  const  [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const router = useRouter();
  const [query, setQuery] = useState('celcius');
  const [results, setResults] = useState([]);

  if(!cameraPermission) {
    return <View></View>
  }

  const searchProducts = () => {
    axios.get(`https://world.openfoodfacts.org/cgi/search.pl`, {
      params: {
        search_terms: query,
        search_simple: 1,
        action: 'process',
        json: 1,
      }
    })
    .then(response => {
      setResults(response.data.products);
    })
    .catch(error => {
      console.error(error);
    });
  };

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Pressable
          style={{width: '75%', paddingHorizontal: 20, alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
          onPress={() => requestCameraPermission}
        >
        <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>Allow Camera</Text>  
        </Pressable>
      </View>
    );
  }
  
  return (
    <View style={{height: '100%', alignItems: 'center'}}>
      <View style={styles.container}>
        <Text style={{fontSize: 50, width: 300, height: 100, paddingBottom: 200, textAlign: 'center'}}>Welcome to Your Pantry!</Text>
        <View style={styles.footerContainer}>
          <Pressable
            style={{width: '75%', paddingHorizontal: 20, alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
            onPress={searchProducts}
          >
          <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>search</Text>  
          </Pressable>
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
