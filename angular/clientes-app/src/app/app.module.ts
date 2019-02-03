import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Componentes
import { AppComponent } from './app.component';
import { HeaderComponent} from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';

// Servicios
import { ClienteService } from './clientes/cliente.service';

@NgModule({
   declarations: [
      AppComponent,
      HeaderComponent,
      FooterComponent,
      DirectivaComponent,
      ClientesComponent
   ],
   imports: [
      BrowserModule
   ],
   providers: [ClienteService],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
