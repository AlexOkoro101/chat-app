import React, { useEffect, useLayoutEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native'
import { Avatar } from 'react-native-elements';
import CustomListItem from '../components/CustomListItem';
import {auth, db} from '../firebase';
import {AntDesign, SimpleLineIcons,} from '@expo/vector-icons';

const HomeScreen = ({navigation}) => {
    const [chats, setchats] = useState([])

    const signOutUser = () => {
        auth.signOut()
        .then(() => {
            navigation.replace('Login');
        })
    }

    useEffect(() => {
        const unsubscribe = db.collection('chats').onSnapshot((snapshot) =>
            setchats(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        ));

        return unsubscribe
    }, []) 

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Signal',
            headerStyle: { backgroundColor: '#fff'},
            headerTitleStyle: {color: 'black'},
            headerTintColor: 'black',
            headerLeft: () => (
                <View style={{marginLeft: 20}}>
                    <TouchableOpacity activeOpacity={0.5} onPress={signOutUser}>
                        <Avatar 
                            rounded
                            source={{ uri: auth?.currentUser?.photoURL }}>
                        </Avatar>
                    </TouchableOpacity>
                </View>
            ),
            headerRight: () => (
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width: 80, marginRight: 20}}>
                    <TouchableOpacity activeOpacity={0.5}>
                        <AntDesign name="camerao" size={24} color="black"></AntDesign>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate("AddChat")}>
                        <SimpleLineIcons name="pencil" size={24} color="black"></SimpleLineIcons>
                    </TouchableOpacity>
                </View>
            )
        })
        return () => {
            
        };
    }, [navigation]);

    const enterChat = (id, chatName) => {
        navigation.navigate('Chat', {
            id: id,
            chatName: chatName
        })
    };

    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                {chats.map(({id, data: {chatName}}) => (
                    <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}></CustomListItem>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
    }
})
