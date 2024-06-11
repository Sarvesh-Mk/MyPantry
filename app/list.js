import { StyleSheet, View, Text, FlatList, Modal ,Pressable} from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import { Image } from 'expo-image'
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button";
import editItemModal from "../components/editItemInterface";
import Navbar from "../components/navbar";

export default function listPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const [isEditItem, setIsEditingItem] = useState(false);
  const [editedItemID, setEditedItemID] = useState(null);
  const [newText, setNewText] = useState('') 

  const [editItemAmount, setEditItemAmount] = useState(null);
  const [editItemName, setEditItemName] = useState('');
  const [isRemoveItem, setIsRemoveItem] = useState(false);

  const fetchData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    var allItems = [];
    for(var i=0; i < keys.length; i++){
      var val_name = await AsyncStorage.getItem(keys[i]);
      val_name = val_name.split("§");
      allItems.push({id: keys[i], value: val_name[0], name: val_name[1]});
    }
    setItems(allItems);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const editItem = async (id) => {
    setIsEditingItem(true);
    var name = await AsyncStorage.getItem(id);
    name = name.split("§");
    setEditedItemID(id);
    setNewText(name[1]);
    setEditItemName(name[1]);
    setEditItemAmount(name[0]);
  }

  const changeItemInfo = async () => {
    if(newText != '') {
      newStr = editItemAmount + '§' + newText;
      await AsyncStorage.setItem(editedItemID, newStr);
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

  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['; 
  
  const itemDisplay = (item) => {
    return (
    <View style={{paddingBottom: 17}}>
        <View style={{width: 370, height: 160, flexDirection: 'row', paddingLeft: 14, borderWidth: 4, borderRadius: 5, borderColor: '#000', justifyContent: 'center', alignSelf: 'center'}}>
        <Image
          style={{width: 166, height: 130, alignSelf: 'center'}}
          source="../assets/icon.png"
          placeholder={{ blurhash }}
          contentFit="cover"
          transition={1000}
        />
        <View style={{paddingLeft: 2, flexDirection: 'column', width: 195, paddingTop: 15, alignItems: 'center'}}>
          <Text style={{display: 'flex', width: 155, padding: 5, alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', borderWidth: 4, borderRadius: 10, borderColor: '#000', fontSize: 24}}>{item.name}</Text>
          <View style={{paddingTop: 15, flexDirection: 'row', gap: 15}}>
            <Text style={{alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', fontSize: 24, paddingHorizontal: 20, borderWidth: 4, borderRadius: 10, borderColor: '#000'}}>{item.value}</Text>
            <Pressable
              style={{width: 75, justifyContent: 'center', borderWidth: 4, borderRadius: 10, borderColor: '#000', alignSelf: 'center'}}
              onPress={() => editItem(item.id)}
            >
            <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>Edit</Text>  
            </Pressable>
          </View>
        </View>
      </ View>
    </View>
    )
  }

  return (
    <View style={{height: 775, alignItems: 'center'}}>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <FlatList 
            data={items}
            renderItem={({item}) => itemDisplay(item)}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator = {false}
          />
        </View>
        <Modal animationType="slide" transparent={false} visible={isEditItem}>
          {editItemModal(changeItemInfo, () => {setIsEditingItem(false)}, setNewText, newText, editItemAmount, setEditItemAmount, () => {setIsRemoveItem(true); setIsEditingItem(false)})}
        </Modal>
        <Modal animationType="slide" transparent={false} visible={isRemoveItem}>
          <View style={[styles.container, {flex: 1/2, paddingTop: 75}]}>
            <Text style={{fontSize: 15, textAlign: 'center', width: 300, height: 100}}>{"Are you sure you want to delete " + editItemName + "?"}</Text>
            <Button Label="Yes" onPress={removeItem}/>
            <Button Label="No" onPress={() => {setIsRemoveItem(false); setIsEditingItem(true)}}/>
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