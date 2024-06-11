import { StyleSheet, View, Pressable, Text, Alert } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Button({Label, onPress, icon, theme, amt}) {
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
            <Text style={[styles.label, { color: "#25292e" }]}>{Label}</Text>
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
    label: {
        color: '#fff',
        fontSize: 16,
    },
    listInfoBox: {
        width: 380,
        height: 75,
        marginHorizontal: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        padding: 3,
    },
    listBox: {
        borderWidth: 4, 
        borderColor: "#cce3de", 
        borderRadius: 8, 
        color: '#25292e',
        width: 200,
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        fontSize: 18,
    },
    listButton: {
        width: 80, 
        height: '75%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: "#6B9080", 
        borderColor: "#cce3de", 
        borderRadius: 8, 
        borderWidth: 4 
    }
});