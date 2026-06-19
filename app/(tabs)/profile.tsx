import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../../week4/AuthContext';
import ProfileScreen from '../../week4/ProfileScreen';

export default function ProfileTab() {
  const { token, clearToken } = useAuth();

  if (!token) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please log in to view your profile.</Text>
      </View>
    );
  }

  return <ProfileScreen onLogout={clearToken} />;
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