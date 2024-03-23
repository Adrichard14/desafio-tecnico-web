import './circle.css';
import { redirect, useParams } from 'react-router-dom';
import useFetchSingleMovie from './hooks/useFetchSingleMovie';
import { TMDBSingleMovie } from './types/TMDBSingleMovie';
import moment from 'moment';
import { Genre } from './types/Genre';
import useMovieTrailer from './hooks/useMovieTrailer';

const MoviePage = () => {
  const params = useParams();
  if (!params.id) {
    redirect("/");
  }
  const intId = params.id ? parseInt(params.id) : 0;
  const { movie, isLoading }: { movie: TMDBSingleMovie | null, isLoading: boolean } = useFetchSingleMovie(intId);
  const { trailer } = useMovieTrailer(intId);
  return <>
    {isLoading ? <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border m-5 text-light" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div> : <div className="container-fluid container-home h-100">
      <div className="container py-5">
        <div className="row row-movie-detail" style={{ backgroundImage: `linear-gradient(180deg, #121113 0%, rgba(18, 17, 19, 0.46) 49.48%, #121113 100%), url('https://image.tmdb.org/t/p/w500${movie?.backdrop_path}')` }}>
          <div className="col-lg-8 d-flex col-movie-poster">
            <img src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} alt="Capa do filme" className="movie-detail-poster" />
            <div className="d-flex flex-column overview-box">
              <h1 className="movie-detail-title">{movie?.title}</h1>
              <span className="movie-detail-original-title">Título original: {movie?.original_title}</span>
              <p className="movie-detail-subtitle"><i>{movie?.tagline}</i></p>
              <div className="row gap-4 popularity-row-mobile justify-content-center mb-3">

                <div className="col-4 movie-detail-detail">
                  <h5>POPULARIDADE</h5>
                  <p>{movie?.popularity}</p>
                </div>
                <div className="col-3 movie-detail-detail">
                  <h5>VOTOS</h5>
                  <p>{movie?.vote_count}</p>
                </div>
                <div className="col-3">
                  <div className={`c100 p${Math.round(movie?.vote_average || 0) * 10} small`}>
                    <span>{((movie?.vote_average || 0) * 10).toFixed(0)}%</span>
                    <div className="slice">
                      <div className="bar"></div>
                      <div className="fill"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-sinopse">
                <h3 className="movie-detail-sinopse-title">SINOPSE</h3>
                <p className="movie-detail-sinopse">{movie?.overview}</p>
              </div>
              <div className="movie-detail-genre mt-3">
                <p className="movie-detail-genre-title">Gêneros</p>
                <div className="d-flex flex-wrap">
                  {movie?.genres?.map((genre: Genre) => (
                    <span className="movie-detail-genre-detail me-2 my-2">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
          <div className="col-lg-4 mt-4">
            <div className="row gap-4 popularity-row-desk">

              <div className="col movie-detail-detail">
                <h5>POPULARIDADE</h5>
                <p>{movie?.popularity}</p>
              </div>
              <div className="col movie-detail-detail">
                <h5>VOTOS</h5>
                <p>{movie?.vote_count}</p>
              </div>
              <div className="col">
                <div className={`c100 p${Math.round(movie?.vote_average || 0) * 10} medium`}>
                  <span>{((movie?.vote_average || 0) * 10).toFixed(0)}%</span>
                  <div className="slice">
                    <div className="bar"></div>
                    <div className="fill"></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row gap-4">
              <div className="col movie-detail-detail my-2">
                <h5>LANÇAMENTO</h5>
                <p>{moment(movie?.release_date).format("DD/MM/YYYY")}</p>
              </div>

              <div className="col movie-detail-detail my-2">
                <h5>DURAÇÃO</h5>
                <p>{movie?.runtime}m</p>
              </div>
            </div>
            <div className="row gap-4">
              <div className="col movie-detail-detail my-2">
                <h5>SITUAÇÃO</h5>
                <p>{movie?.status}</p>
              </div>

              <div className="col movie-detail-detail my-2">
                <h5>IDIOMA</h5>
                <p>{movie?.spoken_languages[0]?.name}</p>
              </div>
            </div>
            <div className="row gap-4">
              <div className="col movie-detail-detail my-2">
                <h5>ORÇAMENTO</h5>
                <p>${(movie?.budget || 0) / 1000000}M</p>
              </div>

              <div className="col movie-detail-detail my-2">
                <h5>RECEITA</h5>
                <p>${((movie?.revenue || 0) / 1000000).toFixed(1)}M</p>
              </div>

              <div className="col movie-detail-detail my-2">
                <h5>LUCRO</h5>
                <p>${(((movie?.revenue || 0) - (movie?.budget || 0)) / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row row-trailer">
          <div className="col-12">
            <h5 className="movie-detail-trailer-label my-3">Trailer</h5>
            <div className="ratio ratio-16x9">
              {trailer && trailer?.site === 'YouTube' && (
                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${trailer.key}?si=bcCsfR0BE6r1tMU7`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>}
  </>;
}

export default MoviePage;