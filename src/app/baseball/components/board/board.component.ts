import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { JuegoService } from "../../services/juego.service";
import { JugadorService } from '../../services/jugador.service';
import { environment } from '../../../../environments/environment';
import { Router } from "@angular/router";
import { Juego } from "../../models/juego";
import { Jugador } from '../../models/jugador';
import { CdkColumnDef } from '@angular/cdk/table';
import { RosterDialogComponent } from './roster-dialog/roster-dialog.component';
import { Equipo } from '../../models/equipo';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})

export class BoardComponent implements OnInit {

  juego: Juego;
  public innngs: number = 9;
  public dekoGr = environment.dekoGr;
  public bateadorEnturno: Jugador;
  public toggleAct: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private juegoService: JuegoService,
    private dialog: MatDialog,
    private jugadorService: JugadorService) {
    let juegoId = localStorage.getItem("juegoId");
    if (juegoId) {
      this.juegoService.getJuegoById(juegoId)
        .subscribe(data => {
          this.setvalue(data as Juego);
        });
    }
  }

  ngOnInit() {

  }

  cambiarJugador(valor: any, indice: any, rosterv: boolean) {
    if (valor.jugador && valor.jugador._id != "") {
      this.jugadorService.putJugador(valor.jugador)
        .subscribe(res => {
          if (rosterv) {
            this.jugadorService.getJugadorPorID(valor.jugador._id)
            .subscribe(res =>{
                this.juego.rosterv[indice] = res as Jugador;
                if (this.juego.partInn == 0){
                  this.bateadorEnturno = this.juego.rosterv[this.juego.albatev];
                } else {
                  this.bateadorEnturno = this.juego.rosterh[this.juego.albateh];
                }
            });
          } else {
            this.jugadorService.getJugadorPorID(valor.jugador._id)
            .subscribe(res =>{
                this.juego.rosterh[indice] =  res as Jugador;
                if (this.juego.partInn == 0){
                  this.bateadorEnturno = this.juego.rosterv[this.juego.albatev];
                } else {
                  this.bateadorEnturno = this.juego.rosterh[this.juego.albateh];
                }
            });
          }
          if(indice==9){
            if (this.juego.partInn == 0){
              this.juego.lanzamientosh=0;
            } else {
              this.juego.lanzamientosv=0;
            }
            this.updateLanzadorData();
            this.updateJuego();
          }
          this.updateBateadorData();
        });
    }
  }

  editJugadorRoster(jugador: Jugador, equipo: Equipo, indice: any, rosterv: boolean) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (jugador) {
      dialogConfig.data = { jugador: jugador, equipo: equipo };
    } else {
      dialogConfig.data = { jugador: new Jugador, equipo: new Equipo };
    }

    const dialogRef = this.dialog.open(RosterDialogComponent,
      dialogConfig);
    dialogRef.afterClosed().subscribe(
      val => this.cambiarJugador(val, indice, rosterv)
    );

  }

  setvalue(juego: Juego) {
    this.juego = juego;
    this.juego.bolas = juego.bolas || 0;
    this.juego.strike = 0;
    this.juego.out = 0;
    this.juego.foul = 0;
    this.juego.inn = 1;
    this.juego.partInn = 0;
    this.juego.errorh = 0;
    this.juego.errorv = 0;
    this.juego.carrerash = 0;
    this.juego.carrerasv = 0;
    this.juego.comentarista1 = '';
    this.juego.comentarista2 = '';
    this.juego.comentarista3 = '';
    this.juego.arbitro1 = '';
    this.juego.arbitro2 = '';
    this.juego.arbitro3 = '';
    this.juego.arbitrocf = '';
    this.juego.arbitroh = '';
    this.juego.arbitrolf = '';
    this.juego.arbitrorf = '';
    this.juego.hith = 0;
    this.juego.hitv = 0;
    this.juego.lanzamientosh = 0;
    this.juego.lanzamientosv = 0;
    this.juego.corredorPB = false;
    this.juego.corredorSB = false;
    this.juego.corredorTB = false;
    this.juego.rosterv = [new Jugador, new Jugador, new Jugador, new Jugador, new Jugador, new Jugador, new Jugador, new Jugador, new Jugador, new Jugador];
    this.juego.rosterh = [new Jugador, new Jugador, new Jugador, new Jugador, new Jugador, new Jugador, new Jugador, new Jugador, new Jugador, new Jugador];
    this.juego.albatev = 0;
    this.juego.albateh = 0;
    this.bateadorEnturno = this.juego.rosterv[0];
    this.runMacro('showtop');
  }

  initData() {
    this.updateLanzadorData();
    this.updateJuegoData();
    this.updateRosterData();
    this.updateBateadorData();
    this.updateCampoData();
    this.updateTresAlBate();
  }

  ejecutarMacrosP() {
    if (this.juego.partInn == 0) {
      this.runMacro('showtop');
    } else {
      this.runMacro('showbot');
    }
    if (this.juego.corredorPB) {
      this.runMacro('showpb');
    } else {
      this.runMacro('hidepb');
    }
    if (this.juego.corredorSB) {
      this.runMacro('showsb');
    } else {
      this.runMacro('hidesb');
    }
    if (this.juego.corredorTB) {
      this.runMacro('showtb');
    } else {
      this.runMacro('hidetb');
    }
  }

  CambiarPantalla(valor:string){
    this.runMacro('view_show '+valor);
  }
  showGr(grSelected, value) {
    if (value.checked === true) {
      this.toggleAct = value.source.name;
      this.playGr(grSelected);
      if (grSelected == 11)
        this.ejecutarMacrosP();
    } else {
      this.runMacro('clear layers');
    }
  }

  playGr(data: string) {
    this.juegoService.playGr(data)
      .subscribe(res => {
        console.log(res);
      });
  }

  updateJuego() {
    this.juegoService.putJuego(this.juego)
      .subscribe(res => {
        // M.toast({html: 'Updated Successfully'});
      });
    /*     
        this.juegoService.updateData(data)
        .subscribe(res => {
          console.log(res);
        });; */
    this.updateJuegoData();
  }

  cambiarBateador() {
      if (this.juego.partInn == 0) {
        if (this.juego.albatev > 7) {
          this.juego.albatev = 0;
        } else {
          this.juego.albatev += 1;
        }
        this.bateadorEnturno = this.juego.rosterv[this.juego.albatev];
      } else {
        if (this.juego.albateh > 7) {
          this.juego.albateh = 0;
        } else {
          this.juego.albateh += 1;
        }
        this.bateadorEnturno = this.juego.rosterh[this.juego.albateh];
      }
    this.updateBateadorData();
  }

  decrementarBateador() {
    if (this.juego.partInn == 0) {
        if (this.juego.albatev < 1) {
          this.juego.albatev = 8;
        } else {
          this.juego.albatev -= 1;
        }
        this.bateadorEnturno = this.juego.rosterv[this.juego.albatev];
      } else {
        if (this.juego.albateh < 1) {
          this.juego.albateh = 8;
        } else {
          this.juego.albateh -= 1;
        }
        this.bateadorEnturno = this.juego.rosterh[this.juego.albateh];
      }
    this.updateBateadorData();
  }
  actualizarEstadisticas() {

  }

  avanzarCorredores(valor: string) {
    if (this.juego.corredorPB && this.juego.corredorSB && this.juego.corredorTB) {
      switch (valor) {
        case 'h':
          this.incrementarValor('c');
          break;
        case 'hh':
          if (this.juego.partInn == 0) {
            this.juego.carrerasv += 2;
          } else {
            this.juego.carrerash += 2;
          }
          this.juego.corredorPB = false;
          this.runMacro('hidepb');
          break;
      }
    } else {
      if (this.juego.corredorPB && this.juego.corredorSB) {
        switch (valor) {
          case 'h':
            this.juego.corredorTB = true;
            this.runMacro('showtb');
            break;
          case 'hh':
            this.incrementarValor('c');
            this.juego.corredorPB = false;
            this.runMacro('hidepb');
            this.juego.corredorTB = true;
            this.runMacro('showtb');
            break;
        }
      } else {
        if (this.juego.corredorPB && this.juego.corredorTB) {
          switch (valor) {
            case 'h':
              this.incrementarValor('c');
              this.juego.corredorTB = false;
              this.runMacro('hidetb');
              this.juego.corredorSB = true;
              this.runMacro('showsb');
              break;
            case 'hh':
              this.incrementarValor('c');
              this.juego.corredorPB = false;
              this.runMacro('hidepb');
              this.juego.corredorSB = true;
              this.runMacro('showsb');
              break;
          }

        } else {
          if (this.juego.corredorPB) {
            console.log('entre al if');
            switch (valor) {
              case 'h':
                console.log('entre');
                this.juego.corredorSB = true;
                this.runMacro('showsb');
                break;
              case 'hh':
                this.juego.corredorPB = false;
                this.runMacro('hidepb');
                this.juego.corredorSB = true;
                this.runMacro('showsb');
                this.juego.corredorTB = true;
                this.runMacro('showtb');
                break;
            }
          } else {
            if (this.juego.corredorSB && this.juego.corredorTB) {
              switch (valor) {
                case 'h':
                  this.juego.corredorPB = true;
                  this.juego.corredorSB = false;
                  this.runMacro('hidesb');
                  this.runMacro('showpb');
                  this.incrementarValor('c');
                  break;
                case 'hh':
                  this.incrementarValor('c');
                  break;
              }
            } else {
              if (this.juego.corredorSB) {
                switch (valor) {
                  case 'h':
                    this.juego.corredorPB = true;
                    this.runMacro('showpb');
                    this.juego.corredorTB = true;
                    this.runMacro('showtb');
                    this.juego.corredorSB = false;
                    this.runMacro('hidesb');
                    break;
                  case 'hh':
                    this.juego.corredorTB = true;
                    this.runMacro('showtb');
                    break;

                }
              } else {
                if (this.juego.corredorTB) {
                  switch (valor) {
                    case 'h':
                      this.incrementarValor('c');
                      this.juego.corredorPB = true;
                      this.runMacro('showpb');
                      this.juego.corredorTB = false;
                      this.runMacro('hidetb');
                      break;
                    case 'hh':
                      this.incrementarValor('c');
                      this.juego.corredorTB = false;
                      this.runMacro('hidetb');
                      this.juego.corredorSB = true;
                      this.runMacro('showsb');
                      break;
                  }
                } else {
                  switch (valor) {
                    case 'h':
                      this.juego.corredorPB = true;
                      this.runMacro('showpb');
                      break;
                    case 'hh':
                      this.juego.corredorSB = true;
                      this.runMacro('showsb');
                      break;
                  }
                }
              }
            }
          }
        }
      }
    }
    switch (valor) {
      case 'b': //base por bola
        if (this.juego.corredorPB == false) {
          this.juego.corredorPB = true;
          this.runMacro('showpb');
        } else {
          if (this.juego.corredorSB == false) {
            this.juego.corredorSB = true;
            this.runMacro('showsb');
          } else {
            if (this.juego.corredorTB == false) {
              this.juego.corredorTB = true;
              this.runMacro('showtb');
            } else {
              this.incrementarValor('c');
            }
          }
        }
        break;
      //Entrar todas las carreras en caso de jonron o triple
      default:
        break;
    }
  }

  incrementarValor(valor: string) {
    switch (valor) {
      case 'l': //Lanzamiento
        if (this.juego.partInn == 0) {
          this.juego.lanzamientosh += 1;
        } else {
          this.juego.lanzamientosv += 1;
        }
        break;
      case 'b': //Bolas
        if (this.juego.bolas < 3) {
          this.juego.bolas += 1;
        } else {
          this.cambiarBateador();
          this.avanzarCorredores('b');
          this.juego.bolas = 0;
          this.juego.strike = 0;
          this.juego.foul = 0;
        }
        this.incrementarValor('l');
        break;
      case 's': //Strike
        if (this.juego.strike < 2) {
          this.juego.strike += 1;
        } else {
          this.incrementarValor('o');
          this.juego.bolas = 0;
          this.juego.strike = 0;
          this.juego.foul = 0;
        }
        this.incrementarValor('l');
        break;
      case 'o': //Out
        if (this.juego.out < 2) {
          this.juego.out += 1;
          this.cambiarBateador();
        } else {
          this.juego.out = 0;
          this.incrementarValor('i');
          this.updateTresAlBate();
        }
        this.juego.bolas = 0;
        this.juego.strike = 0;
        this.juego.foul = 0;
        break;
      case 'f': //Foul
        if (this.juego.strike < 2) {
          this.juego.foul += 1;
          this.incrementarValor('s');
        } else {
          this.incrementarValor('l');
        }

        break;
      case 'c': //Carreras
        if (this.juego.partInn == 0) {
          this.juego.carrerasv += 1;
        } else {
          this.juego.carrerash += 1;
        }
        break;
      case 'e': //Errores
        if (this.juego.partInn == 0) {
          this.juego.errorh += 1;
        } else {
          this.juego.errorv += 1;
        }

        break;
      case 'i': //inning
        if (this.juego.partInn == 1) {
          this.juego.inn += 1;
        }
        this.incrementarValor('pi');
        break;
      case 'pi': //Parte del Inning
        if (this.juego.partInn == 0) {
          this.bateadorEnturno = this.juego.rosterh[this.juego.albateh];
          this.juego.albatev+=1;
          if (this.juego.inn == 1) {
            this.updateRosterData();
          }
          this.juego.partInn = 1;
          this.runMacro('showbot');
        }
         else {
          this.bateadorEnturno = this.juego.rosterv[this.juego.albatev];
          this.juego.albateh+=1;
          this.juego.partInn = 0;
          this.runMacro('showtop');
        }
        break;
      case 'h': //Carreras
        if (this.juego.partInn == 0) {
          this.juego.hitv += 1;
        } else {
          this.juego.hith += 1;
        }
        this.juego.bolas = 0;
        this.juego.strike = 0;
        this.cambiarBateador();
        this.incrementarValor('l');
        this.avanzarCorredores(valor);
        break;
      case 'hh': //doble
        if (this.juego.partInn == 0) {
          this.juego.hitv += 1;
        } else {
          this.juego.hith += 1;
        }
        this.juego.bolas = 0;
        this.juego.strike = 0;
        this.cambiarBateador();
        this.incrementarValor('l');
        this.avanzarCorredores(valor);
        break;
      case 'hhhh': //home run
        var cont = 1;
        if (this.juego.corredorPB) {
          this.juego.corredorPB = false;
          this.runMacro('hidepb');
          cont += 1;
        }
        if (this.juego.corredorSB) {
          this.juego.corredorSB = false;
          this.runMacro('hidesb');
          cont += 1;
        }
        if (this.juego.corredorTB) {
          this.juego.corredorTB = false;
          this.runMacro('hidetb');
          cont += 1;
        }
        if (this.juego.partInn == 0) {
          this.juego.carrerasv += cont;
          this.juego.hitv += 1;
        } else {
          this.juego.carrerash += cont;
          this.juego.hith += 1;
        }
        this.juego.bolas = 0;
        this.juego.strike = 0;
        this.cambiarBateador();
        break;
      case 'hhh': //triple
        var cont = 0;
        if (this.juego.corredorPB) {
          this.juego.corredorPB = false;
          this.runMacro('hidepb');
          cont += 1;
        }
        if (this.juego.corredorSB) {
          this.juego.corredorSB = false;
          this.runMacro('hidesb');
          cont += 1;
        }
        if (this.juego.corredorTB) {
          cont += 1;
        } else {
          this.juego.corredorTB = true;
          this.runMacro('showtb');
        }
        if (this.juego.partInn == 0) {
          this.juego.carrerasv += cont;
          this.juego.hitv += 1;
        } else {
          this.juego.carrerash += cont;
          this.juego.hith += 1;
        }
        this.juego.bolas = 0;
        this.juego.strike = 0;
        this.cambiarBateador();
        this.incrementarValor('l');
        break;
      default:

        break;
    }
    this.updateJuego();
  }

  decrementarValor(valor: string) {
    switch (valor) {
      case 'l': //Lanzamiento
        if (this.juego.partInn == 0 && this.juego.lanzamientosh > 0) {
          this.juego.lanzamientosh -= 1;
        } else {
          if (this.juego.lanzamientosv > 0)
            this.juego.lanzamientosv -= 1;
        }
        break;
      case 'b': //Bolas
        if (this.juego.bolas > 0) {
          this.juego.bolas -= 1;
          this.decrementarValor('l');
        }
        break;
      case 's': //Strike
        if (this.juego.strike > 0) {
          this.juego.strike -= 1;
          this.decrementarValor('l');
        }
        break;
      case 'o': //Out
        if (this.juego.out > 0) {
          this.juego.out -= 1;
        }

        break;
      case 'f': //Foul
        if (this.juego.foul > 0) {
          this.juego.foul -= 1;
        }
        this.decrementarValor('l');//puede haber un conflicto con los strike
        break;
      case 'c': //Carreras
        if (this.juego.partInn == 0 && this.juego.carrerasv > 0) {
          this.juego.carrerasv -= 1;
        } else {
          if (this.juego.partInn == 1 && this.juego.carrerash > 0) {
            this.juego.carrerash -= 1;
          }
        }
        break;
      case 'h': //Carreras
        if (this.juego.partInn == 0 && this.juego.hitv > 0) {
          this.juego.hitv -= 1;
        } else {
          if (this.juego.partInn == 1 && this.juego.hith > 0) {
            this.juego.hith -= 1;
          }
        }
        break;
      case 'e': //Errores
        if (this.juego.partInn == 0) {
          this.juego.errorh -= 1;
        } else {
          this.juego.errorv -= 1;
        }

        break;
      case 'i': //inning Tengo que tener cuidado con los inning
        if (this.juego.partInn == 1) {
          this.juego.inn -= 1;
          this.juego.partInn = 0;
        } else {
          this.incrementarValor('pi');
        }
        break;
      case 'pi': //Parte del Inning
        this.juego.partInn -= 1;
        break;
      case '':
        break;

      default:

        break;
    }
    this.updateJuego();
  }

  clearBase() {
    this.juego.corredorPB = false;
    this.juego.corredorSB = false;
    this.juego.corredorTB = false;
    this.runMacro('hidepb');
    this.runMacro('hidesb');
    this.runMacro('hidetb');
  }

  posicionEnBase(valor: string) {
    if (valor == "pb" && this.juego.corredorPB) {
      this.runMacro('hidepb');
      this.juego.corredorPB = false;
    } else {
      if (valor == "pb" && !this.juego.corredorPB) {
        this.runMacro('showpb');
        this.juego.corredorPB = true
      } else {
        if (valor == "sb" && this.juego.corredorSB) {
          this.runMacro('hidesb');
          this.juego.corredorSB = false;
        } else {
          if (valor == "sb" && !this.juego.corredorSB) {
            this.runMacro('showsb');
            this.juego.corredorSB = true;
          }
          if (valor == "tb" && this.juego.corredorTB) {
            this.runMacro('hidetb');
            this.juego.corredorTB = false;
          } else {
            if (valor == "tb" && !this.juego.corredorTB) {
              this.runMacro('showtb');
              this.juego.corredorTB = true;
            }
          }
        }
      }
    }
  }

  runMacro(data: string) {
    console.log(data);
    this.juegoService.runMacro(data)
      .subscribe(res => {
        console.log(res);
      });
  }

  updateCampoData() {
    let logo = '';
    if (this.juego.partInn == 1) {
      logo = environment.dirlogo + this.juego.equipov.dim + ".png";
      let cont = 2;
      this.juego.rosterv.forEach(element => {
        console.log(element);
        const data = {
          table: 'bsd_campo',
          id: cont,
          jugador: element.nombre,
          posicion: element.posicion,
          equipo: this.juego.equipov.name,
          Logo: logo
        }
        cont += 1;
        var a = this.juegoService.crearConsulta(data);
        this.juegoService.consultDB(a)
          .subscribe(res => {
            console.log(res);
          });
      });
    } else {
      logo = environment.dirlogo + this.juego.equipoh.dim + ".png";
      let cont = 2;
      this.juego.rosterh.forEach(element => {
        const data = {
          table: 'bsd_campo',
          id: cont,
          jugador: element.nombre,
          posicion: element.posicion,
          equipo: this.juego.equipoh.name,
          Logo: logo
        }
        cont += 1;
        var a = this.juegoService.crearConsulta(data);
        this.juegoService.consultDB(a)
          .subscribe(res => {
            console.log(res);
          });
      });
    }
  }

  updateRosterData() {
    let logo = '';
    if (this.juego.partInn == 0) {
      logo = environment.dirlogo + this.juego.equipov.dim + ".png";
      let cont = 2;
      this.juego.rosterv.forEach(element => {
        const data = {
          table: 'bsd_orden_bate',
          id: cont,
          jugador: element.nombre,
          posicion: element.posicion,
          equipo: this.juego.equipov.name,
          Logo: logo
        }
        cont += 1;
        var a = this.juegoService.crearConsulta(data);
        this.juegoService.consultDB(a)
          .subscribe(res => {
            console.log(res);
          });
      });
    } else {
      logo = environment.dirlogo + this.juego.equipoh.dim + ".png";
      let cont = 2;
      this.juego.rosterh.forEach(element => {
        const data = {
          table: 'bsd_orden_bate',
          id: cont,
          jugador: element.nombre,
          posicion: element.posicion,
          equipo: this.juego.equipoh.name,
          Logo: logo
        }
        cont += 1;
        var a = this.juegoService.crearConsulta(data);
        this.juegoService.consultDB(a)
          .subscribe(res => {
            console.log(res);
          });
      });
    }
  }

  updateLanzadorData() {
    let logo = '';
    if (this.juego.partInn == 1) {
      logo = environment.dirlogo + this.juego.equipov.dim + ".png";
      const data = {
        table: 'bsd_lanzador',
        id: 2,
        equipo: this.juego.equipov.name,
        nombre: this.juego.rosterv[9].nombre,
        g: this.juego.rosterv[9].jg,
        p: this.juego.rosterv[9].jp,
        s: this.juego.rosterv[9].js,
        logo: logo,
        inn: this.juego.rosterv[9].inn,
        pcl: this.juego.rosterv[9].pcl,
        k: this.juego.rosterv[9].k,
        bb: this.juego.rosterv[9].bbola,
        num: this.juego.rosterv[9].numero
      }
      var a = this.juegoService.crearConsulta(data);
      console.log(a);
      this.juegoService.consultDB(a)
        .subscribe(res => {
          console.log(res);
        });
    } else {
      logo = environment.dirlogo + this.juego.equipoh.dim + ".png";
      const data = {
        table: 'bsd_lanzador',
        id: 2,
        equipo: this.juego.equipoh.name,
        nombre: this.juego.rosterh[9].nombre,
        g: this.juego.rosterh[9].jp,
        p: this.juego.rosterh[9].jp,  
        s: this.juego.rosterh[9].js,
        logo: logo,
        inn: this.juego.rosterh[9].inn,
        pcl: this.juego.rosterh[9].pcl,
        k: this.juego.rosterh[9].k,
        bb: this.juego.rosterh[9].bbola,
        num: this.juego.rosterh[9].numero
      }
      var a = this.juegoService.crearConsulta(data);
      console.log(a);
      this.juegoService.consultDB(a)
        .subscribe(res => {
          console.log(res);
        });
    }
  }

  updateTresAlBate() {
  
    let logo = '';
    var albate1 = 0;
    var albate2 = 0;
    var albate3 = 0;
    if (this.juego.partInn == 0) {
      if (this.juego.albatev == 7) {
        albate1 = 7;
        albate2 = 8;
        albate3 = 1;
      } else {
        if (this.juego.albatev == 8) {
          albate1 = 8;
          albate2 = 0;
          albate3 = 1;
        } else {
          albate1 = this.juego.albatev;
          albate2 = this.juego.albatev + 1;
          albate3 = this.juego.albatev + 2;
        }
      }
      logo = environment.dirlogo + this.juego.equipov.dim + ".png";
      var data = {
        table: 'bsd_tres_bate'
        equipo:[this.juego.equipoh.dim,this.juego.equipoh.dim,this.juego.equipoh.dim],
        logo:[logo,logo,logo],
        jugador:[this.juego.rosterh[albate1].nombre,this.juego.rosterh[albate2].nombre,this.juego.rosterh[albate3].nombre],
        id:[2,3,11]
      }
      var a = this.juegoService.crearMultiConsulta(data);
      this.juegoService.consultDB(a)
        .subscribe(res => {
          console.log(res);
        });
    } else {
      if (this.juego.albateh == 7) {
        albate1 = 7;
        albate2 = 8;
        albate3 = 0;
      } else {
        if (this.juego.albateh == 8) {
          albate1 = 7;
          albate2 = 0;
          albate3 = 1;
        } else {
          albate1 = this.juego.albateh;
          albate2 = this.juego.albateh + 1;
          albate3 = this.juego.albateh + 2;
        }
      }
      logo = environment.dirlogo + this.juego.equipoh.dim + ".png";
       var data = {
        table: 'bsd_tres_bate'
        equipo:[this.juego.equipoh.dim,this.juego.equipoh.dim,this.juego.equipoh.dim],
        logo:[logo,logo,logo],
        jugador:[this.juego.rosterh[albate1].nombre,this.juego.rosterh[albate2].nombre,this.juego.rosterh[albate3].nombre],
        id:[2,3,11]
      }
      var a = this.juegoService.crearMultiConsulta(data);
      this.juegoService.consultDB(a)
        .subscribe(res => {
          console.log(res);
        });
    }

  }

  updateBateadorData() {
    let logo = '';
    if (this.juego.partInn == 0) {
      logo = environment.dirlogo + this.juego.equipov.dim + ".png";
    } else {
      logo = environment.dirlogo + this.juego.equipoh.dim + ".png";
    }
    const data = {
      table: 'bsb_bateador',
      id: 1,
      nombre: this.bateadorEnturno.nombre,
      numero: this.bateadorEnturno.numero,
      h: this.bateadorEnturno.h,
      hr: this.bateadorEnturno.hr,
      ci: this.bateadorEnturno.ci,
      vb: this.bateadorEnturno.vb,
      av: this.bateadorEnturno.avg,
      posicion: this.bateadorEnturno.posicion,
      //avg: this.bateadorEnturno.avg,
      logo: logo,
    }
    var a = this.juegoService.crearConsulta(data);
    this.juegoService.consultDB(a)
      .subscribe(res => {
      });
  }

  updateJuegoData() {
    const data = {
      table: 'bsb_juego',
      id: 1,
      estadio: this.juego.estadio.nombre,
      equipoh: this.juego.equipoh.name,
      logoh: 'aa',
      diminutivoh: this.juego.equipoh.dim,
      hith: this.juego.hith,
      carrerash: this.juego.carrerash,
      erroresh: this.juego.errorh,
      lanzh: this.juego.lanzamientosh,
      lanzv: this.juego.lanzamientosv,
      arb1: this.juego.arbitro1,
      arb2: this.juego.arbitro2,
      arb3: this.juego.arbitro3,
      arbh: this.juego.arbitroh,
      arblf: this.juego.arbitrolf,
      arbcf: this.juego.arbitrocf,
      arbrf: this.juego.arbitrorf,
      Narrador1: this.juego.comentarista1,
      Narrador2: this.juego.comentarista2,
      Narrador3: this.juego.comentarista3,
      inn: this.juego.inn,
      innpart: this.juego.partInn,
      strike: this.juego.strike,
      bolas: this.juego.bolas,
      out: this.juego.out,
      equipov: this.juego.equipov.name,
      logov: 'ss',
      diminutivov: this.juego.equipov.dim,
      hitv: this.juego.hitv,
      carrerasv: this.juego.carrerasv,
      erroresv: this.juego.errorv
    }
    var a = this.juegoService.crearConsulta(data);
    this.juegoService.consultDB(a)
      .subscribe(res => {
        console.log(res);
      });
    let lanzamientos = 0;
    if (this.juego.partInn==0){
        lanzamientos = this.juego.lanzamientosh; 
    }else{
        lanzamientos = this.juego.lanzamientosv;
    }
    const data2 = {
      table: 'bsd_pistola',
      id: 1,
      lanzamientos: lanzamientos
    }
    a = this.juegoService.crearConsulta(data2);
    this.juegoService.consultDB(a)
      .subscribe(res => {
        console.log(res);
      });
  }
}
