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

export default function BankScreen () {
    return (
        <SafeAreaView styles={styles.container}>
            <Text>Bank Screen</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    // backgroundColor: "#F3EDF7",
  },
})