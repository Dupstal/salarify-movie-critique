import { Component, OnInit } from '@angular/core';
import { Observable, Subscription, take } from 'rxjs';
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
  searchTerm: string = '';
  infoCardOpen: boolean = false;
  selectedMovie!: Movie;

  subscription: Subscription;

  constructor(
    private readonly moviesService: MoviesService
  ) {
    this.movies$ = this.moviesService.getMovies(0, '');
    this.moviesService.getNumberOfPages().pipe(take(1)).subscribe(numberOfPages => this.numberOfPages = numberOfPages);
    this.subscription = this.moviesService.currentSearchTerm
      .subscribe(searchTerm => {
        this.searchTerm = searchTerm;
        this.movies$ = this.moviesService.getMovies(this.currentPage, searchTerm);
      });
  }

  ngOnInit(): void {
  }
  
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.movies$ = this.moviesService.getMovies(this.currentPage, this.searchTerm);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.numberOfPages - 1) {
      this.currentPage++;
      this.movies$ = this.moviesService.getMovies(this.currentPage, this.searchTerm);
    }
  }

  goToPage(page: number): void {
    this.currentPage = page - 1;
    this.movies$ = this.moviesService.getMovies(this.currentPage, this.searchTerm);
  }

  openInfoCard(movie: Movie): void {
    this.selectedMovie = movie;
    this.infoCardOpen = true;
  }

  closeInfoCard(): void {
    this.infoCardOpen = false;
  }

  deleteMovie(id: number) {
    this.moviesService.deleteMovie(id).pipe(take(1)).subscribe(() => {
      this.movies$ = this.moviesService.getMovies(this.currentPage, this.searchTerm);
      this.closeInfoCard();
      this.refreshNumberOfPages();
    });
  }

  refreshNumberOfPages() {
    this.moviesService.getNumberOfPages().pipe(take(1)).subscribe(numberOfPages => this.numberOfPages = numberOfPages);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
