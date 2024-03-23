import SearchBar from "./components/Searchbar";
import './circle.css';
import useFetchMovie from "./hooks/useFetchMovie";
import useFetchGenres from "./hooks/useFetchGenres";
import { Genre } from "./types/Genre";
import getGenreTitles from "./utils/getGenreTitles";
import useFetchRegions from "./hooks/useFetchRegions";
import { Link } from "react-router-dom";
import { TMDBMovie } from "./types/TMDBMovie";
import { useState } from "react";
import Pagination from "./components/Pagination";

export default function HomePage() {
  const { movies, isLoading, handleAsyncFetchMovies, totalPages, totalResults, currentPage } = useFetchMovie('');
  const [filters, setFilters] = useState("");
  const [page, setPage] = useState(0);
  const { regions } = useFetchRegions();
  const { genres } = useFetchGenres();
  const genreMap = new Map();
  if (genres && genres.length > 0) {
    genres.map((genre: Genre) => {
      genreMap.set(genre.id, genre.name);
    });
  }

  return <>
    {
      isLoading ? <div className="vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border m-5 text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div> : <div className="container-fluid container-home h-100">
        <div className="container">
          <SearchBar fetchMovies={handleAsyncFetchMovies} regions={regions || []} page={page} setPage={setPage} setFilters={setFilters} />
          <div className="movie-list d-flex my-5 pb-5">
            {movies?.map((movie: TMDBMovie) => (
              <Link key={movie.id} className="box-movie justify-content-end flex-column" style={{ backgroundImage: `url('https://image.tmdb.org/t/p/w500${movie.poster_path}')` }} to={`movie/${movie.id}`}>
                <div className="movie-rating">
                  <div className={`c100 p${Math.round(movie.vote_average * 10)} medium`}>
                    <span>{(movie.vote_average * 10).toFixed(0)}%</span>
                    <div className="slice">
                      <div className="bar"></div>
                      <div className="fill"></div>
                    </div>
                  </div>
                </div>
                <p className="text-white movie-title ms-3">{movie.title}</p>
                <span className="movie-genre ms-3 mb-3">{getGenreTitles(movie?.genre_ids, genreMap)}</span>
              </Link>
            ))}
          </div>
          <div className="row">
            <Pagination movies={movies || []} totalPages={totalPages || 0} currentPage={currentPage || 0} totalResults={totalResults || 0} handleAsyncFetchMovies={handleAsyncFetchMovies} filters={filters} />
          </div>
        </div>
      </div>
    };
  </>
}
