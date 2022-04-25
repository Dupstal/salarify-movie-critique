import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Movie } from '../../models/movie';

export const ENTRY_ANIMATION = trigger("entry", [
  transition(":enter", [
      style({ transform: "translate(-50%, 100vh)", opacity: 0 }),
      animate("300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)", style({ transform: "translateY(-50%, -50%)", opacity: 1 }))
  ])
]);

@Component({
  selector: 'app-editor-card',
  templateUrl: './editor-card.component.html',
  styleUrls: ['./editor-card.component.scss'],
  animations: [ENTRY_ANIMATION]
})
export class EditorCardComponent implements OnInit {

  form: FormGroup;
  editMode: boolean = false;
  
  @Input() selectedMovie: Movie | undefined;
  @Output() closeCardEvent = new EventEmitter<undefined>();
  @Output() addMovieEvent = new EventEmitter<any>();
  @Output() updateMovieEvent = new EventEmitter<any>();

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
      year: new FormControl(null, { validators: [Validators.required] }),
      director: new FormControl(null, { validators: [Validators.required] }),
      stars: new FormControl(null, { validators: [Validators.required] }),
      writers: new FormControl(null, { validators: [Validators.required] }),
      imgUrl: new FormControl(null, { validators: [Validators.required] }),
      review: new FormControl(null, { validators: [Validators.required] }),
      directing: new FormControl(null, { validators: [Validators.required] }),
      acting: new FormControl(null, { validators: [Validators.required] }),
      costumeDesign: new FormControl(null, { validators: [Validators.required] }),
      editing: new FormControl(null, { validators: [Validators.required] }),
      music: new FormControl(null, { validators: [Validators.required] }),
      visualEffects: new FormControl(null, { validators: [Validators.required] }),
      screenplay: new FormControl(null, { validators: [Validators.required] })
    });
  }

  ngOnInit(): void {
    if (this.selectedMovie) {
      this.editMode = true;
      this.form.setValue({
        name: this.selectedMovie.name,
        year: this.selectedMovie.year,
        director: this.selectedMovie.director,
        stars: this.selectedMovie.stars,
        writers: this.selectedMovie.writers,
        imgUrl: this.selectedMovie.imgUrl,
        review: this.selectedMovie.review,
        directing: this.selectedMovie.ratings.directing,
        acting: this.selectedMovie.ratings.acting,
        costumeDesign: this.selectedMovie.ratings.costumeDesign,
        editing: this.selectedMovie.ratings.editing,
        music: this.selectedMovie.ratings.music,
        visualEffects: this.selectedMovie.ratings.visualEffects,
        screenplay: this.selectedMovie.ratings.screenplay
      });
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      this.closeCard();
    }
  }

  addMovie() {
    if (this.form.valid) {
      this.addMovieEvent.emit(this.form.value);
    }
  }

  updateMovie() {
    if (this.form.valid) {
      this.updateMovieEvent.emit({
        id: this.selectedMovie!.id,
        ...this.form.value
      });
    }
  }


  closeCard() {
    if (this.form.dirty) {
      if (confirm('You have unsaved changes. Are you sure you want to close?')) {
        this.form.reset();
        this.closeCardEvent.emit(undefined);
      }
    } else this.closeCardEvent.emit(undefined);
  }

  ngOnDestroy() {
    this.form.reset();
    this.editMode = false;
  }
}
