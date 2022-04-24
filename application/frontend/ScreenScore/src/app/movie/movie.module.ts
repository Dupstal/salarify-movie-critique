import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { HttpClientModule } from '@angular/common/http';
import { GetPagesLengthPipe } from './pipes/get-pages-length.pipe';



@NgModule({
  declarations: [
    MovieCardComponent,
    MovieListComponent,
    GetPagesLengthPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class MovieModule { }
