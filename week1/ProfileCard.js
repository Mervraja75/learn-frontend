import { StyleSheet, Text, View } from "react-native";

export default function ProfileCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>Mervin Raja</Text>
      <Text style={styles.bio}>Computer Science student learning React Native.</Text>
      <Text style={styles.bio}>Building a frontend that connects to a REST API.</Text>
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
});