import { StyleSheet, View, Text, FlatList, Modal ,Pressable} from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Navbar() {
  const router = useRouter();

  const barItem = (icon, onPress) => {
    return (
      <Pressable
        style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
        onPress={onPress}
      >
      <FontAwesome
      name={icon}
      size={40}
      color="#000"
      />
      </Pressable>
    )
  }

  return(
    <View style={{width: 400, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', color: '#000', padding: 5, borderColor: '#000', borderWidth: 4, borderRadius: 4}}>
      {barItem("home", () => {router.replace('/')})}
      {barItem("camera", () => {router.replace('/camera')})}
      {barItem("list", () => {router.replace('/list')})}
      {barItem("cog", () => {router.replace('/settings')})}
    </View>
  )
}