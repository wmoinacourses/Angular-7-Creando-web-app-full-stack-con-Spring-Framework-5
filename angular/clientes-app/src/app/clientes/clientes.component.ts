import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente [];

  constructor(private clienteService: ClienteService ) {}

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }


  delete(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: `Estas seguro que quieres eliminar ${cliente.nombre}  ${cliente.apellido}? `,
      text: 'Confirmalo!',
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, cancelar! ',
      confirmButtonText: 'Si, eliminar! ',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(
          response => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `El cliente ${cliente.nombre} ha sido elimnado.`,
              'success'
            );
          }
        );
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelar',
          'No se ha realizado ningun accion :)',
          'error'
        );
      }
    });
  }

}
