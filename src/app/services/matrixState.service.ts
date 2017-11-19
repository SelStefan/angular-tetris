import { Injectable } from '@angular/core';

@Injectable()
export class MatrixStateService {
    matrix;

    constructor() {
        this.matrix = ' '.repeat(20).split('').map(v =>
            'b'.repeat(10).split('')
        );
    }
}