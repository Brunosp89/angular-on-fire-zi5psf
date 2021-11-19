import { Component, OnInit } from '@angular/core';
//import {AngularFireDatabase, AngularFireList,} from '@angular/fire/database/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Timestamp } from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { AgendaService } from '../agenda.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css'],
})
export class MedicosComponent implements OnInit {
  nome: string;
  especialidade: string;
  contato: string;

  listRef: AngularFireList<any>;
  listMedico: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
  ) {
    this.listRef = db.list('listMedico');
    this.listMedico = this.listRef
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
      especialidade: this.especialidade,
      contato: this.contato,
      //email: this.authService.currentUserEmail,
    });
    this.nome = null;
    this.especialidade = null;
    this.contato = null;
  }

  deleteItem(key: string) {
    this.listRef.remove(key);
  }
}
