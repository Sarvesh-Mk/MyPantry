import { StyleSheet, View, TextInput, Modal, Text} from 'react-native';

import Button from "./Button";

export default function editItemModal(changeItemInfo, cancelEditItem, setNewText, newText, amount, setAmount, RemoveItem) {
  return (
    <View style={[styles.container, {justifyContent: 'center', flex: 1}]}>
      <TextInput
        style={styles.input}
        onChangeText={setNewText} 
        value={newText}
      />
      <Text style={[styles.amountText]}>Amount: {amount}</Text>
      <View style={styles.item}><Button Label="add 1" onPress={() => {setAmount(JSON.stringify(JSON.parse(amount)+1))}}/></View>
      <View style={styles.item}><Button Label="remove one" onPress={() => {
        if(JSON.parse(amount) > 1) {
          setAmount(JSON.stringify(JSON.parse(amount)-1))
        }
      }}/>
      </View>
      <View style={styles.item}><Button Label="update" onPress={changeItemInfo} /></View>
      <View style={styles.item}><Button Label="Cancel" onPress={cancelEditItem} /></View>
      <View style={styles.item}><Button Label="Remove Item" onPress={RemoveItem} /></View>
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
  amountText: {
    borderWidth: 4, 
    borderColor: "#cce3de", 
    borderRadius: 8, 
    color: '#25292e',
    width: 140,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    fontSize: 18,
  }
});