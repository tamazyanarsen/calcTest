import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CalcService {

    constructor(private http: HttpClient) {
    }

    calc(e, func) {
        this.http.post('http://localhost:3000/api', { action: 'Calc', data: e }).toPromise().then(func);
    }
}
