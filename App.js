// import the screens
import Start from "./components/Start";
import Chat from "./components/Chat";

//firestore initialization
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDAnynqx9sa7xtidZsOwo4ExPueE01Bodg",
    authDomain: "chatapp-99785.firebaseapp.com",
    projectId: "chatapp-99785",
    storageBucket: "chatapp-99785.appspot.com",
    messagingSenderId: "217827256422",
    appId: "1:217827256422:web:d0924f5977b82dc01625a7",
    measurementId: "G-4S6M21HNK5",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat}>
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
