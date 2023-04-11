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

export default function ProfileScreen () {
    return (
        <SafeAreaView styles={styles.container}>
            <Text>Profile Screen</Text>
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