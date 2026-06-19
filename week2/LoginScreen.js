import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { login } from "../week3/api";
import { useAuth } from "../week4/AuthContext";

export default function LoginScreen({ onLogin, onGoToSignUp }) {
  const { saveToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (email === "" || password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await login(email, password);
      await saveToken(response.token, response.user);
      onLogin();
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 16 }} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={onGoToSignUp} style={styles.signUpLink}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signUpLink: {
    marginTop: 16,
    alignItems: "center",
  },
  signUpText: {
    color: "#007AFF",
    fontSize: 14,
  },
});