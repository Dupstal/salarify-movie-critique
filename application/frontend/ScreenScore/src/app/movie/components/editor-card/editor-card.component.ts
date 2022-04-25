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
  
  @Input() selectedMovie!: Movie;
  @Output() closeCardEvent = new EventEmitter<undefined>();
  @Output() addMovieEvent = new EventEmitter<any>();

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
    } else {
      const controls = this.form.controls;
        for (const name in controls) {
            if (controls[name].invalid) {
                console.log('invalid control: ' + name);
            }
        }
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
}
