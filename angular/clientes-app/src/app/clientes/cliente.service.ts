import { Injectable } from '@angular/core';
import { formatDate, DatePipe, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs';

// Importar httpclient
import { HttpClient, HttpHeaders } from '@angular/common/http';

// otra forma de recibir los datos y castearlos MAP
import { map, catchError, tap} from 'rxjs/operators';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable()
export class ClienteService {
  // tslint:disable-next-line:no-inferrable-types
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES);
    // hacemos un cats ya que nos devuelve un objeto del tipo observable any y necesitamos uno tipo cliente
   // return this.http.get<Cliente[]>(this.urlEndPoint);

    // usando el map utilizando una arrow fuctions o Closures
    return this.http.get(this.urlEndPoint).pipe(
      tap( response => {
        console.log('tap 1');
        let clientes = response as Cliente[];
        clientes.forEach( cliente => {
          console.log(cliente.nombre);
        });
      }),
      map( (response) => {
        const clientes = response as Cliente[];
        // en un map se retorna el valor modificado en este caso la lista de objetos modificada
        return clientes.map(cliente => {
          registerLocaleData (localeEs, 'es');
          const datePipe = new DatePipe('es');
          cliente.nombre = cliente.nombre.toUpperCase();
          cliente.apellido = cliente.apellido.toUpperCase();
         // cliente.email = cliente.email.toUpperCase();
         // cliente.createAt = datePipe.transform(cliente.createAt, 'MMMM d, y' );//formatDate(cliente.createAt, 'dd-MM-yyyy', 'en-US');
          return cliente;
        });
      }),
      tap( response => {
        console.log('tap 2');
        response.forEach( cliente => {
          console.log(cliente.nombre);
        });
      })
    );
  }
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndPoint, cliente, {
      headers: this.httpHeaders
    }).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status === 400) {
            return throwError(e);
        }
        this.router.navigate(['/cliente']);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e => {
        if (e.status === 400) {
          return throwError(e);
      }
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);

      })
    );
  }

  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);

      })
    );
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
      );
  }


}
