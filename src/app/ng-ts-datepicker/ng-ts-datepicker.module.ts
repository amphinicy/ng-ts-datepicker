import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTsDatepickerDirective } from './ng-ts-datepicker.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NgTsDatepickerDirective
  ],
  declarations: [
    NgTsDatepickerDirective
  ]
})
export class NgTsDatepickerModule { }
