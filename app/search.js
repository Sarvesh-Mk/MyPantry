import { StyleSheet, View, Text, TextInput, FlatList, Modal ,Pressable} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Navbar from '../components/navbar';
import itemListView from '../components/itemListView';
import editItemModal from '../components/editItemInterface';
import removeItemModal from '../components/removeItem';

export default function searchPage(){
  const [items, setItems] = useState([]);
  const [sortedItems, setSortedItems] = useState([]);
  const defaultText = 'Search For Item'
  const [searchText, setSearchText] = useState(defaultText);

  const [isEditItem, setIsEditingItem] = useState(false);
  const [editedItemID, setEditedItemID] = useState('');
  const [editedItem, setEditedItem] = useState({name: ''});
  const [isRemoveItem, setIsRemoveItem] = useState(false);

  const modifyList = () => {
    var tempList = [];
    if(searchText != defaultText){
      for (i in items) {
        if(items[i].name.includes(searchText) || items[i].name.toLowerCase().includes(searchText)){
          tempList.push(items[i]);
        }
      }  
      setSortedItems(tempList);
    } else {
      setSortedItems(items);
    }
    
  }

  const fetchData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    var allItems = [];
    for(var i=0; i < keys.length; i++){
      var item = await AsyncStorage.getItem(keys[i]);
      item = JSON.parse(item);
      allItems.push(item);
    }
    setItems(allItems);
    setSortedItems(allItems)
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    modifyList();
  }, [searchText]);

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

  return(
    <View style={{height: '100%', alignItems: 'center'}}>
      <View style={styles.container}>
        <TextInput
          style={{width: 370, height: 80, flexDirection: 'row',  borderWidth: 4, borderRadius: 5, borderColor: '#000', justifyContent: 'center', alignSelf: 'center', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', fontSize: 24}}
          onChangeText={setSearchText} 
          value={searchText}
          autoFocus={false}
          onSubmitEditing={() => {if (searchText=='') {setSearchText(defaultText)}}}
          onFocus={() => {setSearchText('')}}
        /> 
        <FlatList
          data={sortedItems}
          renderItem={({item}) => itemListView(item, editItem)}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator = {false}
        />
        <Modal animationType="slide" transparent={false} visible={isEditItem}>
          {editItemModal(() => {setIsEditingItem(false); fetchData(); modifyList()}, editedItemID,  editedItem, () => {setIsRemoveItem(true); setIsEditingItem(false)})}
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
});