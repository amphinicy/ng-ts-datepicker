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
import { DATETIME_FORMAT } from './format.enum';
const jquery = jqueryImport;

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ngTsDatepicker]'
})
export class NgTsDatepickerDirective implements OnInit, OnChanges {

  /**
   * Initial date value
   */
  @Input() date: Moment;
  /**
   * Options based on http://eonasdan.github.io/bootstrap-datetimepicker/Options/ plus some additional options:
   *
   * - preventInputKeys (prevents entering values manually into input, defaults to true)
   */
  @Input() options;
  /**
   * Emits date selected from datepicker
   */
  @Output() change: EventEmitter<Moment> = new EventEmitter<Moment>();
  /**
   * Emits string in UTC based on value selected in datepicker
   */
  @Output() utcChange: EventEmitter<string> = new EventEmitter<string>();
  /**
   * Emits empty value once datepicker is clicked
   */
  @Output() click: EventEmitter<any> = new EventEmitter<any>();

  private dpElement;
  private defaultOptions: any = {
    allowInputToggle: true,
    format: DATETIME_FORMAT,
    preventInputKeys: true
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
    return utc(date, this.internalOptions.format).format(this.internalOptions.format);
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

    const datepickerOptions = Object.assign({}, this.internalOptions);
    delete datepickerOptions.preventInputKeys;

    this.dpElement.datetimepicker(datepickerOptions);
    this.dpElement.data('DateTimePicker').date(this.date);

    this.dpElement.on('dp.change', (e) => {

      if (e.date !== this.date) {
        this.date = e.date;
        this.change.emit(e.date);
        this.utcChange.emit(this.formatToUtc(e.date));
      }
    });

    if (this.internalOptions.preventInputKeys) {
      this.dpElement.on('keydown', (e: KeyboardEvent) => {
        e.preventDefault();
      });
    }

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
