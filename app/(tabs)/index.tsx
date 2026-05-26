import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ProfileCard from "../../week1/ProfileCard";
import LoginScreen from "../../week2/LoginScreen";

export default function HomeScreen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <ProfileCard onLogout={() => setIsLoggedIn(false)} />
      ) : (
        <LoginScreen onLogin={() => setIsLoggedIn(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});