import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Timestamp } from 'rxjs/internal-compatibility';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AgendaService {
  nomePaciente: string;
  dataConsulta: Date;

  listRef: AngularFireList<any>;
  list: Observable<any[]>;

  nomeMedico: string;
  especialidade: string;
  contatoMedico: string;
  listMedico: Observable<any[]>;

  constructor(
    private db: AngularFireDatabase,
    private authService: AuthService
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
  // paciente
  addItemPaciente() {
    this.listRef.push({
      nomePaciente: this.nomePaciente,
      dataConsulta: this.dataConsulta,
      email: this.authService.currentUserEmail,
    });
    this.nomePaciente = null;
    this.dataConsulta = null;
  }

  deleteItemPaciente(key: string) {
    this.listRef.remove(key);
  }
  // fim paciente

  // Medico
  addItem() {
    this.listRef.push({
      nomeMedico: this.nomeMedico,
      especialidade: this.especialidade,
      contatoMedico: this.contatoMedico,
      //email: this.authService.currentUserEmail,
    });
    this.nomeMedico = null;
    this.especialidade = null;
    this.contatoMedico = null;
  }

  deleteItem(key: string) {
    this.listRef.remove(key);
  }
  //fim medico
}
