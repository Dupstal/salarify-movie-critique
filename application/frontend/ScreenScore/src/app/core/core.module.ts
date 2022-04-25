import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forChild({
      extend: true
    })
  ],
  exports: [
    NavbarComponent
  ]
})
export class CoreModule { }
