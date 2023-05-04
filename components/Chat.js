import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  //sets name and background color from start screen input and color picker
  //Values called from signInUser() in Start.js
  const { name, color } = route.params;

  //used to set static messages for testing
  const [messages, setMessages] = useState([]);


  useEffect(() => {
    navigation.setOptions({ title: name });
    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
        })
      })
      setMessages(newMessages);
    })
    return () => {
      if (unsubMessages) unsubMessages();
    }
   }, []);

  //when new message is sent it appends it to chat
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  //creates styled text bubbles (left white, right black)
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#000",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  return (
    //Background color has been set from start screen
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: route.params.userID,
          name: route.parms
        }}
      />
      {/*Keyboard covering text input fix */}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
