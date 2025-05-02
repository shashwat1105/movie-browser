export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
    Genre?: string;
    Director?: string;
    Plot?: string;
    Ratings?: {
      Source: string;
      Value: string;
    }[];
    Runtime?: string;
    Actors?: string;
    imdbRating?: string;
  }
  
  export interface ApiResponse {
    Search?: Movie[];
    totalResults?: string;
    Error?: string;
    Response: 'True' | 'False';
  }