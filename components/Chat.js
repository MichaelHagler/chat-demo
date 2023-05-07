import { useEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Platform } from "react-native";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";

//offline storage so messages can be viewed offline
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected, storage }) => {
  //sets name and background color from start screen input and color picker
  //Values called from signInUser() in Start.js
  const { name, color } = route.params;

  //used to set static messages for testing
  const [messages, setMessages] = useState([]);

  let unsubMessages;

  useEffect(() => {
    if (isConnected === true) {
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else {
      loadCachedMessages();
    }

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  //loads the cached messages from AsyncStorage
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };
  //store messages to AsyncStorage
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  //uses addMessageItem callback
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  //disable chat bar when app is offline
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
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
      renderInputToolbar={renderInputToolbar}
        messages={messages}
        renderBubble={renderBubble}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: route.params.userID,
          name: route.parms,
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
