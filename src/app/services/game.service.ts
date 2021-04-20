import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private http: HttpClient) {}

  public getData(): Observable<any> {
    return this.http.get('./assets/words.json')
               .pipe(
                 map(result => result),
                 catchError(async (err) => console.log(err))
               );
  }
}
