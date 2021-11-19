import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { IndexComponent } from './index/index.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SobreComponent } from './sobre/sobre.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { MedicosComponent } from './medicos/medicos.component';
import { AgendaService } from './agenda.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyBTDuiN40n-JK4rufVEAg3JrwlP9Vt-Teg',
      authDomain: 'autenticacaoangular-21729.firebaseapp.com',
      databaseURL: 'https://autenticacaoangular-21729.firebaseio.com',
      projectId: 'autenticacaoangular-21729',
      storageBucket: 'autenticacaoangular-21729.appspot.com',
      messagingSenderId: '318141514531',
    }),
    RouterModule.forRoot([
      { path: 'medicos', component: MedicosComponent },
      { path: 'pacientes', component: PacientesComponent },
      { path: 'sobre', component: SobreComponent },
    ]),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],

  declarations: [
    AppComponent,
    HelloComponent,
    IndexComponent,
    SobreComponent,
    PacientesComponent,
    MedicosComponent,
  ],
  bootstrap: [AppComponent],
  providers: [AuthService, AgendaService],
})
export class AppModule {}
