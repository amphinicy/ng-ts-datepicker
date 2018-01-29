# NgTsDatepicker

Angular (4+) directive which wraps http://eonasdan.github.io/bootstrap-datetimepicker/ component.

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
    [date]="datepickerValue"
    [options]="datepickerOptions"
    (change)="dateChange($event)"
    (click)="dateClick()"
    (utcChange)="utcChange($event)">
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

  utcChange(date: string) {}

  dateClick() {}
```

#### Properties

- date - initial date value
- options - options based on http://eonasdan.github.io/bootstrap-datetimepicker/Options/ plus some additional options:
  - preventInputKeys (prevents entering values manually into input, defaults to true)

#### Events
- change - once date is changed it will emit date object
- utcChange - once date is changed it will emit date string in UTC
- click - once date picker is clicked with empty value

## Dependencies

They are already in package.json, but here is a list:

- eonasdan-bootstrap-datetimepicker (http://eonasdan.github.io/bootstrap-datetimepicker/)
- jquery (https://jquery.com/)
- moment (https://momentjs.com/)

## Release notes
- 1.0.0
  - first stable version
