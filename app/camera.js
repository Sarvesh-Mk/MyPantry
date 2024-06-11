import { CameraView } from "expo-camera";
import { StyleSheet, View, Modal, Text } from 'react-native';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button";
import createItemModal from "../components/createItemInterface";
import Navbar from "../components/navbar";

export default function cameraPage() {
  const [cameraRef, setCameraRef] = useState(null);
  const [isScanning, setScanning] = useState(false);
  const router = useRouter();

  const [isCreateItem, setIsCreateItem] = useState(false);
  const [newText, setNewText] = useState('');
  const [currentId, setCurrentId] = useState(null);

  const [isAddItem, setIsAddItem] = useState(false);
  const [currentItem, setCurrentItem] = useState('');

  const setItemInfo = async () => {
    if(newText != '') {
      newStr = '1§' + newText;
      await AsyncStorage.setItem(currentId, newStr);
      setNewText('');
      setIsCreateItem(false);
      setScanning(false);
    }
  }

  const cancelCreate = async () => {
    setIsCreateItem(false);
    setScanning(false);
  }

  const incrementItem = async () => {
    const value_name = currentItem.split("§")
    await AsyncStorage.setItem(currentId, JSON.stringify(parseInt(value_name[0])+1) + "§" + value_name[1]);
    setScanning(false);
    setIsAddItem(false);
  }

  const barcodeScanned = async (result) => {
    if (!isScanning && result.type != 'qr') {
      setScanning(true);
      try {
        const value = await AsyncStorage.getItem(result.data);
        if (value !== null) {
          setIsAddItem(true);
          setCurrentId(result.data);
          setCurrentItem(value)
        } else {
          setCurrentId(result.data);
          setIsCreateItem(true);
        }
      } catch (e) {
        //console.log(e)
      }
    }
  }
  
  return (
    <View style={{height: 775, alignItems: 'center'}}>
      <View style={styles.container}>
        <CameraView style={styles.camera} facing='back' ref={(ref) => setCameraRef(ref)} onBarcodeScanned={barcodeScanned} ></CameraView>
        <Modal animationType="slide" transparent={false} visible={isCreateItem}>
          {createItemModal(setItemInfo, setNewText, newText, cancelCreate)}
        </Modal>
        <Modal animationType="slide" transparent={false} visible={isAddItem}>
          <View style={[styles.container, {justifyContent: 'space-evenly'}]}>
            <Text style={{fontSize: 40, textAlign: 'center', width: 300, height: 200}}>
              {"You already have " + currentItem.split("§")[0]} 
            </Text>
            <Button Label={"add 1 more " + currentItem.split("§")[1] + "?"} onPress={incrementItem}/>
            <Button Label={"Cancel"} onPress={() => {setIsAddItem(false); setScanning(false)}}/>
          </View>
        </Modal>
      </View>  
      <Navbar />
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
    width: 360,
    height: 700, 
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-evenly",
  }
});