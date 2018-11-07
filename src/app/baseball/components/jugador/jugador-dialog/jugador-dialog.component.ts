import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { EquipoService } from '../../../services/equipo.service';
import { environment } from '../../../../../environments/environment';

import { Jugador } from '../../../models/jugador';

@Component({
  selector: 'app-jugador-dialog',
  templateUrl: './jugador-dialog.component.html',
  styleUrls: ['./jugador-dialog.component.css']
})
export class JugadorDialogComponent implements OnInit {

  jugadorForm: FormGroup;
  public posiciones = environment.posiciones;

  constructor( private equipoService: EquipoService,private formBuilder: FormBuilder, private dialogRef: MatDialogRef<JugadorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) jugador:Jugador) { 
          this.jugadorForm = this.formBuilder.group({
            _id: [jugador._id],
            numero: [jugador.numero, Validators.required],
            nombre: [jugador.nombre, Validators.required],
            equipos: [jugador.equipos, Validators.required],
            jugadorCuadro: [jugador.jugadorCuadro, Validators.required],
            posicion: [jugador.posicion, Validators.required],
            h: [jugador.h, Validators.required],
            vb: [jugador.vb, Validators.required],
            hr: [jugador.hr, Validators.required],
            ci: [jugador.ci, Validators.required],
            jg: [jugador.jg, Validators.required],
            jp: [jugador.jp, Validators.required],
            js: [jugador.js, Validators.required],
            pcl: [jugador.pcl, Validators.required],
            inn: [jugador.inn, Validators.required],
            k: [jugador.k, Validators.required],
            bbola: [jugador.bbola, Validators.required],
          });
  }

  ngOnInit() {
  }

  compareFn(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1._id === obj2._id : obj1 === obj2;
  }

  comparebs(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1 === obj2 : obj1 === obj2;
  }
  save() {
    this.dialogRef.close(this.jugadorForm.value);
  }

  close() {
    this.dialogRef.close();
}

}
