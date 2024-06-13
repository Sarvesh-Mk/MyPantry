import { CameraView } from "expo-camera";
import { StyleSheet, View, Modal, Text, Pressable } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import createItemModal from "../components/createItemInterface";
import Navbar from "../components/navbar";

export default function cameraPage() {
  const [cameraRef, setCameraRef] = useState(null);
  const [isScanning, setScanning] = useState(false);
  const router = useRouter();

  const [isCreateItem, setIsCreateItem] = useState(false);
  const newText = '';
  const [isAddItem, setIsAddItem] = useState(false);
  
  const [currentId, setCurrentId] = useState(null);
  const [currentItem, setCurrentItem] = useState('');
  const [currentImageUrl, setImageUrl] = useState('');
  const isSearchingWeb = false;

  const setItemInfo = async () => {
    if(newText != '') {
      await AsyncStorage.setItem(currentId, JSON.stringify({id: currentId, name: newText, amount: 1, image: currentImageUrl}));
      setNewText('');
      setIsCreateItem(false);
      setScanning(false);
    }
  }

  const getItemFromBarcode = (barcode) => {
    setImageUrl('');
    axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
      .then(response => {
        if(response.data.product){
          var product = [];
          product = response.data.product; 
          newText = product.brands + ' ' + product.product_name;
          setImageUrl(product.image_url)
        } else {
          newText='Add Item Name';
        }
        setSearchWeb(false);
        setIsCreateItem(true);
        console.log(isCreateItem, isSearchingWeb, newText);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const cancelCreate = async () => {
    setIsCreateItem(false);
    setScanning(false);
  }

  const incrementItem = async () => {
    var item = currentItem;
    item.amount += 1;
    await AsyncStorage.setItem(currentId, JSON.stringify(item));
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
          setCurrentItem(JSON.parse(value))
        } else {
          setNewText('');
          setCurrentId(result.data); 
          setSearchWeb(true);  
          getItemFromBarcode(result.data);
        }
      } catch (e) {
        //console.log(e)
      }
    }
  }
  
  return (
    <View style={{height: '100%', alignItems: 'center'}}>
      <View style={styles.container}>
        <CameraView style={styles.camera} facing='back' ref={(ref) => setCameraRef(ref)} onBarcodeScanned={barcodeScanned} ></CameraView>
        <Modal animationType="slide" transparent={false} visible={isSearchingWeb}>
          <View style={[styles.container, {justifyContent: 'center'}]}>
            <Text style={{width: '75%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24, textAlign: 'center', fontFamily: 'Inter', fontSize: 24}}>
            Fetching item from database
            </Text>
          </View>
        </Modal>
        <Modal animationType="slide" transparent={false} visible={isCreateItem}>
          {createItemModal(setItemInfo, setNewText, newText, cancelCreate)}
        </Modal>
        <Modal animationType="slide" transparent={false} visible={isAddItem}>
          <View style={[styles.container, {justifyContent: 'center', gap: 35}]}>
            <Text style={{width: '75%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 20, padding: 5, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}>{"You already have " + currentItem.amount}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '20%'}}>
              <Pressable
                style={{width: '30%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
                onPress={incrementItem}
              >
              <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>add 1 more</Text>  
              </Pressable> 

              <Pressable
                style={{width: '30%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 25, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
                onPress={() => {setIsAddItem(false); setScanning(false)}}
              >
              <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>Cancel</Text>  
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: 360,
    height: 680, 
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "space-evenly",
  }
});