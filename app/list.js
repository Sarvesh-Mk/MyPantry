import { StyleSheet, View, Text, TextInput, FlatList, Modal ,Pressable} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image'
import AsyncStorage from '@react-native-async-storage/async-storage';

import editItemModal from "../components/editItemInterface";
import Navbar from "../components/navbar";
import itemListView from '../components/itemListView';
import removeItemModal from '../components/removeItem';

export default function listPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const [isEditItem, setIsEditingItem] = useState(false);
  const [editedItemID, setEditedItemID] = useState('');
  const [editedItem, setEditedItem] = useState({name: ''});
  const [isRemoveItem, setIsRemoveItem] = useState(false);

  const fetchData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    var allItems = [];
    for(var i=0; i < keys.length; i++){
      var item = await AsyncStorage.getItem(keys[i]);
      item = JSON.parse(item);
      allItems.push(item);
    }
    setItems(allItems);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const editItem = async (id) => {
    var item = await AsyncStorage.getItem(id);
    item = JSON.parse(item)
    setEditedItemID(id);
    setEditedItem(item);
    setIsEditingItem(true);
  }

  const removeItem = async () => {
    await AsyncStorage.removeItem(editedItemID);
    setIsRemoveItem(false);
    fetchData();
  } 

  return (
    <View style={{height: '100%', alignItems: 'center'}}>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <FlatList 
            data={items}
            renderItem={({item}) => itemListView(item, editItem)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator = {false}
          />
        </View>
        <Modal animationType="slide" transparent={false} visible={isEditItem}>
          {editItemModal(() => {setIsEditingItem(false); fetchData()}, editedItemID,  editedItem, () => {setIsRemoveItem(true); setIsEditingItem(false)})}
        </Modal>
        <Modal animationType="slide" transparent={false} visible={isRemoveItem}>
          {removeItemModal(removeItem, () => {setIsRemoveItem(false); setIsEditingItem(true)})}
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
    justifyContent: 'space-evenly',
  },
  itemContainer: {
    height: 675,
    width: 375,
    alignItems: 'center',
  },
  item: {
    padding: 5,
    fontSize: 15,
  },
  image: {
    width: 176,
    height: 157,
  },
  input: {
    height: 200,
    width: 350,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#cce3de'
  }
});