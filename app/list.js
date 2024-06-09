import { StyleSheet, View, TextInput, FlatList, Modal} from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button";
import editItemModal from "../components/editItemInterface";

export default function listPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const [isEditItem, setIsEditingItem] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [newText, setNewText] = useState('') 

  const [editAmount, setEditAmount] = useState(null);

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
    setEditedItem(id);
    setNewText(name[1]);
    setEditAmount(name[0]);
  }

  const changeItemInfo = async () => {
    if(newText != '') {
      const val = await AsyncStorage.getItem(editedItem);
      newStr = editAmount + '§' + newText;
      await AsyncStorage.setItem(editedItem, newStr);
      setNewText('');
      fetchData();
      setIsEditingItem(false);
    }
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
        {editItemModal(changeItemInfo, () => {setIsEditingItem(false)}, setNewText, newText, editAmount, setEditAmount)}
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