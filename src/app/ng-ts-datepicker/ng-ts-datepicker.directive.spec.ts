import { TestBed } from '@angular/core/testing';
import { NgTsDatepickerDirective } from './ng-ts-datepicker.directive';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { element } from 'protractor';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div class="input-group">
              <input class="form-control"
                ngTsDatepicker
                [(date)]="datepickerValue"
                [options]="datepickerOptions"
                (dateChange)="dateChange($event)"
                (click)="dateClick()">
            </div>`
})
class TestComponent {
  datepickerOptions = {};
  datepickerValue = null;

  dateChange() {
  }
  dateClick() {
  }
}

describe('ng-ts-datepicker directive', () => {
  let fixture;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        NgTsDatepickerDirective
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .createComponent(TestComponent);

    fixture.detectChanges();
  });

  it('should render correctly', () => {
    console.log(fixture.debugElement.queryAll(By.css('.input-group.datepicker')));
    expect(fixture.debugElement.queryAll(By.css('.input-group.datepicker')).length).toBe(1);
  });


});
