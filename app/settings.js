import { StyleSheet, View, Text, Modal} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button";
import Navbar from '../components/navbar';

export default function Settings() {
  const router = useRouter();
  const [isClear, setIsClear] = useState(false);

  const clearList = async () => {
    if(await AsyncStorage.getAllKeys() != null) {
      AsyncStorage.multiRemove(await AsyncStorage.getAllKeys())
    }; 
    setIsClear(false);
  } 

  return (
    <View style={{height: 775, alignItems: 'center'}}>
      <View style={styles.container}>
        <Text style={{fontSize: 40, textAlign: 'center', width: 300, height: 200}}>
          Settings
        </Text>
        <View style={styles.footerContainer}>
          <Button Label="Clear list" onPress={() => {setIsClear(true)}}/>
        </View>
        
        <Modal animationType="slide" transparent={false} visible={isClear}>
          <View style={styles.container}>
            <Text style={{fontSize: 40, textAlign: 'center', width: 300, height: 200}}>
              Are you sure you want to clear the list?
            </Text>
            <View style={styles.footerContainer}>
              <Button Label="Yes" onPress={clearList}/>
              <Button Label="no" onPress={() => {setIsClear(false)}}/>
            </View>
          </View>
        </Modal>
      </View>
      <Navbar />
    </View>
    
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    height: 390,
  },
  footerContainer: {
    flex: 1 / 2,
    alignItems: 'center',
    justifyContent: "space-evenly",
  }
});