import React, { useLayoutEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import {AntDesign, FontAwesome, Ionicons} from '@expo/vector-icons';
import { SafeAreaView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
import { ScrollView } from 'react-native';
import { TextInput } from 'react-native';
import { Keyboard } from 'react-native';
import firebase from "firebase";
import {auth, db} from '../firebase';

const ChatScreen = ({navigation, route}) => {
    const [input, setinput] = useState('');
    const [messages, setmessages] = useState([]);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Chat',
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Avatar rounded source={{uri: "https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png"}}></Avatar>
                    <Text style={{color: 'white', marginLeft: 10, fontWeight: "700",}}>{ route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{marginLeft: 10,}} onPress={navigation.goBack}>
                    <AntDesign name="arrowleft" size={24} color="#fff"></AntDesign>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 80, marginRight: 20}}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="#fff"></FontAwesome>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="#fff"></Ionicons>
                    </TouchableOpacity>
                </View>
            )
        });
    }, [navigation])

    const sendMessage = () => {
        Keyboard.dismiss();

        db.collection('chats').doc(route.params.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        })

        setinput("");
    }

    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp', 'desc').onSnapshot(snapshot =>setmessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ));

        return unsubscribe;
    }, [route]);

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <StatusBar style="light"></StatusBar>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <>
                        <ScrollView>

                        </ScrollView>
                        <View style={styles.footer}>
                            <TextInput 
                                placeholder="Signal Message" 
                                value={input}
                                style={styles.textInput} 
                                onChangeText={(text) => setinput(text)} 
                                onSubmitEditing={sendMessage}></TextInput>
                            <TouchableOpacity activeOpacity={0.5} onPress={sendMessage}>
                                <Ionicons name="send" size={24} color="#2b68e6"></Ionicons>
                            </TouchableOpacity>
                        </View>
                    </>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        backgroundColor: '#ececec',
        padding: 10,
        color: "grey",
        borderRadius: 30
    }
})
