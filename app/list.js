import { StyleSheet, View, Text, FlatList, Modal} from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button";
import editItemModal from "../components/editItemInterface";

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

  return (
    <View style={styles.container}>
      <Button Label="Go Home" onPress={async () => {router.replace('/')}} icon={"home"}/>
      <View style={styles.itemContainer}>
        <FlatList 
          data={items}
          renderItem={({ item }) => <View style={styles.item}><Button Label={item.name} amt={item.value} theme='list' onPress={() => editItem(item.id)}></Button></ View>}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Modal animationType="slide" transparent={false} visible={isEditItem}>
        {editItemModal(changeItemInfo, () => {setIsEditingItem(false)}, setNewText, newText, editItemAmount, setEditItemAmount, () => {setIsRemoveItem(true); setIsEditingItem(false)})}
      </Modal>
      <Modal animationType="slide" transparent={false} visible={isRemoveItem}>
        <View style={[styles.container, {flex: 1/2, paddingTop: 75}]}>
          <Text style={{fontSize: 15, alignItems: 'center', width: 300, height: 100}}>{"Are you sure you want to delete " + editItemName + "?"}</Text>
          <Button Label="Yes" onPress={removeItem}/>
          <Button Label="No" onPress={() => {setIsRemoveItem(false); setIsEditingItem(true)}}/>
        </View>
        
      </Modal>
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
    borderWidth: 4,
    borderRadius: 8,
    borderColor: '#cce3de'
  },
  item: {
    padding: 5,
    fontSize: 15,
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