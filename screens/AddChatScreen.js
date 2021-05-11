import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button } from 'react-native-elements'
import { Icon } from 'react-native-elements';
import {auth, db} from '../firebase';

const AddChatScreen = ({navigation}) => {
    const [input, setinput] = useState('');

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input
        })
        .then(() => {
            navigation.goBack();
        })
        .catch(err => alert(err));
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add a new Chat',
            headerBackTitle: "Chats"
        })
        return () => {
            
        };
    }, [navigation])

    return (
        <View style={styles.conatiner}>
            <Input 
                placeholder="Enter a chat name" 
                value={input}
                onChangeText={(val) => setinput(val)}
                leftIcon={
                    <Icon name="wechat" type="antdesign" size={24} color="black"></Icon>
                }
                onSubmitEditing={createChat}
                ></Input>
                <Button onPress={createChat} title="Create Chat"></Button>
        </View>
    )
}

export default AddChatScreen

const styles = StyleSheet.create({
    conatiner: {
        backgroundColor: '#fff',
        padding: 30,
        height: "100%"
    }
})
