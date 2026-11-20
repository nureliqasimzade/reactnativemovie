import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Movie } from "../context/MovieContext";

type Props = {
  movie: Movie;
  onPress: () => void;
  showBookmark?: boolean;
  onBookmarkPress?: () => void;
};

export default function MovieCard({
  movie,
  onPress,
  showBookmark,
  onBookmarkPress,
}: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {movie.imageUrl ? (
        <Image source={{ uri: movie.imageUrl }} style={styles.image} />
      ) : (
        <View style={[styles.image, styles.noImage]}>
          <Ionicons name="image-outline" size={30} color="gray" />
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{movie.name}</Text>
        <Text style={styles.genre}>{movie.genre.join(", ")}</Text>

        <View style={styles.row}>
          <Ionicons name="star" size={16} color="#F5B301" />
          <Text style={styles.rating}>{movie.imdbRating.toFixed(1)}</Text>
          <Ionicons name="time-outline" size={16} color="#333" />
          <Text style={styles.duration}>{movie.duration}</Text>
        </View>

        <View style={styles.row}>
          {movie.tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      {showBookmark ? (
        <TouchableOpacity onPress={onBookmarkPress}>
          <Ionicons name="bookmark" size={26} color="#5B3FF0" />
        </TouchableOpacity>
      ) : (
        <Ionicons name="chevron-forward" size={22} color="#333" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  image: {
    width: 80,
    height: 100,
    borderRadius: 8,
  },
  noImage: {
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 17,
    fontWeight: "bold",
  },
  genre: {
    color: "gray",
    marginTop: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  rating: {
    marginLeft: 4,
    marginRight: 12,
  },
  duration: {
    marginLeft: 4,
  },
  tag: {
    backgroundColor: "#E8E3FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginRight: 6,
  },
  tagText: {
    color: "#5B3FF0",
    fontSize: 12,
    fontWeight: "bold",
  },
});
