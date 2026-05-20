import { useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function ProfileCard() {
  const [note, setNote] = useState("");

  function handlePress() {
    Alert.alert("Hello!", "Thanks for visiting my profile 👋");
  }

  function handleNoteSubmit() {
    Alert.alert("Note saved!", note);
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
      <View style={styles.card}>
        <Text style={styles.name}>Mervin Raja</Text>
        <Text style={styles.bio}>Computer Science student learning React Native.</Text>
        <Text style={styles.bio}>Building a frontend that connects to a REST API.</Text>

        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Say Hello</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Leave a note:</Text>
        <TextInput
          style={styles.input}
          placeholder="Type something..."
          value={note}
          onChangeText={setNote}
        />

        <TouchableOpacity style={styles.button} onPress={handleNoteSubmit}>
          <Text style={styles.buttonText}>Save Note</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  label: {
    marginTop: 16,
    fontSize: 16,
    color: "#333",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
});