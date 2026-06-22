import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import SignUpScreen from "../week3/SignUpScreen";
import { useAuth } from "../week4/AuthContext";
import ClientDetailScreen from "../week4/ClientDetailScreen";
import ClientsScreen from "../week4/ClientsScreen";
import CreateClientScreen from "../week4/CreateClientScreen";
import UpdateClientScreen from "../week4/UpdateClientScreen";
import LoginScreen from "./LoginScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { token, clearToken } = useAuth();
  const [showSignUp, setShowSignUp] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showCreateClient, setShowCreateClient] = useState(false);
  const [showEditClient, setShowEditClient] = useState(false);
  const [clientToEdit, setClientToEdit] = useState(null);
  const [clientsKey, setClientsKey] = useState(0);

  async function handleLogout() {
    await clearToken();
  }

  function handleDelete() {
    setSelectedClient(null);
    setClientsKey((prev) => prev + 1);
  }

  function handleEdit(client) {
    setClientToEdit(client);
    setShowEditClient(true);
  }

  return (
    <Stack.Navigator>
      {token ? (
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
        ) : showEditClient ? (
          <Stack.Screen name="EditClient" options={{ headerShown: false }}>
            {() => (
              <UpdateClientScreen
                client={clientToEdit}
                onClientUpdated={() => {
                  setShowEditClient(false);
                  setSelectedClient(null);
                  setClientsKey((prev) => prev + 1);
                }}
                onBack={() => setShowEditClient(false)}
              />
            )}
          </Stack.Screen>
        ) : selectedClient ? (
          <Stack.Screen name="ClientDetail" options={{ headerShown: false }}>
            {() => (
              <ClientDetailScreen
                client={selectedClient}
                onBack={() => setSelectedClient(null)}
                onDelete={handleDelete}
                onEdit={handleEdit}
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
              onSignUp={() => {}}
              onGoToLogin={() => setShowSignUp(false)}
            />
          )}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Login" options={{ headerShown: false }}>
          {() => (
            <LoginScreen
              onLogin={() => {}}
              onGoToSignUp={() => setShowSignUp(true)}
            />
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}