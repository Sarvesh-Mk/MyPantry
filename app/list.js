import { StyleSheet, SafeAreaView, View, TextInput, FlatList, Modal} from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button";

export default function listPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();
  const [isEditItem, setEditItem] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [newText, setNewText] = useState(null) 

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
    setEditItem(true);
    setEditedItem(id);
  }

  const changeItemInfo = async () => {
    const val = await AsyncStorage.getItem(editedItem);
    await AsyncStorage.setItem(newText, val);
    await AsyncStorage.removeItem(editedItem);
  }

  const cancelEditItem = () => {
    setEditItem(false);
  }

  return (
    <View style={styles.container}>
      <Button Label="Go Home" onPress={async () => {router.replace('/')}} icon={"home"}/>
      <View style={styles.itemContainer}>
        <FlatList 
          data={items}
          renderItem={({ item }) => <View style={styles.item}><Button Label={item.id} theme='list' onPress={() => editItem(item.id)}></Button></ View>}
          keyExtractor={(item) => item.id}
        />
      </View>
      <Modal animationType="slide" transparent={true} visible={isEditItem}>
        <View style={[styles.container, {justifyContent: 'center'}]}>
          <TextInput
            style={styles.input}
            onChangeText={newText => setNewText(newText)}
            value={editedItem}
          />
          <Button Label="Change Label" onPress={changeItemInfo}></Button>
          <Button Label="Cancel" onPress={cancelEditItem}></Button>
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
    borderWidth: 4,
    borderColor: '#cce3de'
  }
});