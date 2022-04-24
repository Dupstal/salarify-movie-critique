import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { GetPagesLengthPipe } from './pipes/get-pages-length.pipe';
import { GetRatingsScorePipe } from './pipes/get-ratings-score.pipe';
import { MoviesService } from './services/movies.service';
import { InfoCardComponent } from './components/info-card/info-card.component';

@NgModule({
  declarations: [
    MovieCardComponent,
    MovieListComponent,
    GetPagesLengthPipe,
    GetRatingsScorePipe,
    InfoCardComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    MoviesService
  ]
})
export class MovieModule { }
