import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  apiUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient
  ) {}
    
  getMovies(page: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl + '/movie', { params: { page } });
  }

  getNumberOfPages(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/movie/pages');
  }
}
