import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  form: FormGroup;
  editMode: boolean = false;
  
  @Input() selectedMovie!: Movie;
  @Output() closeInfoCardEvent = new EventEmitter<Movie | undefined>();

  constructor() {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required] }),
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
      this.closeEditor();
    }
  }

  closeEditor() {
    if (this.form.dirty) {
      if (confirm('You have unsaved changes. Are you sure you want to close?')) {
        this.form.reset();
        this.closeInfoCardEvent.emit(undefined);
      }
    } else this.closeInfoCardEvent.emit(undefined);
  }

}
