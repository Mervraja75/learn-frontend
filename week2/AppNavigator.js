import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import SignUpScreen from "../week3/SignUpScreen";
import { AuthProvider } from "../week4/AuthContext";
import ClientDetailScreen from "../week4/ClientDetailScreen";
import ClientsScreen from "../week4/ClientsScreen";
import CreateClientScreen from "../week4/CreateClientScreen";
import LoginScreen from "./LoginScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showCreateClient, setShowCreateClient] = useState(false);
  const [clientsKey, setClientsKey] = useState(0);

  async function handleLogout() {
    await SecureStore.deleteItemAsync("token");
    setIsLoggedIn(false);
  }

  return (
    <AuthProvider>
      <Stack.Navigator>
        {isLoggedIn ? (
          showCreateClient ? (
            <Stack.Screen name="CreateClient" options={{ headerShown: false }}>
              {() => (
                <CreateClientScreen
                  onClientCreated={() => {
                    setShowCreateClient(false);
                    setClientsKey((prev) => prev + 1);
                  }}
                  onBack={() => setShowCreateClient(false)}
                />
              )}
            </Stack.Screen>
          ) : selectedClient ? (
            <Stack.Screen name="ClientDetail" options={{ headerShown: false }}>
              {() => (
                <ClientDetailScreen
                  client={selectedClient}
                  onBack={() => setSelectedClient(null)}
                />
              )}
            </Stack.Screen>
          ) : (
            <Stack.Screen name="Clients" options={{ headerShown: false }}>
              {() => (
                <ClientsScreen
                  key={clientsKey}
                  onViewClient={(client) => setSelectedClient(client)}
                  onCreateClient={() => setShowCreateClient(true)}
                  onLogout={handleLogout}
                />
              )}
            </Stack.Screen>
          )
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
    </AuthProvider>
  );
}