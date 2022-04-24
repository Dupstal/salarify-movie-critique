import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, debounceTime } from 'rxjs';
import { MoviesService } from 'src/app/movie/services/movies.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  searchTermChange = new BehaviorSubject<string>("");
  
  constructor(
    private readonly moviesService: MoviesService
  ) {
  }

  ngOnInit(): void {
    this.searchTermChange.pipe(debounceTime(300)).subscribe(searchTerm => {
      this.moviesService.searchMovies(searchTerm);
    });
  }

  ngOnDestroy() {
    this.searchTermChange.next("");
  }

}
