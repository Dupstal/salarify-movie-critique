import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie';

@Pipe({
    name: 'getRatingsScore'
})
export class GetRatingsScorePipe implements PipeTransform {

    transform(movie: Movie) {
        let sum = 0;
        Object.values(movie.ratings).forEach(value => sum += value);
        const returnValue = sum / Object.keys(movie.ratings).length;
        return returnValue.toFixed(1);
    }
}