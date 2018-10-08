import { Component, OnInit } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { IPageChangeEvent } from '@covalent/core/paging';

import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import { JuegoService } from "../../services/juego.service";
import { Router } from "@angular/router";
import { Juego } from "../../models/juego";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})



export class BoardComponent implements OnInit {



  columns: ITdDataTableColumn[] = [
    { name: '_id', label: 'Id', hidden: true },
    { name: 'numero', label: 'Equipo Visitador', sortable: true },
    { name: 'nombre', label: 'Equipo Home', sortable: true },
    { name: 'estadio', label: 'Estadio', sortable: true },
  ];

  juego: Juego;
  juegoForm: FormGroup;
  innngs : number = 9;

  constructor(private formBuilder: FormBuilder, private router: Router, private juegoService: JuegoService) { }

  ngOnInit() {
    let juegoId = localStorage.getItem("juegoId");
    if (!juegoId) {
      alert("Invalid action.")
      this.router.navigate(['juego']);
      return;
    }
    this.juegoForm = this.formBuilder.group({
      _id: [],
      equipoh: ['', Validators.required],
      equipov: ['', Validators.required],
      estadio: ['', Validators.required],
      carrerash: ['', Validators.required],
      carrerasv: ['', Validators.required],
      hith: ['', Validators.required],
      hitv: ['', Validators.required],
      errorh: ['', Validators.required],
      errorv: ['', Validators.required],
      arbitro1: ['', Validators.required],
      arbitro2: ['', Validators.required],
      arbitro3: ['', Validators.required],
      arbitroh: ['', Validators.required],
      arbitrolf: ['', Validators.required],
      arbitrocf: ['', Validators.required],
      arbitrorf: ['', Validators.required],
      comentarista1: ['', Validators.required],
      comentarista2: ['', Validators.required],
      comentarista3: ['', Validators.required],
      inn: ['', Validators.required],
      partInn: ['', Validators.required],
      strike: ['', Validators.required],
      out: ['', Validators.required],
      bolas: ['', Validators.required],
      lanzamientosh: ['', Validators.required],
      lanzamientosv: ['', Validators.required]
    });
    this.juegoService.getJuegoById(juegoId)
      .subscribe(data => {
        this.juegoService.selectedJuego = data as Juego;
      });
      console.log(this.juegoService.selectedJuego);
  }
  
  showlayer(data:string){
    this.juegoService.showLayer(data)
      .subscribe(res => {
        console.log(res);
      });
  }
  consult(){
    this.juegoService.consultDB('SELECT * FROM Equipo')
      .subscribe(res => {
        console.log(res);
      });
  }
}
