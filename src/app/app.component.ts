import { Component } from '@angular/core';
import { DATETIME_FORMAT } from './ng-ts-datepicker/format.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  datepickerOptions = {
    allowInputToggle: true,
    format: DATETIME_FORMAT,
    showClear: true,
    showClose: true
  };
  datepickerValue = null;

  dateChange(date) {
    console.log('dateChange', date);
  }

  utcChange(date) {
    console.log('utcChange', date);
  }

  dateClick() {
    console.log('datetime clicked');
  }

}
