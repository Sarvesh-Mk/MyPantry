import { StyleSheet, View, Text, TextInput, FlatList, Modal ,Pressable} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navbar from '../components/navbar';

export default function searchPage(){
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    var allItems = [];
    for(var i=0; i < keys.length; i++){
      var item = await AsyncStorage.getItem(keys[i]);
      item = JSON.parse(item);
      allItems.push(item);
    }
    setItems(allItems);
  }
  
  useEffect(() => {
    fetchData();
  }, []);

  return(
    <View style={{height: '100%', alignItems: 'center'}}>
      <View style={styles.container}>
        <TextInput
          style={{width: 370, height: 80, flexDirection: 'row',  borderWidth: 4, borderRadius: 5, borderColor: '#000', justifyContent: 'center', alignSelf: 'center', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', fontSize: 24}}
          // onChangeText={setNewText} 
          value={'Search For Item'}
          autoFocus={false}
          // onSubmitEditing={() => {if (newText=='') {setNewText(defaultText)}}}
          // onFocus={() => {setNewText(''); setDefaultText(newText)}}
        />    
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
});