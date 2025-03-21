import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from '@angular/common';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
  transform = (value: string | Date, format: string = 'MMM d, y, h:mm a', locale: string = 'en-US'): string | null =>
    value != null ? formatDate(value, format, locale) : null;
}
