import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "./AuthContext";

export default function ProfileScreen({ onLogout }) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name || "N/A"}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Username</Text>
        <Text style={styles.value}>{user?.username || "N/A"}</Text>

        <View style={styles.divider} />

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email || "N/A"}</Text>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 40,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  label: {
    fontSize: 12,
    color: "#999",
    textTransform: "uppercase",
    marginBottom: 4,
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginTop: 12,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});