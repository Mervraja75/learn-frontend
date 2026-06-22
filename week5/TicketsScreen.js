import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    RefreshControl,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { getTickets } from "../week3/api";
import { useAuth } from "../week4/AuthContext";

export default function TicketsScreen({ onViewTicket, onCreateTicket }) {
  const { token } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchTickets() {
    try {
      const data = await getTickets(token);
      setTickets(data);
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchTickets();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTickets();
  }, []);

  function getPriorityColor(priority) {
    switch (priority) {
      case "high": return "#FF3B30";
      case "medium": return "#FF9500";
      case "low": return "#34C759";
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
      <Text style={styles.title}>Tickets</Text>

      <FlatList
        data={tickets}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.ticketCard}
            onPress={() => onViewTicket(item)}
          >
            <View style={styles.ticketHeader}>
              <Text style={styles.ticketTitle}>{item.title}</Text>
              <Text style={[styles.priority, { color: getPriorityColor(item.priority) }]}>
                {item.priority}
              </Text>
            </View>
            <Text style={styles.ticketStatus}>{item.status}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tickets yet. Add one!</Text>
        }
      />

      <TouchableOpacity style={styles.createButton} onPress={onCreateTicket}>
        <Text style={styles.createButtonText}>+ Add Ticket</Text>
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
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 40,
  },
  ticketCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
  },
  priority: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  ticketStatus: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
    textTransform: "capitalize",
  },
  createButton: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 40,
    fontSize: 16,
  },
});