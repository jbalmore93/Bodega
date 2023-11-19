import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiURL = "http://192.168.0.5:8000/api/producto/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x_api_key': '123456789',
    })
 }

 constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.apiURL,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(producto: any): Observable<Producto> {
    return this.httpClient.post<Producto>(this.apiURL, JSON.stringify(producto), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id: any): Observable<Producto> {
    return this.httpClient.get<Producto>(this.apiURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  update(id: any, producto: any): Observable<Producto> {
    return this.httpClient.put<Producto>(this.apiURL + id, JSON.stringify(producto), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  delete(id: any){
    return this.httpClient.delete<Producto>(this.apiURL + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
