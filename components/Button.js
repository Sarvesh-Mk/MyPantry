import { StyleSheet, View, Pressable, Text, Alert } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({Label, onPress, icon}) {
    return (
        <View style={[styles.ButtonContainer, { borderWidth: 4, borderColor: "#cce3de", borderRadius: 18 }]}>
            <Pressable
                style={[styles.button, { backgroundColor: "#fff" }]}
                onPress={onPress}
            >
            <FontAwesome
              name={icon}
              size={18}
              color="#25292e"
              style={styles.buttonIcon}
            />
            <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{Label}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    ButtonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonIcon: {
        paddingRight: 8,
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
});