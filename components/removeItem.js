import { StyleSheet, View, TextInput, Pressable, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useEffect } from 'react';

export default function removeItemModal(removeItem, callback) {
  return (
    <View style={[styles.container, {justifyContent: 'center', gap: 35}]}>
      <Text style={{width: '75%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 20, padding: 5, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}>{"Are you sure you want to delete this?"}</Text>
      <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '20%'}}>
        <Pressable
          style={{width: '30%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
          onPress={removeItem}
        >
          <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>yes</Text>  
        </Pressable> 

        <Pressable
          style={{width: '30%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
          onPress={callback}
        >
          <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>no</Text>  
        </Pressable>  
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
  },
  itemContainer: {
    height: 675,
    width: 375,
    alignItems: 'center',
  }
});