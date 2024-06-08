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

  const setItemInfo = async () => {
    if(newText != '') {
      newStr = '1§' + newText;
      await AsyncStorage.setItem(currentId, newStr);
      setNewText('');
      setIsCreateItem(false);
    }
  }

  const barcodeScanned = async (result) => {
    if (!isScanning && result.type != 'qr') {
      setScanning(true);
      try {
        var value_name = await AsyncStorage.getItem(result.data);
        if (value_name !== null) {
          value_name = value_name.split("§")
          await AsyncStorage.setItem(result.data, JSON.stringify(parseInt(value_name[0])+1) + "§" + value_name[1]);
          setScanning(false);
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
        {createItemModal(setItemInfo, setNewText, newText)}
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