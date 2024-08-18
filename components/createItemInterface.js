import { StyleSheet, View,  Text, TextInput, Pressable, KeyboardAvoidingView, Platform, Keyboard, } from 'react-native';

export default function createItemModal(setItemInfo, setNewText, newText, cancelCreate, editable, itemFound) {
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={[styles.container, {justifyContent: 'center', gap: 40, paddingTop: 50}]}>
      <TextInput
        style={{width: '75%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 20, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
        onChangeText={setNewText} 
        value={newText}
        autoFocus={false}
        onFocus={
          () => {
            if(!itemFound){
              if(editable){
                setNewText('')
              } else {
                Keyboard.dismiss();
              }
            }
            
          }
        }
        multiline={true}
      />
      <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: '20%'}}>
        <Pressable
          style={{width: '30%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
          onPress={setItemInfo}
        >
        <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>Add to Pantry</Text>  
        </Pressable> 

        <Pressable
          style={{width: '30%', alignSelf: 'center', textAlign: 'center', fontFamily: 'Inter', paddingVertical: 10, borderWidth: 4, borderRadius: 4, borderColor: '#000', fontSize: 24}}
          onPress={cancelCreate}
        >
        <Text style={{ textAlign: 'center', fontFamily: 'Inter', fontSize: 24 }}>Don't add</Text>  
        </Pressable>    
      </View>
      
    </KeyboardAvoidingView>
      
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
  input: {
    height: 200,
    width: 350,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#cce3de'
  },
  item: {
    padding: 15,
    fontSize: 15,
  },
});