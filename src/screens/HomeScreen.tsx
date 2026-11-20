import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MovieCard from "../components/MovieCard";
import { useMovies } from "../context/MovieContext";

export default function HomeScreen() {
  const { movies } = useMovies();
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>Movies</Text>
        <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
          <Ionicons name="search" size={26} color="#000" />
        </TouchableOpacity>
      </View>

      {showSearch && (
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholder="Search movie by name"
        />
      )}

      <FlatList
        data={filteredMovies}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() =>
              router.push({ pathname: "/details", params: { id: item.id } })
            }
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No movies found</Text>}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 8,
  },
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "gray",
  },
});
