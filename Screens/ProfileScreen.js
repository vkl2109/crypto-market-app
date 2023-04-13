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
        <SafeAreaView style={styles.container}>
            <Text>Profile Screen</Text>
            <View style={styles.avatar}>
              <Image style={styles.avatarImg} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: '#343a40',
    // backgroundColor: "#F3EDF7",
  },
})