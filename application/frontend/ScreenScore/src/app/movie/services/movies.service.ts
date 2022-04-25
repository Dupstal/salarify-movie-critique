import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  
  apiUrl = environment.apiUrl;
  
  private searchTermSource = new BehaviorSubject('');
  currentSearchTerm = this.searchTermSource.asObservable();
  
  private openMovieEditorPing = new BehaviorSubject(false);
  currentOpenMovieEditorPingSource = this.openMovieEditorPing.asObservable();
  

  constructor(
    private readonly http: HttpClient
  ) {}
    
  getMovies(page: number, searchTerm: string): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.apiUrl + '/movie', { params: { page, searchTerm } });
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(this.apiUrl + '/movie', movie);
  }

  updateMovie(movie: Movie): Observable<Movie> {
    return this.http.put<Movie>(this.apiUrl + '/movie/' + movie.id, movie);
  }

  deleteMovie(id: number): Observable<boolean> {
    return this.http.delete<boolean>(this.apiUrl + '/movie/' + id);
  }

  getNumberOfPages(): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/movie/pages');
  }

  searchMovies(searchTerm: string) {
    this.searchTermSource.next(searchTerm);
  }

  openMovieEditor(open: boolean) {
    this.openMovieEditorPing.next(open);
  }

}
