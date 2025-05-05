import SearchBar from "./components/Searchbar";
import './circle.css';
import useFetchMovie from "./hooks/useFetchMovie";
import useFetchGenres from "./hooks/useFetchGenres";
import { Genre } from "./types/Genre";
import getGenreTitles from "./utils/getGenreTitles";
import useFetchRegions from "./hooks/useFetchRegions";
import { Link } from "react-router-dom";
import { useState } from "react";
import Pagination from "./components/Pagination";
import { MovieFormData } from "./types/MovieCreateForm";
import { createMovie } from "./api/movieApi";
import { toast, ToastContainer } from "react-toastify";
import { TMDBSingleMovie } from "./types/TMDBSingleMovie";

export default function HomePage() {
  const { movies, isLoading, handleAsyncFetchMovies, totalPages, totalResults, currentPage } = useFetchMovie('');
  const [showCreateMovieForm, setShowCreateMovieForm] = useState<boolean>(false);
  const [filters, setFilters] = useState("");
  const [page, setPage] = useState(0);
  const { regions } = useFetchRegions();
  const { genres } = useFetchGenres();
  const [posterPath, setPosterPath] = useState<File | undefined>(undefined);
  const [backdropPath, setBackdropPath] = useState<File | undefined>(undefined);
  const defaultMovieFormData = {
    title: '',
    genres: '',
    original_title: '',
    overview: '',
    status: '',
    tagline: '',
    original_language: '',
    release_date: '',
    backdrop_path: '',
    profit: '',
    poster_path: '',
    trailer: '',
  };

  const [formData, setFormData] = useState<MovieFormData>(defaultMovieFormData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }


  const handlePosterPath = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPosterPath(e.target.files?.[0]);
  }
  const handleBackdropPath = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setBackdropPath(e.target.files?.[0]);
  }


  const genreMap = new Map();
  if (genres && genres.length > 0) {
    genres.map((genre: Genre) => {
      genreMap.set(genre.id, genre.name);
    });
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Converter todos os valores para string
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, String(value)); // Conversão explícita
      });

      // Adiciona o arquivo separadamente
      if (posterPath) {
        formDataToSend.append('poster_path', posterPath); // 'poster' deve bater com o nome que o Multer espera
      }

      if (backdropPath) {
        formDataToSend.append('backdrop_path', backdropPath);
      }
      const result = await createMovie(formDataToSend);
      if (result) {
        toast.success('Filme cadastrado com sucesso!', {
          position: "bottom-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setFormData(defaultMovieFormData);
        setShowCreateMovieForm(!showCreateMovieForm);
        handleAsyncFetchMovies(filters, page);
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao tentar adicionar o filme!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error(error);
    }
  }

  return <>
    <ToastContainer
      position="bottom-left"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    {showCreateMovieForm && (
      <nav id="sidebarMenu" className="d-lg-block sidebar create-movie-sidebar">
        <div className="position-sticky">
          <div className="list-group list-group-flush mx-3 mt-4">
            <h5>Adicionar filme</h5>
            <form id="login-form" onSubmit={handleFormSubmit}>
              <div className="row gy-2 gy-md-3">
                <div className="col-6 mb-2">
                  <label className="form-label">Capa do filme</label>
                  <input className="form-control" type="file" id="formFile" onChange={handlePosterPath} />
                </div>
                <div className="col-6 mb-2">
                  <label className="form-label">Banner de fundo</label>
                  <input className="form-control" type="file" id="backdropPath" onChange={handleBackdropPath} />
                </div>
                <div className="col-6">
                  <label className="form-label">Título do filme</label>
                  <input type="text" className="form-control" name="title" id="title" value={formData.title} onChange={handleInputChange} required />
                </div>
                <div className="col-6">
                  <label className="form-label">Título original</label>
                  <input type="text" className="form-control" name="original_title" id="original_title" value={formData.original_title} onChange={handleInputChange} required />
                </div>
                <div className="col-6">
                  <label className="form-label">Sinopse</label>
                  <input type="text" className="form-control" name="overview" id="overview" value={formData.overview} onChange={handleInputChange} required />
                </div>
                <div className="col-6">
                  <label className="form-label">Gêneros (separados por vírgula)</label>
                  <input type="text" className="form-control" name="genres" id="genres" value={formData.genres} onChange={handleInputChange} required />
                </div>
                <div className="col-4">
                  <label className="form-label">Lançamento</label>
                  <input type="date" name="release_date" value={formData.release_date} onChange={handleInputChange} className="form-control" />
                </div>
                <div className="col-4">
                  <label className="form-label">Popularidade</label>
                  <input type="text" className="form-control" name="popularity" id="popularity" value={formData.popularity} onChange={handleInputChange} required />
                </div>
                <div className="col-4">
                  <label className="form-label">Aprovação (%)</label>
                  <input type="text" className="form-control" name="vote_average" id="vote_average" value={formData.vote_average} onChange={handleInputChange} required />
                </div>
                <div className="col-4">
                  <label className="form-label">Votos</label>
                  <input type="text" className="form-control" name="vote_count" id="vote_count" value={formData.vote_count} onChange={handleInputChange} required />
                </div>

                <div className="col-4">
                  <label className="form-label">Duração (em minutos)</label>
                  <input type="text" className="form-control" name="runtime" id="runtime" value={formData.runtime} onChange={handleInputChange} required />
                </div>

                <div className="col-4">
                  <label className="form-label">Situação</label>
                  <input type="text" className="form-control" name="status" id="status" value={formData.status} onChange={handleInputChange} required />
                </div>

                <div className="col-4">
                  <label className="form-label">Idioma</label>
                  <input type="text" className="form-control" name="original_language" id="original_language" value={formData.original_language} onChange={handleInputChange} required />
                </div>

                <div className="col-4">
                  <label className="form-label">Orçamento</label>
                  <input type="text" className="form-control" name="budget" id="budget" value={formData.budget} onChange={handleInputChange} required />
                </div>

                <div className="col-4">
                  <label className="form-label">Receita</label>
                  <input type="text" className="form-control" name="revenue" id="revenue" value={formData.revenue} onChange={handleInputChange} required />
                </div>

                <div className="col-4">
                  <label className="form-label">Lucro</label>
                  <input type="text" className="form-control" name="profit" id="profit" value={formData.profit} onChange={handleInputChange} required />
                </div>
                <div className="col-8">
                  <label className="form-label">Tailer (link do embed do youtube. Ex: https://www.youtube.com/embed/bBd0d-LORLw)</label>
                  <input type="text" className="form-control" name="trailer" id="trailer" value={formData.trailer} onChange={handleInputChange} required />
                </div>
                <div className="col-12">
                  <div className="d-flex justify-content-between align-items-center">
                    <button className="default-theme-btn btn" type="submit">Salvar</button>
                    <button className="default-theme-secondary-btn btn" type="button" onClick={() => setShowCreateMovieForm(!showCreateMovieForm)}>Fechar</button>

                  </div>
                </div>

              </div>
            </form>
          </div>
        </div>
      </nav>
    )}
    {
      isLoading ? <div className="vh-100 d-flex justify-content-center align-items-center">
        {/* TODO: Use the loading component */}
        < div className="spinner-border m-5 text-light" role="status" >
          <span className="visually-hidden">Loading...</span>
        </div >
      </div > : <div className="container-fluid container-home h-100">
        <div className="container">
          <SearchBar fetchMovies={handleAsyncFetchMovies} regions={regions || []} page={page} setPage={setPage} setFilters={setFilters} setShowCreateMovieForm={setShowCreateMovieForm} showCreateMovieForm={showCreateMovieForm} />
          <div className="movie-list d-flex my-5 pb-5">
            {movies?.map((movie: TMDBSingleMovie) => (
              <Link key={movie.id} className="box-movie justify-content-end flex-column" style={{ backgroundImage: `url('${movie.poster_path}')` }} to={`movie/${movie.id}`}>
                <div className="movie-rating">
                  <div className={`c100 p${Math.round(parseInt(movie.vote_average))} medium`}>
                    <span>{movie.vote_average}%</span>
                    <div className="slice">
                      <div className="bar"></div>
                      <div className="fill"></div>
                    </div>
                  </div>
                </div>
                <p className="text-white movie-title ms-3">{movie.title}</p>
                <span className="movie-genre ms-3 mb-2">{getGenreTitles(movie?.genres)}</span>
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
