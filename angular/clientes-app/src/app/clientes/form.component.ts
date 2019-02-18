import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private title = 'Crear Clinete';
  private cliente: Cliente = new Cliente();
  private errores: string[];

  constructor(private clienteservice: ClienteService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.cargarCliente();
  }

  public create(): void {
    this.clienteservice.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire('Nuevo cliente', `Se ha creado con exito el cliente ${cliente.nombre} !`, 'success');
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo de error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteservice.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        );
      }
    });
  }

  update(): void {
    this.clienteservice.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
        Swal.fire('Actualizar cliente', `${json.mensaje}: ${json.cliente.nombre}`, 'success' );
      },
      err => {
        this.errores = err.error.errors as string[];
        console.error('Codigo de error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

}
