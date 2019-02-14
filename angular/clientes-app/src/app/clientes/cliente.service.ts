import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of, Observable } from 'rxjs';

// Importar httpclient
import { HttpClient, HttpHeaders } from '@angular/common/http';

// otra forma de recibir los datos y castearlos MAP
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {
  // tslint:disable-next-line:no-inferrable-types
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    // return of(CLIENTES);
    // hacemos un cats ya que nos devuelve un objeto del tipo observable any y necesitamos uno tipo cliente
    return this.http.get<Cliente[]>(this.urlEndPoint);

    // usando el map utilizando una arrow fuctions o Closures
    // return this.http.get(this.urlEndPoint).pipe(
    //   map( (response) => response as Cliente[])
    // );
  }
  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {
      headers: this.httpHeaders
    });
  }

  getCliente(id: any): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`);
  }

  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.httpHeaders});
  }


}
