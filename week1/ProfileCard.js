import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ProfileCard() {
  function handlePress() {
    Alert.alert("Hello!", "Thanks for visiting my profile 👋");
  }

  return (
    <View style={styles.card}>
      <Text style={styles.name}>Mervin Raja</Text>
      <Text style={styles.bio}>Computer Science student learning React Native.</Text>
      <Text style={styles.bio}>Building a frontend that connects to a REST API.</Text>

      <TouchableOpacity style={styles.button} onPress={handlePress}>
        <Text style={styles.buttonText}>Say Hello</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  bio: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});