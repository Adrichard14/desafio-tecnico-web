import { useEffect, useState } from "react";
// import axios from "axios";

const useFetchRegions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [regions, setRegions] = useState<[] | null>([]);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // ?sort_by=popularity.desc
    const handleAsyncFetchregions = async () => {
      try {
        const result = await fetch(`https://api.themoviedb.org/3/watch/providers/regions?language=pt-BR`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWY2ZTgzNzU4N2ZmYmVmNTZhMjZkYjQyNjFjMDliYiIsInN1YiI6IjY1ZmIyYWU3MGJjNTI5MDE3Y2FlYjM5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Au7Mn2aIxXKFSFJ39h46-kvuG-T5r-mYv4kL0W1kBps',
          },
        });
        const data = await result.json();
        setRegions(data.results);
      } catch (error) {
        console.log(error);
        setError('Algo deu errado!');
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    };

    handleAsyncFetchregions();
  }, [])
  return { regions, isLoading, error };
}

export default useFetchRegions;