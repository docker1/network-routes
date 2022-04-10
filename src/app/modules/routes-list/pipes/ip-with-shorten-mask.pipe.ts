import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ipWithShortenMask',
})
export class IpWithShortenMaskPipe implements PipeTransform {
  transform(value: string, mask: string): string {
    const shortenMask = mask.split('.').reduce((prev, current) => {
      return prev + ((+current).toString(2).match(/1/g) || []).length;
    }, 0);
    return `${value}/${shortenMask}`;
  }
}
