import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Categoria } from './categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiURL = "http://192.168.0.5:8000/api/categoria/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x_api_key': '123456789',
    })
 }

 constructor(private httpClient: HttpClient) { }


  getAll(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.apiURL,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  create(categoria: any): Observable<Categoria> {
    return this.httpClient.post<Categoria>(this.apiURL, JSON.stringify(categoria), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  find(id: any): Observable<Categoria> {
    return this.httpClient.get<Categoria>(this.apiURL + id,this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
    console.log(this.httpClient.get<Categoria>(this.apiURL + id));
  }

  update(id: any, categoria: any): Observable<Categoria> {
    return this.httpClient.put<Categoria>(this.apiURL + id, JSON.stringify(categoria), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
    console.log(this.httpClient.put<Categoria>(this.apiURL + id, JSON.stringify(categoria), this.httpOptions));
  }

  delete(id: any){
    return this.httpClient.delete<Categoria>(this.apiURL + id, this.httpOptions)
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
