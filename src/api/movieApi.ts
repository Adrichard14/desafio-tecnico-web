import { MovieFormData } from '../types/MovieCreateForm';
import { TMDBSingleMovie } from '../types/TMDBSingleMovie';
import apiClient from './apiClient';

export type MovieApiResponse = TMDBSingleMovie[];

export type SingleMovieApiResponse = TMDBSingleMovie;

export const createMovie = async (movieData: FormData): Promise<MovieFormData> => {
    const response = await apiClient.post('/movie', movieData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};

export const getMovies = async (queryParams: string): Promise<MovieApiResponse | null> => {
    const response = await apiClient.get(`/movies?${queryParams}`);
    return response.data;
};


export const getMovieById = async (id: number | string): Promise<SingleMovieApiResponse | null> => {
    const response = await apiClient.get(`/movie/${id}`);
    return response.data;
};
