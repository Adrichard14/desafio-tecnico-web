import { useEffect, useState } from "react";
import { Trailer } from "../types/Trailer";
// import axios from "axios";

const useMovieTrailer = (id: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const handleAsyncMovieTrailer = async () => {
      try {
        const result = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWY2ZTgzNzU4N2ZmYmVmNTZhMjZkYjQyNjFjMDliYiIsInN1YiI6IjY1ZmIyYWU3MGJjNTI5MDE3Y2FlYjM5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Au7Mn2aIxXKFSFJ39h46-kvuG-T5r-mYv4kL0W1kBps',
          },
        });
        const data = await result.json();
        if(data.results[0]) {
          setTrailer(data.results[0]);
        }
        console.log(trailer);
      } catch (error) {
        console.log(error);
        setError('Algo deu errado!');
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    handleAsyncMovieTrailer();
  }, [id])
  return { trailer, isLoading, error };
}

export default useMovieTrailer;