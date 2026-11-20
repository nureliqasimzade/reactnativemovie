import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMovies } from "../context/MovieContext";

export default function DetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { movies, toggleSave } = useMovies();

  const movie = movies.find((m) => m.id === id);

  if (!movie) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Movie not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView>
        <View>
          {movie.imageUrl ? (
            <Image source={{ uri: movie.imageUrl }} style={styles.image} />
          ) : (
            <View style={[styles.image, styles.noImage]}>
              <Ionicons name="image-outline" size={60} color="gray" />
            </View>
          )}

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{movie.name}</Text>
            <TouchableOpacity onPress={() => toggleSave(movie.id)}>
              <Ionicons
                name={movie.saved ? "bookmark" : "bookmark-outline"}
                size={28}
                color="#fff"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            {movie.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>⭐ {movie.imdbRating.toFixed(1)}</Text>
              <Text style={styles.statLabel}>IMDb</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>🍅 {movie.rotten}</Text>
              <Text style={styles.statLabel}>Rotten</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>🕒 {movie.duration}</Text>
              <Text style={styles.statLabel}>Duration</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Genre</Text>
          <View style={styles.row}>
            {movie.genre.map((g) => (
              <View key={g} style={styles.genre}>
                <Text style={styles.text}>{g}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{movie.description}</Text>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => toggleSave(movie.id)}
          >
            <Text style={styles.saveButtonText}>
              {movie.saved ? "Unsave" : "Save"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#141826",
  },
  image: {
    width: "100%",
    height: 320,
  },
  noImage: {
    backgroundColor: "#2A2F42",
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 8,
    borderRadius: 20,
  },
  content: {
    padding: 20,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tag: {
    backgroundColor: "#2A2F42",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  tagText: {
    color: "#fff",
    fontWeight: "bold",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#aaa",
    marginTop: 4,
  },
  sectionTitle: {
    color: "#ccc",
    fontSize: 16,
    marginTop: 24,
  },
  genre: {
    backgroundColor: "#2A2F42",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    marginRight: 8,
  },
  text: {
    color: "#fff",
  },
  description: {
    color: "#ddd",
    marginTop: 8,
    lineHeight: 22,
  },
  saveButton: {
    backgroundColor: "#5B3FF0",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
