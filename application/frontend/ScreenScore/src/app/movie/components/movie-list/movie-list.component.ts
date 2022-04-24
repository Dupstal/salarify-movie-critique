import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Movie } from '../../models/movie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

  movies$ = new Observable<Movie[]>();
  numberOfPages = 0;
  currentPage = 0;

  constructor(
    private readonly moviesService: MoviesService
  ) {
    this.movies$ = this.moviesService.getMovies(0);
    this.moviesService.getNumberOfPages().pipe(take(1)).subscribe(numberOfPages => this.numberOfPages = numberOfPages);
  }

  ngOnInit(): void {
  }
  
  previousPage(): void {
    this.currentPage--;
    this.movies$ = this.moviesService.getMovies(this.currentPage);
  }

  nextPage(): void {
    this.currentPage++;
    this.movies$ = this.moviesService.getMovies(this.currentPage);
  }

  goToPage(page: number): void {
    this.currentPage = page - 1;
    this.movies$ = this.moviesService.getMovies(this.currentPage);
  }

}
