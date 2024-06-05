import { StyleSheet, View, text } from 'react-native';
import { useState } from 'react';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function listPage() {
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const data = await AsyncStorage.multiGet(keys);
    setItems(data);
    console.log(data);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      <Text>listPage</Text>
    </View>
  )

}