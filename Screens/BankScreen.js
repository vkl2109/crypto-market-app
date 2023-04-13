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
  Keyboard,
  Modal
} from "react-native";
import React, { useState, useRef, useEffect } from 'react';
import { Feather, Fontisto, AntDesign, MaterialIcons, FontAwesome, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import Wheel from '../Components/Wheel.js'
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import ConfettiCannon from 'react-native-confetti-cannon';
import { auth, db } from "../firebase";
import { doc, setDoc, getDoc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import { BlurView } from "expo-blur";
import * as Linking from "expo-linking";
import MarqueeText from 'react-native-marquee';

export default function BankScreen () {
    const explosion = useRef(null)
    const rotation = useSharedValue(0);
    const [ modal, setModal ] = useState(false)
    const [currentAngle, setCurrentAngle] = useState(rotation.value);
    const [ celebrate, setCelebrate ] = useState(true)
    const [ value, setValue ] = useState(0)
    const [ total, setTotal ] = useState(0)
    
    const userDoc = doc(db, "users", auth.currentUser.uid);

    useEffect(() => {
      const unsubscribe = onSnapshot(userDoc, (doc) => {
        if (doc.exists()) {
          setTotal(doc.data().total);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });

    return () => unsubscribe();
    },[])

    const animatedStyles = useAnimatedStyle(() => {
      return {
        transform: [{rotateZ: `${rotation.value}deg`}],
      };
    });

      const handleAngle = (value) => {
        setCurrentAngle(parseInt(value.toFixed(), 10));
      };
      const easing = Easing.bezier(0.23, 1, 0.32, 1);
      const gesture = Gesture.Pan().onUpdate(e => {
        rotation.value = withTiming(
          Math.abs(e.velocityY) / 7 + rotation.value,
          {
            duration: 1000,
            easing: easing,
          },
          () => runOnJS(handleAngle)(rotation.value % 360),
        );
      });

    const getCurrentColor = () => {
      if (currentAngle < 91) {
        return 'BitCoin';
      }
      if (currentAngle < 181) {
        return 'DogeCoin';
      }
      if (currentAngle < 271) {
        return 'Tether';
      }
      else {
        return 'Ethereum';
      }
    };

    const getCurrentCoin = () => {
      if (currentAngle < 91) {
        return 'BTC';
      }
      if (currentAngle < 181) {
        return 'DOGE';
      }
      if (currentAngle < 271) {
        return 'USDT';
      }
      else {
        return 'ETH';
      }
    };

    const CurrentIcon = ({ icon }) => {
      return(
        <View style={{margin: 5}}>{icon == "BitCoin" &&
          <FontAwesome5 name="bitcoin" size={20} color="white" />
        }
        {icon == "Ethereum" &&
          <FontAwesome5 name="ethereum" size={20} color="white" />
        }
        {icon == "DogeCoin" &&
          <MaterialCommunityIcons name="dog" size={20} color="white" />
        }
        {icon == "Tether" &&
          <FontAwesome name="money" size={20} color="white" />
        }
        </View>
      )
    }

    const handleClick = async () => {
      getCurrentColor()
      let req = await fetch(`https://api.coinbase.com/v2/prices/${getCurrentCoin()}-USD/buy`)
      let res = await req.json()
      const coinValue = Math.ceil(parseFloat(res.data.amount))
      console.log(coinValue)
      setValue(coinValue)
      if (celebrate) {
        // explosion.current.start()
        try {
          await updateDoc(userDoc, {
            [getCurrentColor()]: increment(1),
            "total": increment(coinValue)
          })
        }
        catch (error) {
            console.log(error.message)
        }
        // setTotal(0)
      }
      setCelebrate(celebrate => !celebrate)
      
    }

    const handleCashOut = () => {
      setModal(modal => !modal)
    }

    const handleLink = async () => {
      try {
        await Linking.openURL('https://consumer.ftc.gov/articles/how-avoid-scam');
      } catch (error) {
        console.log(error.message);
      }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.netTxt}>NET WORTH: ${total}</Text>
            <TouchableOpacity
            style={styles.button('red')}
            onPress={handleClick}>
              {celebrate ?
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <AntDesign name="caretdown" size={50} color="white" />
                <Text style={{marginHorizontal: 10, color: 'white', fontSize: 30, fontWeight: '600'}} >FREE CRYPTO</Text>
                <AntDesign name="caretdown" size={50} color="white" />
              </View>
              :
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <Fontisto name="spinner-refresh" size={50} color="white" />
                <Text style={{marginHorizontal: 20, color: 'white', fontSize: 40, fontWeight: '600'}}>RESET</Text>
                <Fontisto name="spinner-refresh" size={50} color="white" />
               </View>}
            </TouchableOpacity>
            <GestureDetector gesture={gesture}>
              <View style={styles.circleContainer}>
                <View style={styles.pointer} />
                <Animated.View style={[styles.circle, animatedStyles]}>
                  <Wheel />
                </Animated.View>
              </View>
            </GestureDetector>
          <View style={{height: '10%', marginTop: 10, alignItems: 'center'}}>
            {celebrate ? 
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.spinTxt}>SPIN WHEEL</Text>
              <MaterialIcons name="touch-app" size={35} color="white" />
            </View>
            :
            <>
              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.text}>YOU WON: {getCurrentColor()}</Text>
                <CurrentIcon icon={getCurrentColor()}/>
              </View>
              <Text style={styles.text}>Value: ${value} (CMV)</Text>
            </>}
          </View>
          <TouchableOpacity
            style={styles.button('green')}
            onPress={handleCashOut}>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
              <MaterialIcons name="attach-money" size={50} color="white" />
              <Text style={{marginHorizontal: 20, color: 'white', fontSize: 40, fontWeight: '600'}}>CASH OUT</Text>
              <MaterialIcons name="attach-money" size={50} color="white" />
            </View>
          </TouchableOpacity>
          <Modal 
          animationType="fade"
          transparent={true}
          visible={modal}
          onRequestClose={() => setModal(!modal)}>
            <BlurView 
            style={styles.modalWrapper}
            intensity={10}>
              <TouchableOpacity
              style={styles.modalWrapper}
              onPress={() => setModal(!modal)}>
                <TouchableWithoutFeedback>
                  <View style={styles.innerModalWrapper}>
                    <Text style={{fontWeight: 500, fontSize: 20, margin: 5}}>SOCIAL SECURITY</Text>
                    <View style={styles.pwinput}>
                      <TextInput 
                          style={{flex: 1}}
                          placeholder={'password'}
                          secureTextEntry={true}/>
                      <Feather name={"send"} size={24} onPress={handleLink} />
                  </View>
                    <TouchableOpacity
                    style={styles.closeBtn}
                    onPress={() => setModal(false)}>
                      <AntDesign name="close" size={20} color="#330180" />
                    </TouchableOpacity>
                  </View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </BlurView>
          </Modal>
          <MarqueeText
          style={{ color: 'white', fontSize: 24 }}
          speed={1}
          marqueeOnStart={true}
          loop={true}
          delay={1000}
        >
          hot singles in your area. one bitcoin each. cash out now to gain exclusive access to our models.
        </MarqueeText>
          {/* <ConfettiCannon
            count={200}
            origin={{x: -10, y: 0}}
            autoStart={false}
            ref={explosion}
          />         */}
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  button:(c) => ({
    backgroundColor: c,
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 20,
    width: '90%',
    height: '12%',
    padding: 20,
    marginBottom: 40,
  }),
  netTxt: {
    color: 'white',
    fontSize: 30,
    marginBottom: 20
  },
  pwinput: {
        borderWidth: 1,
        borderRadius: 100,
        width: '80%',
        height: 50,
        paddingHorizontal: 15,
        paddingVertical: 10,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
   text: {
    color: 'white',
    fontSize: 16,
    marginVertical: 5
  },
  spinTxt: {
    color: 'white',
    fontSize: 30,
    marginVertical: 10
  },
  infoBox: {
    marginTop: 15,
    height: 40,
    justifyContent: 'space-between',
  },
  circleRow: {width: '100%', height: '50%', flexDirection: 'row'},
  pizza: {width: '50%', height: '100%'},
  pizzaRed: {backgroundColor: '#ce4257'},
  pizzaBlue: {backgroundColor: '#4361ee'},
  pizzaYellow: {backgroundColor: '#fee440'},
  pizzaGreen: {backgroundColor: '#06d6a0'},
  circle: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 150,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: '#ced4da',
  },
  closeBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    marginRight: 10,
    marginTop: 10,
  },
  modalWrapper: {
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  innerModalWrapper: {
    height: 'auto',
    width: '80%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  ball: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignSelf: 'center',
  },
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#343a40',
  },
  circleContainer: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pointer: {
    width: 10,
    height: 30,
    backgroundColor: 'black',
    position: 'absolute',
    top: -15,
    borderWidth: 2,
    borderColor: 'white',
    zIndex: 6000,
  },
})