import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import ProfileCard from "../week1/ProfileCard";
import SignUpScreen from "../week3/SignUpScreen";
import LoginScreen from "./LoginScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  async function handleLogout() {
    await SecureStore.deleteItemAsync("token");
    setIsLoggedIn(false);
  }

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen name="Home" options={{ headerShown: false }}>
          {() => <ProfileCard onLogout={handleLogout} />}
        </Stack.Screen>
      ) : showSignUp ? (
        <Stack.Screen name="SignUp" options={{ headerShown: false }}>
          {() => (
            <SignUpScreen
              onSignUp={() => setIsLoggedIn(true)}
              onGoToLogin={() => setShowSignUp(false)}
            />
          )}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {() => (
            <LoginScreen
              onLogin={() => setIsLoggedIn(true)}
              onGoToSignUp={() => setShowSignUp(true)}
            />
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}