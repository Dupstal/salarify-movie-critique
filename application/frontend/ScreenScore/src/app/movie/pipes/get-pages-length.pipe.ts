import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getPagesLength'
})
export class GetPagesLengthPipe implements PipeTransform {

    transform(length: number) {
        return Array(length).fill(0).map((x, i) => i + 1);
    }
}