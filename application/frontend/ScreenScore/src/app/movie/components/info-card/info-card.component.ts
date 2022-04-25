import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Movie } from '../../models/movie';

export const ENTRY_ANIMATION = trigger("entry", [
  transition(":enter", [
      style({ transform: "translate(-50%, 100vh)", opacity: 0 }),
      animate("300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)", style({ transform: "translateY(-50%, -50%)", opacity: 1 }))
  ])
]);

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.scss'],
  animations: [ENTRY_ANIMATION]
})
export class InfoCardComponent implements OnInit {
  
  @Input() selectedMovie: Movie | undefined;
  @Output() closeCardEvent = new EventEmitter<undefined>();
  @Output() editMovieEvent = new EventEmitter<Movie>();
  @Output() deleteMovieEvent = new EventEmitter<number>();

  constructor() {
  }

  ngOnInit(): void {
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.closeCard();
    }
  }

  deleteMovie(id: number) {
    if (confirm('Are you sure you want to delete this movie?')) {
      this.deleteMovieEvent.emit(this.selectedMovie!.id);
    }
  }

  editMovie(movie: Movie) {
    this.editMovieEvent.emit(movie);
    this.closeCard();
  }

  closeCard() {
    this.closeCardEvent.emit(undefined);
  }
}
