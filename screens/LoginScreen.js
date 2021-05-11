import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Button, Input, Image} from 'react-native-elements';
import { KeyboardAvoidingView } from 'react-native';
import { auth } from '../firebase';

const LoginScreen = ({navigation}) => {
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser)
            if(authUser) {
                navigation.replace("Home");
            }
        });

        return unsubscribe;
    }, []);

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password)
        .catch((err) => alert(err))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="Light"></StatusBar>
            <Image 
                source={{
                    uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",

                }}
                style={{ width: 200, height: 200}}
            ></Image>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autoFocus type="email" 
                    value={email} 
                    onChangeText={val => setemail(val)}>
                </Input>
                <Input 
                    placeholder="Password" 
                    type="password" 
                    secureTextEntry
                    value={password} 
                    onChangeText={val => setpassword(val)}
                    onSubmitEditing={signIn}>
                </Input>
            </View>

            <Button containerStyle={styles.button} title="Login" onPress={signIn}></Button>
            <Button containerStyle={styles.button} title="Register" type="outline" onPress={() => navigation.navigate('Register')}></Button>
            <View style={{height: 100}}></View>
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'white'
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        marginTop: 10
    }
})
