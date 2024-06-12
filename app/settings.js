import { StyleSheet, View, Text, Modal, Pressable} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    <View style={{height: '100%', alignItems: 'center'}}>
      <View style={styles.container}>
        <Text style={{fontSize: 40, textAlign: 'center', width: 300, height: 200}}>
          Settings
        </Text>
        <View style={styles.footerContainer}>
          <Pressable
            style={{width: '75%', paddingHorizontal: 20, alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
            onPress={() => setIsClear(true)}
          >
          <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>Clear List</Text>  
          </Pressable>
        </View>
        
        <Modal animationType="slide" transparent={false} visible={isClear}>
          <View style={styles.container}>
            <Text style={{fontSize: 40, textAlign: 'center', width: 300, height: 200}}>
              Are you sure you want to clear the list?
            </Text>
            <View style={[styles.footerContainer, {flexDirection: 'row'}]}>
              <Pressable
                style={{width: '30%', padding: 5, paddingHorizontal: 30, alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
                onPress={clearList}
              >
              <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>yes</Text>  
              </Pressable> 

              <Pressable
                style={{width: '30%', padding: 5, paddingHorizontal: 30, alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
                onPress={() => {setIsClear(false)}}
              >
              <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>no</Text>  
              </Pressable>  
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
    alignItems: 'center',
    justifyContent: "center",
    gap: 30,
  }
});