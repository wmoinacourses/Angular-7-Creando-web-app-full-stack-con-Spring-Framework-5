import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private title = 'Crear Clinete';
  private cliente: Cliente = new Cliente();
  constructor(private clienteservice: ClienteService, private router: Router, private activatedRoute: ActivatedRoute ) { }

  ngOnInit() {
    this.cargarCliente();
  }

  public create(): void {
    this.clienteservice.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire('Nuevo cliente', `Cliente ${cliente.nombre} creado con exito!`, 'success');
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
      cliente => {
        this.router.navigate(['/clientes']);
        Swal.fire('Actualizar cliente', `Cliente ${cliente.nombre} se ha actualizado con exito`, 'success' );
      }
    );
  }

}
