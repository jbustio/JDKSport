
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import { EquipoService } from '../../../services/equipo.service';
import { JugadorService } from '../../../services/jugador.service';
import { Jugador } from '../../../models/jugador';
import { Equipo } from '../../../models/equipo';
import { from } from 'rxjs';
import { JugadorComponent } from '../../jugador/jugador.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-roster-dialog',
  templateUrl: './roster-dialog.component.html',
  styleUrls: ['./roster-dialog.component.css']
})
export class RosterDialogComponent implements OnInit {

  jugadorForm: FormGroup;
  jugadores : Array<Jugador>;
  public posiciones = environment.posiciones;

  constructor( private equipoService: EquipoService,
    private jugadorService: JugadorService,
    private formBuilder: FormBuilder, 
    private dialogRef: MatDialogRef<RosterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data:any) { 
          this.jugadorForm = this.formBuilder.group({
            _id: [data.jugador._id],
            jugador: [data.jugador, Validators.required],
            numero: [data.jugador.numero, Validators.required],
            posicion: [data.jugador.posicion, Validators.required],
            equipos: [data.jugador.equipos, Validators.required],
            jugadorCuadro: [data.jugador.jugadorCuadro, Validators.required],
            h: [data.jugador.h, Validators.required],
            vb: [data.jugador.vb, Validators.required],
            hr: [data.jugador.hr, Validators.required],
            ci: [data.jugador.ci, Validators.required],
            jg: [data.jugador.jg, Validators.required],
            jp: [data.jugador.jp, Validators.required],
            js: [data.jugador.js, Validators.required],
            pcl: [data.jugador.pcl, Validators.required],
            inn: [data.jugador.inn, Validators.required],
            k: [data.jugador.k, Validators.required],
            bbola: [data.jugador.bbola, Validators.required],
          });
    this.getJugadores(data.equipo);
  }

  ngOnInit() {
  }

  getJugadores(equipo: Equipo){
    return this.jugadorService.getJugadoresPorEquipo(equipo._id)
    .subscribe(res => {
      this.jugadores = res as Jugador[];
      // M.toast({html: 'Save successfully'});
    });
  }
  compareFn(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1._id === obj2._id : obj1 === obj2;
  }
  comparebs(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1 === obj2 : obj1 === obj2;
  }


  updateJugador(){
    var jugador = this.jugadorForm.get('jugador').value;

    this.jugadorForm.setValue({
      _id: jugador._id,
      numero: jugador.numero,
      posicion: jugador.posicion,
      equipos: jugador.equipos,
      jugador: jugador,
      jugadorCuadro: jugador.jugadorCuadro,
      h: jugador.h,
      vb: jugador.vb, 
      hr: jugador.hr, 
      ci: jugador.ci,
      jg: jugador.jg, 
      jp: jugador.jp, 
      js: jugador.js, 
      pcl: jugador.pcl, 
      inn: jugador.inn, 
      k: jugador.k, 
      bbola: jugador.bbola,
    })
  }

  save() {
    let jugador = this.jugadorForm.get('jugador').value;
    jugador.numero = this.jugadorForm.get('numero').value;
    jugador.posicion = this.jugadorForm.get('posicion').value;
    jugador.equipos = this.jugadorForm.get('equipos').value;
    jugador.jugadorCuadro = this.jugadorForm.get('jugadorCuadro').value;
    jugador.h = this.jugadorForm.get('h').value;
    jugador.vb = this.jugadorForm.get('vb').value;
    jugador.hr = this.jugadorForm.get('hr').value; 
    jugador.ci = this.jugadorForm.get('ci').value;
    jugador.jg= this.jugadorForm.get('jg').value; 
    jugador.jp= this.jugadorForm.get('jp').value;
    jugador.js= this.jugadorForm.get('js').value;
    jugador.pcl= this.jugadorForm.get('pcl').value; 
    jugador.inn= this.jugadorForm.get('inn').value;
    jugador.k= this.jugadorForm.get('k').value;
    jugador.bbola= this.jugadorForm.get('bbola').value;
    this.jugadorForm.get('jugador').setValue(jugador);
    this.dialogRef.close(this.jugadorForm.value);
  }

  close() {
    this.dialogRef.close();
}

}
