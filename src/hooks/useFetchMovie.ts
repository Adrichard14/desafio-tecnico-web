// import { useCallback, useEffect, useState } from "react";
// import { getMovies, MovieApiResponse } from "../api/movieApi";
// import { TMDBSingleMovie } from "../types/TMDBSingleMovie";

// const useFetchMovie = (filters: string) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [movies, setMovies] = useState<TMDBSingleMovie[] | null>(null);
//   const [totalPages, setTotalPages] = useState<number | null>(null);
//   const [totalResults, setTotalResults] = useState<number | null>(null);
//   const [currentPage, setCurrentPage] = useState<number | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleAsyncFetchMovies = useCallback(async (filters: string, page: number) => {
//     try {
//       const route = filters ? 'https://api.themoviedb.org/3/search/movie' : 'https://api.themoviedb.org/3/discover/movie';
//       let currentPage = page;
//       if (currentPage > 1) {
//         currentPage = Math.ceil(currentPage / 2);
//       }
//       const filterPage = currentPage && filters ? '&page=' + currentPage : '?page=' + (currentPage || 1);
//       const result = await getMovies();
//       // const result = await fetch(`${route}${filters || ''}${filterPage}`, {
//       //   method: "GET",
//       //   headers: {
//       //     "Content-Type": "application/json",
//       //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZWY2ZTgzNzU4N2ZmYmVmNTZhMjZkYjQyNjFjMDliYiIsInN1YiI6IjY1ZmIyYWU3MGJjNTI5MDE3Y2FlYjM5MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Au7Mn2aIxXKFSFJ39h46-kvuG-T5r-mYv4kL0W1kBps',
//       //   },
//       // });
//       const data = result;
//       if (data) {
//         setMovies(data);
//         // setTotalPages(data.total_pages);
//         // setTotalResults(data.total_results);
//         setCurrentPage(page);
//       }
//       // console.log(data);

//       // console.log("currentPage: ", currentPage, "-  page % 2: ", currentPage % 2);
//       // if (page === 0 || page % 2 > 0) {
//       //   setMovies(data.results.slice(0, 10));
//       // } else {
//       //   setMovies(data.results.slice(10, 20));
//       // }

//     } catch (error) {
//       console.log(error);
//       setError('Algo deu errado!');
//       setIsLoading(false);
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     handleAsyncFetchMovies(filters, 0);
//   }, [handleAsyncFetchMovies, filters])
//   return { movies, isLoading, error, handleAsyncFetchMovies, totalPages, totalResults, currentPage };
// }

// export default useFetchMovie;
import { useCallback, useEffect, useState } from "react";
import { getMovies } from "../api/movieApi";
import { TMDBSingleMovie } from "../types/TMDBSingleMovie";

const useFetchMovie = (filters: Record<string, string | number>) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState<TMDBSingleMovie[] | null>(null);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAsyncFetchMovies = useCallback(async (filters: any, page: number) => {
    try {
      setIsLoading(true);

      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value.toString());
      });

      queryParams.append("page", page.toString());

      const result = await getMovies(queryParams.toString());

      if (result && Array.isArray(result)) {
        setMovies(result);
        setTotalPages(null);
        setTotalResults(result.length);
        setCurrentPage(page);
      } else {
        throw new Error("Dados inválidos retornados pela API.");
      }
    } catch (error) {
      console.error(error);
      setError("Algo deu errado!");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    handleAsyncFetchMovies(filters, 0);
  }, [handleAsyncFetchMovies, filters]);

  return { movies, isLoading, error, handleAsyncFetchMovies, totalPages, totalResults, currentPage };
};

export default useFetchMovie;
