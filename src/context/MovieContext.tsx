import { createContext, useContext, useState } from "react";

export type Tag = "2D" | "3D" | "IMAX" | "4D";

export type Movie = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  tags: Tag[];
  genre: string[];
  imdbRating: number;
  duration: string;
  rotten: string;
  saved: boolean;
};

type MovieContextType = {
  movies: Movie[];
  addMovie: (movie: Movie) => void;
  toggleSave: (id: string) => void;
};

const initialMovies: Movie[] = [
  {
    id: "1",
    name: "Inception",
    description:
      "A thief who steals secrets through dreams is given a chance to erase his past by planting an idea in someone's mind.",
    imageUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    tags: ["2D", "IMAX"],
    genre: ["Action", "Sci-Fi"],
    imdbRating: 8.8,
    duration: "2h 28m",
    rotten: "87%",
    saved: true,
  },
  {
    id: "2",
    name: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    imageUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    tags: ["2D", "3D"],
    genre: ["Adventure", "Drama"],
    imdbRating: 8.6,
    duration: "2h 49m",
    rotten: "72%",
    saved: true,
  },
  {
    id: "3",
    name: "The Dark Knight",
    description:
      "Batman faces the Joker, a criminal who wants to bring chaos to Gotham City.",
    imageUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    tags: ["2D", "IMAX", "4D"],
    genre: ["Action", "Crime"],
    imdbRating: 9.0,
    duration: "2h 32m",
    rotten: "94%",
    saved: true,
  },
  {
    id: "4",
    name: "Avatar",
    description:
      "A marine on the planet Pandora is torn between following orders and protecting the world he feels is his home.",
    imageUrl: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg",
    tags: ["2D", "3D", "IMAX"],
    genre: ["Action", "Sci-Fi"],
    imdbRating: 7.9,
    duration: "2h 42m",
    rotten: "82%",
    saved: false,
  },
];

const MovieContext = createContext<MovieContextType | null>(null);

export function useMovies() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error("MovieContext not found");
  }

  return context;
}

export function MovieProvider({ children }: { children: React.ReactNode }) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  const addMovie = (movie: Movie) => {
    setMovies([movie, ...movies]);
  };

  const toggleSave = (id: string) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id ? { ...movie, saved: !movie.saved } : movie
      )
    );
  };

  return (
    <MovieContext.Provider value={{ movies, addMovie, toggleSave }}>
      {children}
    </MovieContext.Provider>
  );
}
