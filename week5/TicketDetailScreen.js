import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getTicket } from "../week3/api";
import { useAuth } from "../week4/AuthContext";

export default function TicketDetailScreen({ ticket, onBack }) {
  const { token } = useAuth();
  const [ticketDetail, setTicketDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTicket() {
      try {
        const data = await getTicket(token, ticket._id);
        setTicketDetail(data);
      } catch (error) {
        Alert.alert("Error", error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchTicket();
  }, []);

  function getPriorityColor(priority) {
    switch (priority) {
      case "high": return "#FF3B30";
      case "medium": return "#FF9500";
      case "low": return "#34C759";
      default: return "#999";
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "new": return "#007AFF";
      case "in progress": return "#FF9500";
      case "on hold": return "#999";
      case "closed": return "#34C759";
      default: return "#999";
    }
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>{ticketDetail.title}</Text>

        <View style={styles.row}>
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: getPriorityColor(ticketDetail.priority) }]}>
              {ticketDetail.priority} priority
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={[styles.badgeText, { color: getStatusColor(ticketDetail.status) }]}>
              {ticketDetail.status}
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{ticketDetail.description}</Text>

        <Text style={styles.label}>Client</Text>
        <Text style={styles.value}>
          {ticketDetail.client_id?.name || "N/A"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginTop: 40,
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    color: "#007AFF",
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 16,
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
    lineHeight: 24,
  },
});