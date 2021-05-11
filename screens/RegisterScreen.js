import React, { useLayoutEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView } from 'react-native';
import { StyleSheet, View } from 'react-native';
import {Button, Input, Text,} from 'react-native-elements';
import { auth } from '../firebase';

const RegisterScreen = ({navigation}) => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [imageUrl, setimageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Back to Login",
        })
        
    }, [navigation]);

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"
            })
        })
        .catch((error) => alert(error.message))
    }

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="Light"></StatusBar>
            <Text h3 style={{marginBottom: 50}}>
                Create a Signal account
            </Text>

            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full Name" 
                    autoFocus 
                    type="text" 
                    value={name}
                    onChangeText={(val) => setname(val)}>
                </Input>
                <Input 
                    placeholder="Email" 
                    type="email" 
                    value={email}
                    onChangeText={(val) => setemail(val)}>
                </Input>
                <Input 
                    placeholder="Password" 
                    type="password" 
                    value={password}
                    secureTextEntry
                    onChangeText={(val) => setpassword(val)}>
                </Input>
                <Input 
                    placeholder="Profile Picture URL (optional)" 
                    type="text" 
                    value={imageUrl}
                    onChangeText={(val) => setimageUrl(val)}
                    onSubmitEditing={register}>
                </Input>
            </View>
            <Button containerStyle={styles.button} raised title="Register" onPress={register}></Button>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: '#fff'
    },
    button: {
        width: 200,
        marginTop: 10
    },
    inputContainer: {
        width: 300,

    }
})
