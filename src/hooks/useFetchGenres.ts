import { useEffect, useState } from "react";

const useFetchGenres = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [genres, setGenres] = useState<[] | null>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const handleAsyncFetchGenres = async () => {
      try {
        const result = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=pt`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWY2ZTgzNzU4N2ZmYmVmNTZhMjZkYjQyNjFjMDliYiIsInN1YiI6IjY1ZmIyYWU3MGJjNTI5MDE3Y2FlYjM5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Au7Mn2aIxXKFSFJ39h46-kvuG-T5r-mYv4kL0W1kBps',
          },
        });
        const data = await result.json();
        setGenres(data.genres);
      } catch (error) {
        console.log(error);
        setError('Algo deu errado!');
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    handleAsyncFetchGenres();
  }, [])
  return { genres, isLoading, error };
}

export default useFetchGenres;