import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'Wilmer',
      apellido: 'Moina',
      email: 'wilmermoinar@gmail.com',
      createAt: '2017-03-05'
    },
    {
      id: 2,
      nombre: 'Wilmer',
      apellido: 'Moina',
      email: 'wilmermoinar@gmail.com',
      createAt: '2017-03-05'
    },
    {
      id: 3,
      nombre: 'Wilmer',
      apellido: 'Moina',
      email: 'wilmermoinar@gmail.com',
      createAt: '2017-03-05'
    },
    {
      id: 4,
      nombre: 'Wilmer',
      apellido: 'Moina',
      email: 'wilmermoinar@gmail.com',
      createAt: '2017-03-05'
    },
    {
      id: 5,
      nombre: 'Wilmer',
      apellido: 'Moina',
      email: 'wilmermoinar@gmail.com',
      createAt: '2017-03-05'
    },
    {
      id: 6,
      nombre: 'Wilmer',
      apellido: 'Moina',
      email: 'wilmermoinar@gmail.com',
      createAt: '2017-03-05'
    },
  ];
  constructor() {}

  ngOnInit() {}
}
