import { useEffect, useState } from "react";
import { TMDBSingleMovie } from "../types/TMDBSingleMovie";
import { getMovieById } from "../api/movieApi";
// import axios from "axios";

const useFetchSingleMovie = (id: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<TMDBSingleMovie | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const handleAsyncFetchSingleMovie = async (id: number) => {
      try {
        const result = await getMovieById(id);
        const data = result;
        setMovie(data);
      } catch (error) {
        console.log(error);
        setError('Algo deu errado!');
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) {
      handleAsyncFetchSingleMovie(id);
    }
  }, [id])
  return { movie, isLoading, error };
}

export default useFetchSingleMovie;