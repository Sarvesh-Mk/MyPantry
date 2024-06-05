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
    const data = await AsyncStorage.multiGet(keys);
    var allItems = [];
    for(var i=0; i < keys.length; i++){
      allItems.push({id: keys[i], name: AsyncStorage.getItem(keys[i])})
    }
    setItems(allItems);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={ styles.container }>
      <SafeAreaView>
        <FlatList 
          data={items}
          renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <Button Label="Go Home" onPress={async () => {router.replace('/')}} icon={"home"}/>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  }
});