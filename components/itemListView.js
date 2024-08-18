import { StyleSheet, View, Text, TextInput, FlatList, Modal ,Pressable} from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image'
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function itemListView(item, editItem) {
  const imageSource = item.image  ? { uri: item.image } : require("../assets/images/no-image-found.png")

    return (
    <View style={{paddingBottom: 17}}>
        <View style={{width: 370, height: 240, flexDirection: 'row', paddingLeft: 14, borderWidth: 4, borderRadius: 5, borderColor: '#000', justifyContent: 'center', alignSelf: 'center'}}>
        <Image
          style={{width: '45%', height: '89%', alignSelf: 'center', borderWidth: 4, borderRadius: 4, borderColor: '#000'}}
          source={imageSource} 
          contentFit="cover"
        />
        <View style={{paddingLeft: 2, flexDirection: 'column', width: 195, paddingTop: 15, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{display: 'flex', width: 155, padding: 5, alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}} adjustsFontSizeToFit={true} numberOfLines={3}>{item.name}</Text>
          <View style={{paddingTop: 15, flexDirection: 'row', gap: 5}}>
            <Text style={{alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', fontSize: 24, paddingHorizontal: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000'}} adjustsFontSizeToFit={true} numberOfLines={2}>{item.amount}</Text>
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