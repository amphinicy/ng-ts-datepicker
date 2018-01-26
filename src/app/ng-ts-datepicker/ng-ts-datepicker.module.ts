import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgTsDatepickerDirective, TIME_FORMAT, DATETIME_FORMAT, DATE_FORMAT } from './ng-ts-datepicker.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    NgTsDatepickerDirective,
    DATE_FORMAT,
    DATETIME_FORMAT,
    TIME_FORMAT
  ],
  declarations: [
    NgTsDatepickerDirective
  ]
})
export class NgTsDatepickerModule { }
