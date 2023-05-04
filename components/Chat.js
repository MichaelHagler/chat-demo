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
  where,
} from "firebase/firestore";
import { Bubble, GiftedChat } from "react-native-gifted-chat";

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

      // pulls chats from the db and creates a date for each entry
      const q = query(collection(db, "messages"), orderBy("creatdAt", "desc"));
      unsubMessages = onSnapshot(q, (documentsSnapshot) => {
        let newMessages = [];
        documentsSnapshot.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessage);
        setMessages(newMessages);
      });
    } else {
      loadCachedMesages();
    }

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  //when new message is sent it appends it to chat
  const onSend = (newMessages) => {
    addDoc(collection(db, "message"), newMessages[0]);
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
          userId: route.params,
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
