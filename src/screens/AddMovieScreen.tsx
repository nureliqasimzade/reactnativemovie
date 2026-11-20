import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tag, useMovies } from "../context/MovieContext";

const allTags: Tag[] = ["2D", "3D", "IMAX", "4D"];

const allGenres = [
  "Action",
  "Adventure",
  "Comedy",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Sci-Fi",
];

export default function AddMovieScreen() {
  const { addMovie } = useMovies();

  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [showGenres, setShowGenres] = useState(false);
  const [imdbRating, setImdbRating] = useState("");
  const [rotten, setRotten] = useState("");
  const [duration, setDuration] = useState("");

  const toggleTag = (tag: Tag) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      setTags([...tags, tag]);
    }
  };

  const toggleGenre = (genre: string) => {
    if (genres.includes(genre)) {
      setGenres(genres.filter((g) => g !== genre));
    } else {
      setGenres([...genres, genre]);
    }
  };

  const handleAdd = () => {
    if (
      !name.trim() ||
      !description.trim() ||
      !imdbRating.trim() ||
      !rotten.trim() ||
      !duration.trim()
    ) {
      Alert.alert("Error", "Please fill all required fields!");
      return;
    }

    if (tags.length === 0) {
      Alert.alert("Error", "Please select at least one tag!");
      return;
    }

    if (genres.length === 0) {
      Alert.alert("Error", "Please select at least one genre!");
      return;
    }

    const rating = Number(imdbRating);
    if (isNaN(rating) || rating < 0 || rating > 10) {
      Alert.alert("Error", "IMDb rating must be between 0 and 10!");
      return;
    }

    const rottenNumber = Number(rotten.replace("%", ""));
    if (isNaN(rottenNumber) || rottenNumber < 0 || rottenNumber > 100) {
      Alert.alert("Error", "Rotten must be between 0 and 100!");
      return;
    }

    addMovie({
      id: Date.now().toString(),
      name: name,
      description: description,
      imageUrl: imageUrl,
      tags: tags,
      genre: genres,
      imdbRating: rating,
      duration: duration,
      rotten: rottenNumber + "%",
      saved: false,
    });

    Alert.alert("Success", "Movie added successfully!");

    setImageUrl("");
    setName("");
    setDescription("");
    setTags([]);
    setGenres([]);
    setShowGenres(false);
    setImdbRating("");
    setRotten("");
    setDuration("");

    router.navigate("/");
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ScrollView keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Add Movie</Text>

        <View style={styles.imageRow}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.preview} />
          ) : (
            <View style={styles.preview}>
              <Ionicons name="image-outline" size={34} color="gray" />
            </View>
          )}

          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
              style={styles.input}
              value={imageUrl}
              onChangeText={setImageUrl}
              placeholder="https://..."
              autoCapitalize="none"
            />
          </View>
        </View>

        <Text style={styles.label}>Name *</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Movie name"
        />

        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Movie description"
          multiline
        />

        <Text style={styles.label}>Tags *</Text>
        <View style={styles.row}>
          {allTags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={styles.checkbox}
              onPress={() => toggleTag(tag)}
            >
              <Ionicons
                name={tags.includes(tag) ? "checkbox" : "square-outline"}
                size={22}
                color="#5B3FF0"
              />
              <Text style={{ marginLeft: 4 }}>{tag}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Genre *</Text>
        <TouchableOpacity
          style={styles.select}
          onPress={() => setShowGenres(!showGenres)}
        >
          <Text style={{ color: genres.length > 0 ? "#000" : "gray" }}>
            {genres.length > 0 ? genres.join(", ") : "Select genres"}
          </Text>
          <Ionicons
            name={showGenres ? "chevron-up" : "chevron-down"}
            size={18}
            color="gray"
          />
        </TouchableOpacity>

        {showGenres && (
          <View style={[styles.row, { flexWrap: "wrap" }]}>
            {allGenres.map((genre) => (
              <TouchableOpacity
                key={genre}
                style={[
                  styles.genre,
                  genres.includes(genre) && styles.genreSelected,
                ]}
                onPress={() => toggleGenre(genre)}
              >
                <Text
                  style={{ color: genres.includes(genre) ? "#fff" : "#000" }}
                >
                  {genre}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <Text style={styles.label}>IMDb Rating *</Text>
            <TextInput
              style={styles.input}
              value={imdbRating}
              onChangeText={setImdbRating}
              placeholder="8.6"
              keyboardType="numeric"
            />
          </View>

          <View style={{ flex: 1, marginLeft: 8 }}>
            <Text style={styles.label}>Rotten *</Text>
            <TextInput
              style={styles.input}
              value={rotten}
              onChangeText={setRotten}
              placeholder="72"
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.label}>Duration *</Text>
        <TextInput
          style={styles.input}
          value={duration}
          onChangeText={setDuration}
          placeholder="2h 49m"
        />

        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add Movie</Text>
        </TouchableOpacity>
      </ScrollView>
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
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  imageRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  preview: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
  },
  row: {
    flexDirection: "row",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  select: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
  },
  genre: {
    borderWidth: 1,
    borderColor: "#5B3FF0",
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginTop: 8,
  },
  genreSelected: {
    backgroundColor: "#5B3FF0",
  },
  button: {
    backgroundColor: "#5B3FF0",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
