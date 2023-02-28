import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IProvince } from 'src/app/utils/interfaces/province.interface';
import { map } from 'rxjs/operators';
import { Observable, throwError, retry, catchError  } from 'rxjs';
import { ICity } from 'src/app/utils/interfaces/city.interface';

@Injectable({
  providedIn: 'root'
})
export class GeografiaService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getProvinces():Observable<IProvince[]>{
    return this.httpClient.get('https://api-q4.onrender.com/estado/provincias')
      .pipe(
        map((response:any) => {
          return response.map((province:any) => {
            return {
              code: province.codigo,
              name: province.provincia
            }
          })
        }),
        retry(3),
        catchError(this.handleError)
    );
  }

  getCities(province: string): Observable<ICity[]>{
    return this.httpClient.get('https://api-q4.onrender.com/estado/provincias/'+province)
      .pipe(
        map((response:any) => {
          return response.map((city:any) => {
            return {
              code: city.id,
              name: city.canton
            }
          })
        }),
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
    return throwError(() => new Error('Algo malo sucedio - Intente seleccionar la provincia nuevamente.'));
  }
}
