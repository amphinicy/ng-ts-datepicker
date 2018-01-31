[![Build Status](https://travis-ci.org/amphinicy/ng-ts-datepicker.svg?branch=master)](https://travis-ci.org/amphinicy/ng-ts-datepicker)

# NgTsDatepicker

Angular (4+) directive which wraps http://eonasdan.github.io/bootstrap-datetimepicker/ component.

![image](https://user-images.githubusercontent.com/2838038/35628522-73da393c-069c-11e8-953d-0bbc3b6ac785.png)

## Installation

`npm install ng-ts-datepicker --save`

## Usage

### Import module

```ts
import { NgTsDatepickerModule } from 'ng-ts-datepicker';
. . .
@NgModule({
  . . .
  imports : [
    . . .
    NgTsDatepickerModule
  ]
```

### Use component

Put it inside a element with input-group class so it gets proper icon displayed:

```html
<div class="input-group">
  <input class="form-control"
    ngTsDatepicker
    [(date)]="datepickerValue"
    [options]="datepickerOptions"
    (change)="dateChange($event)"
    (click)="dateClick()">
</div>
```

```ts
  datepickerOptions = {
    allowInputToggle: true,
    format: DATETIME_FORMAT,
    showClear: true,
    showClose: true
  };
  datepickerValue = null;

  dateChange(date: date) {}

  dateClick() {}
```

#### Properties

- date - initial date value
- options - options based on http://eonasdan.github.io/bootstrap-datetimepicker/Options/ plus some additional options:
  - preventInputKeys (prevents entering values manually into input, defaults to true)

#### Events
- change - once date is changed it will emit date object
- click - once date picker is clicked with empty value

## Dependencies

They are already in package.json, but here is a list:

- eonasdan-bootstrap-datetimepicker (http://eonasdan.github.io/bootstrap-datetimepicker/)
- jquery (https://jquery.com/)
- moment (https://momentjs.com/)

## Release notes
- 1.0.0
  - first stable version
