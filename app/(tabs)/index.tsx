import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';
import ProfileCard from '../../week1/ProfileCard';

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <ProfileCard />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
  },
});