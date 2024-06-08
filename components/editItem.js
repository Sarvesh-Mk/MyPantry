import { StyleSheet, View, TextInput, Modal} from 'react-native';

import Button from "../components/Button";

export default function editItemModal(changeItemInfo, cancelEditItem, setNewText, newText) {
  return (
    <View style={[styles.container, {justifyContent: 'center', flex: 1}]}>
      <TextInput
        style={styles.input}
        onChangeText={setNewText} 
        value={newText}
      />
      <View style={styles.item}><Button Label="Change Label" onPress={changeItemInfo} /></View>
      <View style={styles.item}><Button Label="Cancel" onPress={cancelEditItem} /></View>
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