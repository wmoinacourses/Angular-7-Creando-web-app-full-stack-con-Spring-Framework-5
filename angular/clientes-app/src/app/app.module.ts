import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';

// Servicios
import { ClienteService } from './clientes/cliente.service';

// Routing
import { RouterModule, Routes } from '@angular/router';

// HTTP CLIENTE NS PERMITE CONECTARNOS CON EL SERVIDOR
// ESTO PERMITE REALIZAR PETICIONES HTTP GET POST PUT DELETE API REST FULL

import {HttpClientModule} from '@angular/common/http';


const routes: Routes = [
  { path: '', redirectTo: '/clientes', pathMatch: 'full' },
  { path: 'directivas', component: DirectivaComponent },
  { path: 'clientes', component: ClientesComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent
  ],
  imports: [BrowserModule, HttpClientModule, RouterModule.forRoot(routes)],
  providers: [ClienteService],
  bootstrap: [AppComponent]
})
export class AppModule {}
