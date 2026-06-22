import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { createTicket, getClients } from "../week3/api";
import { useAuth } from "../week4/AuthContext";

export default function CreateTicketScreen({ onTicketCreated, onBack }) {
  const { token } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [clientId, setClientId] = useState("");
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchClients() {
      try {
        const data = await getClients(token);
        setClients(data);
        if (data.length > 0) setClientId(data[0]._id);
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
    fetchClients();
  }, []);

  async function handleCreate() {
    if (title === "" || description === "" || clientId === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await createTicket(token, title, description, priority, clientId);
      Alert.alert("Success", "Ticket created successfully!");
      onTicketCreated();
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Add a Ticket</Text>

      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.sectionLabel}>Priority</Text>
      <View style={styles.optionRow}>
        {["low", "medium", "high"].map((p) => (
          <TouchableOpacity
            key={p}
            style={[styles.optionButton, priority === p && styles.optionSelected]}
            onPress={() => setPriority(p)}
          >
            <Text style={[styles.optionText, priority === p && styles.optionTextSelected]}>
              {p}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>Client</Text>
      <View style={styles.optionRow}>
        {clients.map((c) => (
          <TouchableOpacity
            key={c._id}
            style={[styles.optionButton, clientId === c._id && styles.optionSelected]}
            onPress={() => setClientId(c._id)}
          >
            <Text style={[styles.optionText, clientId === c._id && styles.optionTextSelected]}>
              {c.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 16 }} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleCreate}>
          <Text style={styles.buttonText}>Add Ticket</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  backButton: {
    marginTop: 40,
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: "#007AFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
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
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    marginTop: 4,
    textTransform: "uppercase",
  },
  optionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  optionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  optionSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
    textTransform: "capitalize",
  },
  optionTextSelected: {
    color: "#fff",
    fontWeight: "bold",
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
});