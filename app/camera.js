import { CameraView } from "expo-camera";
import { StyleSheet, View, Modal } from 'react-native';
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button";
import createItemModal from "../components/createItemInterface";

export default function cameraPage() {
  const [cameraRef, setCameraRef] = useState(null);
  const [isScanning, setScanning] = useState(false);
  const router = useRouter();

  const [isCreateItem, setIsCreateItem] = useState(false);
  const [newText, setNewText] = useState('');
  const [currentId, setCurrentId] = useState(null);

  const [isAddItem, setIsAddItem] = useState(false);
  const [currentItemName, setCurrentItemName] = useState('');

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
    const value_name = currentItemName.split("§")
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
          setCurrentItemName(value)
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
    <View style={styles.container}>
      <CameraView style={styles.camera} facing='back' ref={(ref) => setCameraRef(ref)} onBarcodeScanned={barcodeScanned} ></CameraView>
      <View style={styles.footerContainer}>
        <Button Label="Go Home" onPress={async () => {router.replace('/')}} icon={"home"}/>
        <Button Label="check list" onPress={async () => {router.replace('/list')}} icon={"list"}/>
      </View>
      <Modal animationType="slide" transparent={false} visible={isCreateItem}>
        {createItemModal(setItemInfo, setNewText, newText, cancelCreate)}
      </Modal>
      <Modal animationType="slide" transparent={false} visible={isAddItem}>
        <View style={[styles.container, {justifyContent: 'space-evenly'}]}>
          <Button Label={"add 1 more " + currentItemName.split("§")[1]} onPress={incrementItem}/>
          <Button Label={"Cancel"} onPress={() => {setIsAddItem(false); setScanning(false)}}/>
        </View>
      </Modal>
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
    width: 340,
    height: 540, 
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-evenly",
  }
});