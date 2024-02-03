import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secondsToTime'
})
export class SecondsToTimePipe implements PipeTransform {
  transform(value: number): string {
    if (!value || isNaN(value)) {
      return '00:00';
    }
    const minutes: number = Math.floor((value % 3600) / 60);
    const seconds: number = value % 60;
    const formattedTime: string = `${this.twoDigitFormat(minutes)}:${this.twoDigitFormat(seconds)}`;
    return formattedTime;
  }

  private twoDigitFormat(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
