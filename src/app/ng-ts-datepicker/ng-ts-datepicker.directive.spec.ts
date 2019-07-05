import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NgTsDatepickerDirective } from './ng-ts-datepicker.directive';
import { NO_ERRORS_SCHEMA, Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import * as jqueryImport from 'jquery';
import * as moment from 'moment';
import { DATETIME_FORMAT } from './format.enum';

const jquery = jqueryImport;

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
  @ViewChild(NgTsDatepickerDirective, {static: false}) directive: NgTsDatepickerDirective;
  datepickerOptions = {
    allowInputToggle: false,
    preventInputKeys: false
  };
  datepickerValue = null;

  dateChange() {
  }
  dateClick() {
  }
}

describe('ng-ts-datepicker directive', () => {
  let fixture: ComponentFixture<TestComponent>;

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

    spyOn(fixture.componentInstance, 'dateChange').and.callThrough();
    spyOn(fixture.componentInstance, 'dateClick').and.callThrough();

    fixture.detectChanges();
  });

  it('should render correctly', () => {
    expect(fixture.debugElement.queryAll(By.css('.input-group.datepicker')).length).toBe(1);
  });

  it ('should extend internalOptions correctly', () => {
    console.log(fixture.componentInstance.directive);

    expect(fixture.componentInstance.directive.internalOptions).toEqual({
      allowInputToggle: false,
      format: DATETIME_FORMAT,
      preventInputKeys: false
    });

    expect(fixture.componentInstance.directive.defaultOptions).toEqual({
      allowInputToggle: true,
      format: DATETIME_FORMAT,
      preventInputKeys: true
    });
  });

  it ('should call datepicker method on the element to instantiate datepicker', () => {
    expect(fixture.componentInstance.directive.dpElement.data('DateTimePicker')).toBeDefined();
  });

  it ('should call dateClick and dateChange when appropriate', () => {
    expect(fixture.componentInstance.dateChange).not.toHaveBeenCalled();
    expect(fixture.componentInstance.dateClick).not.toHaveBeenCalled();

    jquery(fixture.componentInstance.directive.dpElement).trigger({
      type: 'dp.change',
      date: '23/08/1987'
    });

    expect(fixture.componentInstance.dateChange).toHaveBeenCalledWith('23/08/1987');
    expect(fixture.componentInstance.dateClick).not.toHaveBeenCalled();

    jquery(fixture.componentInstance.directive.dpElement).trigger({
      type: 'click'
    });
    expect(fixture.componentInstance.dateChange).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.dateClick).toHaveBeenCalledTimes(1);
  });

  it ('should update inner date value if outer value is changed', () => {
    expect(fixture.componentInstance.directive.dpElement.data('DateTimePicker').date()).toEqual(null);
    fixture.componentInstance.datepickerValue = moment('23/08/1987', 'DD/MM/YYY');
    fixture.detectChanges();
    expect(fixture.componentInstance.directive.dpElement.data('DateTimePicker').date()).toEqual(fixture.componentInstance.datepickerValue);
  });


});
