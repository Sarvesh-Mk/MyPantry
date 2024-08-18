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
  const [newText, setNewText] = useState('');
  const [isAddItem, setIsAddItem] = useState(false);
  
  const [currentId, setCurrentId] = useState(null);
  const [currentItem, setCurrentItem] = useState('');
  const [currentImageUrl, setImageUrl] = useState('');
  const [isSearchingWeb, setSearchWeb] = useState(false);
  const [itemFound, setItemFound] = useState(false);

  const setItemInfo = async () => {
    if(newText != '') {
      await AsyncStorage.setItem(currentId, JSON.stringify({id: currentId, name: newText, amount: 1, image: currentImageUrl}));
      setNewText('');
      setIsCreateItem(false);
      setItemFound(false);
      setScanning(false);
    }
  }

  const getItemFromBarcode = async (barcode) => {
    setImageUrl('');
    axios.get(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`)
      .then(response => {
        if(response.data.product){
          var product = [];
          product = response.data.product; 
          setNewText(product.brands + ' ' + product.product_name);
          setImageUrl(product.image_url)
          setItemFound(true);
        } else {
          setNewText("Couldn't find item, click to enter manually")
          setItemFound(false);
        }
      })
      .catch(error => {
        console.error(error);
      });
    setSearchWeb(false);
    
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
          setNewText('Searching for Item');
          setCurrentId(result.data); 
          setSearchWeb(true);  
          await getItemFromBarcode(result.data).then(setIsCreateItem(true))
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
        <Modal animationType="slide" transparent={false} visible={isCreateItem && !isSearchingWeb}>
          {createItemModal(setItemInfo, setNewText, newText, cancelCreate, !isSearchingWeb, itemFound)}
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