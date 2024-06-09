import { StyleSheet, View, Text, Modal} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button";

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
    <View style={styles.container}>
      <Button Label="Go Home" onPress={() => {router.replace('/')}} icon="home"/>
      <Button Label="Clear list" onPress={() => {setIsClear(true)}}/>
      <Modal animationType="slide" transparent={false} visible={isClear}>
        <View style={styles.container}>
          <Text style={{fontSize: 15, alignItems: 'center', width: 300, height: 100}}>
            Are you sure you want to clear the list?
          </Text>
          <Button Label="Yes" onPress={clearList}/>
          <Button Label="no" onPress={() => {setIsClear(false)}}/>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  }
});