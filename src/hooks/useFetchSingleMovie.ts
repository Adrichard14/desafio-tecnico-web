import { useEffect, useState } from "react";
import { TMDBSingleMovie } from "../types/TMDBSingleMovie";
// import axios from "axios";

const useFetchSingleMovie = (id: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<TMDBSingleMovie | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const handleAsyncFetchSingleMovie = async () => {
      try {
        const result = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWY2ZTgzNzU4N2ZmYmVmNTZhMjZkYjQyNjFjMDliYiIsInN1YiI6IjY1ZmIyYWU3MGJjNTI5MDE3Y2FlYjM5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Au7Mn2aIxXKFSFJ39h46-kvuG-T5r-mYv4kL0W1kBps',
          },
        });
        const data = await result.json();
        setMovie(data);
      } catch (error) {
        console.log(error);
        setError('Algo deu errado!');
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    handleAsyncFetchSingleMovie();
  }, [id])
  return { movie, isLoading, error };
}

export default useFetchSingleMovie;