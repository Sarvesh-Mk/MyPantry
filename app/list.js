import { StyleSheet, View, TextInput, FlatList, Modal} from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button";
import editItemModal from "../components/editItem";

export default function listPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const [isEditItem, setIsEditingItem] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [newText, setNewText] = useState('') 

  const fetchData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    var allItems = [];
    for(var i=0; i < keys.length; i++){
      var val = await AsyncStorage.getItem(keys[i]);
      allItems.push({id: keys[i], value: val})
    }
    setItems(allItems);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  const editItem = (id) => {
    setIsEditingItem(true);
    setEditedItem(id);
    setNewText(id);
  }

  const changeItemInfo = async () => {
    if(newText != '') {
      const val = await AsyncStorage.getItem(editedItem);
      await AsyncStorage.removeItem(editedItem);
      await AsyncStorage.setItem(newText, val);
      setNewText('');
      fetchData();
      setIsEditingItem(false);
    }
  }

  const cancelEditItem = () => {
    setIsEditingItem(false);
  }

  return (
    <View style={styles.container}>
      <Button Label="Go Home" onPress={async () => {router.replace('/')}} icon={"home"}/>
      <View style={styles.itemContainer}>
        <FlatList 
          data={items}
          renderItem={({ item }) => <View style={styles.item}><Button Label={item.id} amt={item.value} theme='list' onPress={() => editItem(item.id)}></Button></ View>}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Modal animationType="slide" transparent={false} visible={isEditItem}>
        {editItemModal(changeItemInfo, cancelEditItem, setNewText, newText)}
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