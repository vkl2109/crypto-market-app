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
import React, { useState, useRef } from 'react';
import { AntDesign } from '@expo/vector-icons';
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

export default function BankScreen () {
    const explosion = useRef(null)
    const rotation = useSharedValue(0);
    const [currentAngle, setCurrentAngle] = useState(rotation.value);
    const [ celebrate, setCelebrate ] = useState(true)
    const [ value, setValue ] = useState(0)

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

    const handleClick = async () => {
      getCurrentColor()
      let req = await fetch(`https://api.coinbase.com/v2/prices/${getCurrentCoin()}-USD/buy`)
      let res = await req.json()
      setValue(res.data.amount)
      if (celebrate) {
        explosion.current.start()
      }
      setCelebrate(celebrate => !celebrate)
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
            style={styles.button}
            onPress={handleClick}>
              {celebrate ?
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                <AntDesign name="caretdown" size={50} color="white" />
                <Text style={{marginHorizontal: 10, color: 'white', fontSize: 30}} >FREE CRYPTO</Text>
                <AntDesign name="caretdown" size={50} color="white" />
              </View>
              :
              <Text style={{color: 'white', fontSize: 30}}>RESET</Text>
              }
            </TouchableOpacity>
            <GestureDetector gesture={gesture}>
              <View style={styles.circleContainer}>
                <View style={styles.pointer} />
                <Animated.View style={[styles.circle, animatedStyles]}>
                  <Wheel />
                </Animated.View>
              </View>
            </GestureDetector>
          {!celebrate && 
          <View style={{marginTop: 10, alignItems: 'center'}}>
            <Text style={styles.text}>You just won: {getCurrentColor()}</Text>
            <Text style={styles.text}>Value: ${value}</Text>
          </View>}
          <ConfettiCannon
            count={200}
            origin={{x: -10, y: 0}}
            autoStart={false}
            ref={explosion}
          />        
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: "center",
    borderRadius: 20,
    width: '90%',
    padding: 20,
    marginVertical: 40,
  },
   text: {
    color: 'white',
    fontSize: 16,
    marginVertical: 5
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