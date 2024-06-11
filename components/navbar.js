import { StyleSheet, View, Text, FlatList, Modal ,Pressable} from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Navbar() {
  const router = useRouter();

  const barItem = (icon, onPress, text) => {
    return (
      <Pressable
        style={{flexDirection: 'row', alignItems: 'center', gap: 5}}
        onPress={onPress}
      >
      <FontAwesome
      name={icon}
      size={35}
      color="#000"
      />
      </Pressable>
    )
  }

  return(
    <View style={{width: 380, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', color: '#000', padding: 5, borderColor: '#000', borderWidth: 4, borderRadius: 4}}>
      {barItem("home", () => {router.replace('/')}, "Home")}
      {barItem("camera", () => {router.replace('/camera')}, "camera")}
      {barItem("cog", () => {router.replace('/settings')}, "settings")}
    </View>
  )
}