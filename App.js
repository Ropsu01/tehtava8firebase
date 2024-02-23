import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { firestore, collection, addDoc, serverTimestamp, MESSAGES, query, onSnapshot } from './firebase/Config';
import { convertFirebaseTimesStampToJS } from './helper/Functions';
import { orderBy } from 'firebase/firestore';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const save = async () => {
    const docRef = await addDoc(collection(firestore, MESSAGES), {
      text: newMessage,
      created: serverTimestamp()
    }).catch(error => console.log(error));
    setNewMessage('');
    console.log('Message saved.');
  };

  useEffect(() => {
    const q = query(collection(firestore, MESSAGES), orderBy('created', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const tempMessages = [];

      querySnapshot.forEach((doc) => {
        const messageObject = {
          id: doc.id,
          text: doc.data().text,
          created: convertFirebaseTimesStampToJS(doc.data().created)
        };
        tempMessages.push(messageObject);
      });
      setMessages(tempMessages);
    });
    return () => unsubscribe();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView>
          {messages.map((message) => (
            <View style={styles.message} key={message.id}>
              <Text style={styles.messageInfo}>{message.created}</Text>
              <Text>{message.text}</Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Send message...'
            value={newMessage}
            onChangeText={text => setNewMessage(text)}
            style={styles.textInput}
          />
          <Button title='Send' onPress={save} />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  message: {
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10
  },
  messageInfo: {
    fontSize: 12
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    borderTopColor: '#E8E8E8',
    borderTopWidth: 1,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    padding: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 20,
    marginRight: 10,
  },
});
