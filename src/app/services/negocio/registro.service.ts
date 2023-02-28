import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, retry, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  constructor(
    private http: HttpClient
  ) { }

  registerPerson(person:any){
    let urlApi: string = 'https://api-q4.onrender.com/registro';
    return this.http.post(urlApi, person)
    .pipe(
      catchError(this.handleError)
    );
  }

  // HANDLER DE ERRORES
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Un error ha ocurrido:', error.error);
    } else {
      console.error(`Servidor emitio un codigo ${error.status}, y la respuesta es: `, error.error);
    }
    return throwError(() => new Error('Algo malo sucedio - Inténtelo de nuevo más tarde.'));
  }
}
