import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Pressable,
  TouchableWithoutFeedback,
  FlatList,
  ScrollView,
  Image,
  Keyboard
} from "react-native";
import { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function LoginScreen () {
    const navigation = useNavigation();
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ isHidden, setIsHidden ] = useState(true)
    const [ disableSubmit, setDisableSubmit ] = useState(true)
    const [ submitOpacity, setSubmitOpacity ] = useState(1)
    const [ errorMsg, setErrorMsg ] = useState(false)

    const checkPassword = (pw) => {
        setPassword(pw)
        if (pw.length >= 6) {
            setDisableSubmit(false)
            setErrorMsg(false)
        }
        else if (pw.length == 0) {
            setErrorMsg(false)
        }
        else {
            setDisableSubmit(true)
        }
    }

    const handleLogin = async () => {
        if (!disableSubmit) {
            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log(user.uid);
              navigation.replace("HomeNavigator");
              // console.log(process.env.COMET_CHAT_AUTH_KEY)
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
            });
        }
        else {
            setErrorMsg(true)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Crypto Market App</Text>
            <View style={styles.inputs}>
                <View style={styles.input}>
                  <TextInput 
                      style={styles.pwtextinput}
                      onChangeText={(email) => setEmail(email)}
                      placeholder={'email'}
                      value={email}/>
                </View>
                <View style={styles.pwinput}>
                    <TextInput 
                        style={styles.pwtextinput}
                        onChangeText={(password) => checkPassword(password)}
                        placeholder={'password'}
                        secureTextEntry={isHidden}
                        value={password}/>
                    <Feather name={isHidden ? "eye" : "eye-off"} style={styles.eye} size={24} onPress={() => setIsHidden(isHidden => !isHidden)} />
                </View>
                {errorMsg && <Text style={{color: "red", margin: 5 }}> Password must be at least 6 characters </Text>}
                <View style={styles.submitWrapper}>
                  <Pressable 
                    disable={disableSubmit} 
                    style={{...styles.submitBtn, backgroundColor: disableSubmit ? "grey" : "#000080", opacity: submitOpacity}} 
                    onPressIn={()=>setSubmitOpacity(0.5)}
                    onPressOut={()=>setSubmitOpacity(1)}
                    onPress={() => handleLogin()}>
                      <Text style={{fontSize: 20, color: 'white'}}>Login</Text>
                  </Pressable>
                </View>
            </View>
            <View style={styles.inline}>
                <Text>Not a member?</Text> 
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}> 
                    <Text style={styles.signup}> Sign Up </Text> 
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'top',
        width: '100%',
        height: '100%',
    },
    title: {
      fontWeight: '600',
      marginTop: 100,
      fontSize: 30
    },
    submitBtn: {
        width: '100%',
        height: '100%',
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitWrapper: {
      borderRadius: 100,
      width: '80%',
      height: '15%',
      margin: 10,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderRadius: 100,
        width: '80%',
        height: '15%',
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    pwtextinput: {
        flex: 1
    },
    eye:{
        padding: 4
    },
    pwinput: {
        borderWidth: 1,
        borderRadius: 100,
        width: '80%',
        height: '15%',
        padding: 10,
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputs: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // backgroundColor: 'lightgrey',
    },
    scrollview: {
        flexGrow: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%'
    },
    inline: {
        flexDirection: 'row',
        marginTop: 20
    },
    signup: {
        textDecorationLine: 'underline'
    },
    forgotText: {
        textDecorationLine: 'underline',
        marginLeft: 'auto'
    }
});