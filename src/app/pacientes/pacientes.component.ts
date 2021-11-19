import { Component, OnInit } from '@angular/core';
//import {AngularFireDatabase, AngularFireList,} from '@angular/fire/database/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Timestamp } from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { MedicosComponent } from '../medicos/medicos.component';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.css'],
})
export class PacientesComponent implements OnInit {
  nome: string;
  data: Date;
  medico: string;

  listRef: AngularFireList<any>;
  list: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService,
    public agendaService: AgendaService
  ) {
    this.listRef = db.list('list');
    this.list = this.listRef
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  ngOnInit() {}
  addItem() {
    this.listRef.push({
      nome: this.nome,
      data: this.data,
      medico: this.medico,
      //email: this.authService.currentUserEmail,
    });
    this.nome = null;
    this.data = null;
    this.medico = null;
  }

  deleteItem(key: string) {
    this.listRef.remove(key);
  }
}
