import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of , Observable } from 'rxjs';

// Importar httpclient
import { HttpClient } from '@angular/common/http';

// otra forma de recibir los datos y castearlos MAP
import { map } from 'rxjs/operators';

@Injectable()
export class ClienteService {

  private urlEndPoint:string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable <Cliente[]> {
    // return of(CLIENTES);
    // hacemos un cats ya que nos devuelve un objeto del tipo observable any y necesitamos uno tipo cliente
     return this. http.get<Cliente[]>(this.urlEndPoint);

    // usando el map utilizando una arrow fuctions o Closures
    // return this.http.get(this.urlEndPoint).pipe(
    //   map( (response) => response as Cliente[])
    // );
  }
}
