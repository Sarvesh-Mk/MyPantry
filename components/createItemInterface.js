import { StyleSheet, View, TextInput, Modal} from 'react-native';

import Button from "./Button";

export default function createItemModal(setItemInfo, setNewText, newText, cancelCreate) {
  return (
    <View style={[styles.container, {justifyContent: 'center', flex: 1}]}>
      <TextInput
        style={styles.input}
        onChangeText={setNewText} 
        value={newText}
        autoFocus={true}
      />
      <View style={styles.item}><Button Label="Add to Pantry" onPress={setItemInfo} /></View>
      <View style={styles.item}><Button Label="Don't add" onPress={cancelCreate} /></View>
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
});