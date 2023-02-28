import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProduct } from 'src/app/utils/interfaces/product.interface';
import { Observable, throwError, retry, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getProducts(): Observable<IProduct[]>{
    let apiUrl: string = 'https://api-q4.onrender.com/productos'
    return this.httpClient.get<IProduct[]>(apiUrl)
    .pipe(
      retry(3),
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
