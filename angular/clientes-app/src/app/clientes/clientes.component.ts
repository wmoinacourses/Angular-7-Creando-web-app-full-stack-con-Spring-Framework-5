import { Component, OnInit } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente [];

  constructor() {}

  ngOnInit() {
    this.clientes = CLIENTES;
  }
}
