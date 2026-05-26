import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import ProfileCard from "../week1/ProfileCard";
import LoginScreen from "./LoginScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen name="Home">
          {() => <ProfileCard onLogout={() => setIsLoggedIn(false)} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {() => <LoginScreen onLogin={() => setIsLoggedIn(true)} />}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}