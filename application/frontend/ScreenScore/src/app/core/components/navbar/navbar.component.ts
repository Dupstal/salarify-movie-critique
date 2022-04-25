import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime, Subscription } from 'rxjs';
import { MoviesService } from 'src/app/movie/services/movies.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  searchTermChange = new BehaviorSubject<string>("");
  
  searchTermSubscription: Subscription;

  constructor(
    private readonly translate: TranslateService,
    private readonly moviesService: MoviesService
  ) {
    this.searchTermSubscription = this.searchTermChange.pipe(debounceTime(300)).subscribe(searchTerm => {
      this.moviesService.searchMovies(searchTerm);
    });
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
  }

  openMovieEditor(): void {
    this.moviesService.openMovieEditor(true);
  }

  ngOnDestroy() {
    this.searchTermChange.next("");
    this.searchTermSubscription.unsubscribe();
  }

}
