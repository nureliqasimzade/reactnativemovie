import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMovies } from "../context/MovieContext";

export default function ProfileScreen() {
  const { movies } = useMovies();

  const savedCount = movies.filter((movie) => movie.saved).length;

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.userBox}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={50} color="#5B3FF0" />
        </View>
        <Text style={styles.name}>John Doe</Text>
        <Text style={styles.subtitle}>Movie Lover 🎬</Text>
      </View>

      <View style={styles.statsBox}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{savedCount}</Text>
          <Text style={styles.statLabel}>Saved Movies</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{movies.length}</Text>
          <Text style={styles.statLabel}>All Movies</Text>
        </View>
      </View>

      <View style={styles.menu}>
        <View style={styles.menuItem}>
          <Ionicons name="heart-outline" size={22} color="#000" />
          <Text style={styles.menuText}>My Saved Movies</Text>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </View>

        <View style={styles.menuItem}>
          <Ionicons name="information-circle-outline" size={22} color="#000" />
          <Text style={styles.menuText}>About App</Text>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </View>

        <View style={styles.menuItem}>
          <Ionicons name="settings-outline" size={22} color="#000" />
          <Text style={styles.menuText}>Settings</Text>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </View>

        <View style={[styles.menuItem, { borderBottomWidth: 0 }]}>
          <Ionicons name="log-out-outline" size={22} color="red" />
          <Text style={[styles.menuText, { color: "red" }]}>Logout</Text>
          <Ionicons name="chevron-forward" size={20} color="#000" />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 12,
  },
  userBox: {
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E8E3FF",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 12,
  },
  subtitle: {
    color: "gray",
    marginTop: 4,
  },
  statsBox: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    padding: 14,
    backgroundColor: "#F5F3FF",
    borderRadius: 12,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5B3FF0",
  },
  statLabel: {
    color: "gray",
    marginTop: 4,
  },
  menu: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 12,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  menuText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
  },
});
