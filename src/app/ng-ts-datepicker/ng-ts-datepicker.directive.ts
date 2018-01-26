import {
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import * as jqueryImport from 'jquery';
import 'eonasdan-bootstrap-datetimepicker';
import { utc, Moment } from 'moment';

const jquery = jqueryImport;

export const DATETIME_FORMAT = 'DD/MM/YYYY HH:mm:ss';
export const DATE_FORMAT = 'DD/MM/YYYY';
export const TIME_FORMAT = 'DD/MM/YYYY';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngTsDatepicker]'
})
export class NgTsDatepickerDirective implements OnInit, OnChanges {

@Input() date: Moment;
@Input() options;

@Output() change: EventEmitter<Moment> = new EventEmitter<Moment>();
@Output() utcChange: EventEmitter<string> = new EventEmitter<string>();
@Output() click: EventEmitter<any> = new EventEmitter<any>();

private dpElement;
private defaultOptions: any = {
  allowInputToggle: true,
  format: DATETIME_FORMAT
};
private hasParent = false;
private internalOptions: any = {};

constructor(
  private el: ElementRef
) {}

formatToUtc(date: Moment) {
  if (!date) {
    return;
  }
  return utc(date.valueOf() + date.utcOffset() * 60 * 1000).format(this.internalOptions.format);
}

ngOnInit(): void {
  // this.internalOptions = this.lodash.assign(this.internalOptions, this.defaultOptions, this.options);
  this.internalOptions = Object.assign(this.internalOptions, this.defaultOptions, this.options);

  const $parent = jquery(this.el.nativeElement.parentNode);
  this.dpElement = $parent.hasClass('input-group') ? $parent : jquery(this.el.nativeElement);

  if ($parent.hasClass('input-group')) {
    this.dpElement =  $parent;
    this.hasParent = true;
  } else {
    this.dpElement = jquery(this.el.nativeElement);
  }

  this.appendCalendarIcon();

  this.dpElement.datetimepicker(this.internalOptions);
  this.dpElement.data('DateTimePicker').date(this.date);

  this.dpElement.on('dp.change', (e) => {

    if (e.date !== this.date) {
      this.date = e.date;
      this.change.emit(e.date);
      this.utcChange.emit(this.formatToUtc(e.date));
    }
  });

  this.dpElement.on('keydown', (e: KeyboardEvent) => {
    e.preventDefault();
  });

  this.dpElement.on('click', (e: MouseEvent) => {
    this.click.emit();
  }
  );
}

ngOnChanges(changes: SimpleChanges): void {
  if (this.dpElement) {
    const dpe = this.dpElement.data('DateTimePicker');

    if (!!dpe) {
      if (changes.options) {
        jquery.map(changes.options.currentValue, (value, key) => {
          dpe[key](value);
        });
      }

      if (changes.date && changes.date.currentValue !== undefined) {
        dpe.date(changes.date.currentValue);
      } else {
        dpe.date(null);
      }
    }
  }

}

private appendCalendarIcon() {
  const groupAddon = document.createElement('span');
  const calendarIcon = document.createElement('span');

  groupAddon.setAttribute('class', 'input-group-addon calendar-addon');
  calendarIcon.setAttribute('class', 'glyphicon glyphicon-calendar');

  groupAddon.appendChild(calendarIcon);

  if (this.hasParent) {
    this.dpElement.append(groupAddon);
    this.dpElement.addClass('datepicker');
  } else {
    this.dpElement.parent().addClass('datepicker');
    this.dpElement.after(groupAddon);
  }

}

}
