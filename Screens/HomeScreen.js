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
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import React, { useState, useEffect } from 'react';
import { FontAwesome, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";


export default function HomeScreen () {
    const [ bitCoin, setBitCoin] = useState(0)
    const [ dogeCoin, setDogeCoin] = useState(0)
    const [ ethereum, setEthereum] = useState(0)
    const [ tether, setTether] = useState(0)

    const userDoc = doc(db, "users", auth.currentUser.uid);

    useEffect(() => {
      const unsubscribe = onSnapshot(userDoc, (doc) => {
        if (doc.exists()) {
          setBitCoin(doc.data().BitCoin);
          setDogeCoin(doc.data().DogeCoin);
          setEthereum(doc.data().Ethereum);
          setTether(doc.data().Tether);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
    return () => unsubscribe();
    },[])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.quarterView("#ce4257")}>
              <Text style={styles.sectionTitle}>BitCoin: {bitCoin}</Text>
              <FlatList horizontal={true}
              data={[...Array(bitCoin)]}
              renderItem={({item}) => <FontAwesome5 name="bitcoin" size={50} color="white" />}
              />
            </View>
            <View style={styles.quarterView("#fee440")}>
              <Text style={styles.sectionTitle}>DogeCoin: {dogeCoin}</Text>
              <FlatList horizontal={true}
              data={[...Array(dogeCoin)]}
              renderItem={({item}) => <FontAwesome5 name="ethereum" size={50} color="white" />}
              />
            </View>
            <View style={styles.quarterView("#4361ee")}>
              <Text style={styles.sectionTitle}>Ethereum: {ethereum}</Text>
              <FlatList horizontal={true}
              data={[...Array(ethereum)]}
              renderItem={({item}) => <MaterialCommunityIcons name="dog" size={50} color="white" />}
              />
            </View>
            <View style={styles.quarterView("#06d6a0")}>
              <Text style={styles.sectionTitle}>Tether: {tether}</Text>
              <FlatList horizontal={true}
              data={[...Array(tether)]}
              renderItem={({item}) => <FontAwesome name="money" size={50} color="white" />}
              />
            </View>
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
  quarterView: (value) => ({
    backgroundColor: value,
    width: '100%',
    height: '25%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  coinWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'scroll'
  },
  sectionTitle: {
    color: 'white',
    fontSize: 30,
    marginVertical: 20
  }
})