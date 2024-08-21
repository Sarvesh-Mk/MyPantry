import { StyleSheet, View, Text, TextInput, FlatList, Modal ,Pressable} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function itemListView(item, editItem) {
  const imageSource = item.image  ? { uri: item.image } : require("../assets/images/no-image-found.png")

  var fontSize = 20;

  return (
    <View style={{paddingBottom: 17}}>
        <View style={{width: 370, height: 220, flexDirection: 'row', paddingLeft: 14, backgroundColor: '#f4f4f4', borderRadius: 5, borderColor: '#000', justifyContent: 'space-evenly', alignSelf: 'center'}}>
        <Image
          style={{width: '30%', height: '80%', alignSelf: 'center', borderRadius: 10}}
          source={imageSource} 
          contentFit="cover"
        />
        <View style={{paddingLeft: 2, flexDirection: 'column', width: 270, paddingTop: 5, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{display: 'flex', width: 230, height: '50%', padding: 5, borderRadius: 15, backgroundColor: '#fff', alignSelf: 'center', justifyContent: 'center'}}>
            <Text style={{fontFamily: 'Inter', borderRadius: 4, fontSize: 20}} adjustsFontSizeToFit={true}>{item.name}</Text>
          </View>
          <View style={{paddingTop: 15, flexDirection: 'row', gap: 5}}>
            <Text style={{alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', fontSize: 24, paddingHorizontal: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000'}} numberOfLines={2}>{item.amount}</Text>
            <Pressable
              style={{width: 75, justifyContent: 'center', borderWidth: 4, borderRadius: 10, borderColor: '#000', alignSelf: 'center'}}
              onPress={() => editItem(item.id)}
            >
            <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>Edit</Text>  
            </Pressable>
          </View>
        </View>
      </ View>
    </View>
  )
}