import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const Start = ({ navigation }) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("");

  return (
    //background image for app. starting screen is wraped
    <ImageBackground
      source={require("../assets/Background-Image.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        {/*app start screen with title, text box for username, and color picker */}

        <View style={styles.secondContainer}>
          <Text style={styles.appTitle}>App Title</Text>
        </View>

        <View style={styles.chatOptions}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Type your username here"
          />

          {/*Choose your background color options */}
          <Text>Choose Background Color</Text>
          <View style={styles.colorPickerContainer}>
            {/*black */}
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#090C08" }]}
              onPress={() => setColor("#090C08")}
            ></TouchableOpacity>

            {/*purple */}
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#474056" }]}
              onPress={() => setColor("#474056")}
            ></TouchableOpacity>

            {/*grey */}
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#8A95A5" }]}
              onPress={() => setColor("#8A95A5")}
            ></TouchableOpacity>

            {/*green */}
            <TouchableOpacity
              style={[styles.radioButton, { backgroundColor: "#B9C6AE" }]}
              onPress={() => setColor("#B9C6AE")}
            ></TouchableOpacity>
          </View>

          {/*button will take user to second screen, the chat screen */}
          <Button
            style={styles.button}
            title="Start Chatting"
            onPress={() => navigation.navigate("Chat", { name: name, color: color })}
          />
        </View>
      </View>
      {/*Keyboard covering text input fix */}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  secondContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  appTitle: {
    fontSize: 45,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  chatOptions: {
    flex: 1,
    margin: 10,
    width: "88%",
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    width: "88%",
    height: 60,
    margin: 12,
    padding: 10,
    borderWidth: 1,
  },
  colorPickerContainer: {
    flexDirection: "row",
    width: "70%",
    justifyContent: "space-around",
    margin: 20,
  },
  radioButton: {
    height: 30,
    width: 30,
    borderRadius: 15
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDD",
    padding: 10
  }
});

export default Start;
