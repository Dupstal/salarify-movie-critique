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
  editorCardOpen: boolean = false;
  selectedMovie!: Movie | undefined;

  searchTermSubscription: Subscription;
  openMovieEditorPingSubscription: Subscription;

  constructor(
    private readonly moviesService: MoviesService
  ) {
    this.movies$ = this.moviesService.getMovies(0, '');
    this.moviesService.getNumberOfPages().pipe(take(1)).subscribe(numberOfPages => this.numberOfPages = numberOfPages);
    this.searchTermSubscription = this.moviesService.currentSearchTerm
      .subscribe(searchTerm => {
        this.searchTerm = searchTerm;
        this.movies$ = this.moviesService.getMovies(this.currentPage, searchTerm);
      });

    this.openMovieEditorPingSubscription = this.moviesService.currentOpenMovieEditorPingSource
      .subscribe(open => {
      if (open) {
        this.openEditorCard();
      }
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

  openEditorCard(movie?: Movie): void {
    if (movie) {
      this.selectedMovie = movie;
    } else {
      this.selectedMovie = undefined;
    }
    this.editorCardOpen = true;
  }

  closeEditorCard(): void {
    this.editorCardOpen = false;
  }

  addMovie(movie: Movie): void {
    this.moviesService.addMovie(movie).pipe(take(1)).subscribe(() => {
      this.movies$ = this.moviesService.getMovies(this.currentPage, this.searchTerm);
      this.closeEditorCard();
      this.refreshNumberOfPages();
    });
  }

  updateMovie(movie: Movie): void {
    this.moviesService.updateMovie(movie).pipe(take(1)).subscribe(() => {
      this.movies$ = this.moviesService.getMovies(this.currentPage, this.searchTerm);
      this.closeEditorCard();
    });
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
    this.searchTermSubscription.unsubscribe();
    this.openMovieEditorPingSubscription.unsubscribe();
  }
}
