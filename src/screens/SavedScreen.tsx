import { router } from "expo-router";
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../context/MovieContext";

export default function SavedScreen() {
  const { movies, toggleSave } = useMovies();

  const savedMovies = movies.filter((movie) => movie.saved);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Text style={styles.title}>Saved Movies</Text>

      <FlatList
        data={savedMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            showBookmark={true}
            onBookmarkPress={() => toggleSave(item.id)}
            onPress={() =>
              router.push({ pathname: "/details", params: { id: item.id } })
            }
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No saved movies</Text>}
      />
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
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "gray",
    fontSize: 16,
  },
});
