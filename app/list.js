import { StyleSheet, View, Text } from 'react-native';
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
    setItems(data);
    console.log(data);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={ styles.container }>
      <Text>listPage</Text>
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
  }
});