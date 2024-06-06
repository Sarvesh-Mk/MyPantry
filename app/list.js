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
    <View style={ styles.container }>
      <SafeAreaView>
        <FlatList 
          data={items}
          renderItem={({ item }) => <Button Label={item.id} style={styles.item}></Button>}
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
    paddingTop: 40
  },
  item: {
    padding: 20,
    fontSize: 15,
    marginTop: 5,
  }
});