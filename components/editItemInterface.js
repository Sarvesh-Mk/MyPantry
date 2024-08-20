import { StyleSheet, View, TextInput, Pressable, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function editItemModal(cancelEditItem, item_id, item, RemoveItem) {
  //setNewText, newText, amount, setAmount, RemoveItem
  const [defaultText, setDefaultText] = useState('');

  const [newText, setNewText] = useState('');
  const [amount, setAmount] = useState(null);

  const fetchData = () => {
    setNewText(item.name);
    setAmount(item.amount);
    setDefaultText(item.name);
  }

  const changeItemInfo = async () => {
    if(newText != '') {
      item.name = newText;
      item.amount = amount;
      await AsyncStorage.setItem(item_id, JSON.stringify(item));
      cancelEditItem();
    }
  }

  useEffect(() => {
    fetchData();
  }, [item]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, {justifyContent: 'center', gap: 40, paddingTop: 50}]}>
      <TextInput
        style={{width: '75%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 20, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
        onChangeText={setNewText} 
        value={newText}
        autoFocus={false}
        onSubmitEditing={() => {if (newText=='') {setNewText(defaultText)}}}
        onFocus={() => {setNewText(''); setDefaultText(newText)}}
      />
      
      <View style={{flexDirection: 'row', justifyContent: 'center',  alignItems: 'center', gap: '20%', width: '75%'}}>
        <Text style={{width: '40%', paddingVertical: '15%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', fontSize: 24, borderWidth: 4, borderRadius: 4, borderColor: '#000'}}>{amount}</Text>
        <View style={{flexDirection: 'column', gap: 15, alignItems: 'center'}}>
          <Pressable
            style={{paddingHorizontal: 30, padding: 5, justifyContent: 'center', borderWidth: 4, borderRadius: 4, borderColor: '#000', alignSelf: 'center'}}
            onPress={() => {setAmount(JSON.stringify(JSON.parse(amount)+1))}}
          >
          <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>Add 1</Text>  
          </Pressable>
          
          <Pressable
            style={{justifyContent: 'center', borderWidth: 4, borderRadius: 4, borderColor: '#000', alignSelf: 'center', padding: 5}}
            onPress={() => {
              if(JSON.parse(amount) > 1) {
                setAmount(JSON.stringify(JSON.parse(amount)-1))
              }}
            }
          >
          <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>Remove 1</Text>  
          </Pressable>
        </View>
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '20%', width: '75%'}}>
        <Pressable
          style={{width: '45%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
          onPress={RemoveItem}
        >
        <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>delete</Text>  
        </Pressable> 
        
        <Pressable
          style={{width: '45%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
          onPress={cancelEditItem}
        >
        <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>cancel</Text>  
        </Pressable>  
      </View>
      <Pressable
        style={{width: '75%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
        onPress={changeItemInfo}
      >
      <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>Update</Text>  
      </Pressable> 
    </KeyboardAvoidingView>
  )
}



const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  }
});