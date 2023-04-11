import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Image,
  Keyboard
} from "react-native";
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";


export default function Wheel () {
    return(
        <>
            <View style={styles.circleRow}>
                <View style={[styles.pizza, styles.pizzaRed]}>
                    <FontAwesome5 style={styles.bitcoin} name="bitcoin" size={50} color="white" />
                </View>
                <View style={[styles.pizza, styles.pizzaBlue]}>
                    <FontAwesome5 style={styles.ethereum} name="ethereum" size={50} color="white" />
                </View>
            </View>
            <View style={styles.circleRow}>
                <View style={[styles.pizza, styles.pizzaYellow]}>
                    <MaterialCommunityIcons style={styles.dogecoin} name="dog" size={50} color="white" />
                </View>
                <View style={[styles.pizza, styles.pizzaGreen]}>
                    <FontAwesome style={styles.dollar} name="money" size={50} color="white" />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    circleRow: {width: '100%', height: '50%', flexDirection: 'row'},
    pizza: {width: '50%', height: '100%', 
        justifyContent: 'center',
        alignItems: 'center'},
    pizzaRed: {
        backgroundColor: '#ce4257',
    },
    pizzaBlue: {
        backgroundColor: '#4361ee',
    },
    pizzaYellow: {backgroundColor: '#fee440'},
    pizzaGreen: {backgroundColor: '#06d6a0'},
    ethereum: {
        transform: [{rotate: '45deg'}]
    },
    bitcoin: {
        transform: [{rotate: '-60deg'}]
    },
    dogecoin: {
        transform: [{rotate: '-135deg'}]
    },
    dollar: {
        transform: [{rotate: '135deg'}]
    }
});