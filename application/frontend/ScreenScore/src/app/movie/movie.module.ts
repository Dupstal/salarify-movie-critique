import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';



@NgModule({
  declarations: [
    MovieCardComponent,
    MovieListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MovieModule { }
