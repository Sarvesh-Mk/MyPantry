import { StyleSheet, SafeAreaView, View, Text, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from "../components/Button";

export default function listPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();

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

  return (
    <View style={styles.container}>
      <Button Label="Go Home" onPress={async () => {router.replace('/')}} icon={"home"}/>
      <View style={styles.itemContainer}>
        <FlatList 
          data={items}
          renderItem={({ item }) => <View style={styles.item}><Button Label={item.id}></Button></ View>}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
    paddingBottom: 40,
  },
  itemContainer: {
    height: 600,
    width: 375,
    alignItems: 'center',
    borderWidth: 4,
    borderRadius: 8,
    borderColor: '#cce3de'
  },
  item: {
    padding: 5,
    fontSize: 15,
    marginTop: 5,
  },
});