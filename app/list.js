import { StyleSheet, View, Text, TextInput, FlatList, Modal ,Pressable} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image'
import AsyncStorage from '@react-native-async-storage/async-storage';

import editItemModal from "../components/editItemInterface";
import Navbar from "../components/navbar";
import itemListView from '../components/itemListView';

export default function listPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const [isEditItem, setIsEditingItem] = useState(false);
  const [editedItemID, setEditedItemID] = useState(null);
  const [isRemoveItem, setIsRemoveItem] = useState(false);

  const [newText, setNewText] = useState('') 
  const [editItemAmount, setEditItemAmount] = useState(null);
  const [editItemName, setEditItemName] = useState('')

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
    setIsEditingItem(true);
    var item = await AsyncStorage.getItem(id);
    item = JSON.parse(item)
    setEditedItemID(id);
    setNewText(item.name);
    setEditItemAmount(item.amount);
    setEditItemName(item.name);
  }

  const changeItemInfo = async () => {
    if(newText != '') {
      var item = await AsyncStorage.getItem(editedItemID);
      item = JSON.parse(item);
      item.name = newText;
      item.amount = editItemAmount;
      await AsyncStorage.setItem(editedItemID, JSON.stringify(item));
      setNewText('');
      fetchData();
      setIsEditingItem(false);
    }
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
          {editItemModal(changeItemInfo, () => {setIsEditingItem(false)}, setNewText, newText, editItemAmount, setEditItemAmount, () => {setIsRemoveItem(true); setIsEditingItem(false)})}
        </Modal>
        <Modal animationType="slide" transparent={false} visible={isRemoveItem}>
          <View style={[styles.container, {justifyContent: 'center', gap: 35}]}>
            <Text style={{width: '75%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 20, padding: 5, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}>{"Are you sure you want to delete " + editItemName + "?"}</Text>
            <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '20%'}}>
              <Pressable
                style={{width: '30%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
                onPress={removeItem}
              >
              <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>yes</Text>  
              </Pressable> 

              <Pressable
                style={{width: '30%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
                onPress={() => {setIsRemoveItem(false); setIsEditingItem(true)}}
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