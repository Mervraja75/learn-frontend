import { SetStateAction, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../week4/AuthContext';
import CreateTicketScreen from '../../week5/CreateTicketScreen';
import TicketDetailScreen from '../../week5/TicketDetailScreen';
import TicketsScreen from '../../week5/TicketsScreen';

export default function TicketsTab() {
  const { token } = useAuth();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [ticketsKey, setTicketsKey] = useState(0);

  if (!token) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please log in to view tickets.</Text>
      </View>
    );
  }

  if (showCreateTicket) {
    return (
      <CreateTicketScreen
        onTicketCreated={() => {
          setShowCreateTicket(false);
          setTicketsKey((prev) => prev + 1);
        }}
        onBack={() => setShowCreateTicket(false)}
      />
    );
  }

  if (selectedTicket) {
    return (
      <TicketDetailScreen
        ticket={selectedTicket}
        onBack={() => setSelectedTicket(null)}
      />
    );
  }

  return (
    <TicketsScreen
      key={ticketsKey}
      onViewTicket={(ticket: SetStateAction<null>) => setSelectedTicket(ticket)}
      onCreateTicket={() => setShowCreateTicket(true)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  text: {
    fontSize: 16,
    color: '#999',
  },
});