import { Genre } from "./Genre";

interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface TMDBSingleMovie {
  backdrop_path?: string;
  poster_path: string;
  genres?: Genre[];
  original_title: string;
  title: string;
  vote_average: number;
  overview: string;
  status: string;
  tagline: string;
  budget: number;
  runtime: number;
  revenue: number;
  popularity: number;
  vote_count: number;
  original_language: string;
  release_date: string;
  spoken_languages: SpokenLanguage[];
}