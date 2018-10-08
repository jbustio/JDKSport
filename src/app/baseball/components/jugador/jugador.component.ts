import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'

import { Router } from "@angular/router";
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { IPageChangeEvent } from '@covalent/core/paging';

import { JugadorService } from '../../services/jugador.service';
import { EquipoService } from '../../services/equipo.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Jugador } from '../../models/jugador';
import { Equipo } from '../../models/equipo';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name: '_id', label: 'Id', hidden: true },
    { name: 'numero', label: '#', sortable: true },
    { name: 'nombre', label: 'Equipo Home', sortable: true }

  ];
  jugadorForm: FormGroup;
  data: any[];
  equipos: Equipo[];
  filteredData: any[];
  filteredTotal: number;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 50;
  sortBy: string = 'nombre';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private formBuilder: FormBuilder,
    private equipoService: EquipoService,
    private jugadorService: JugadorService,
    private _dataTableService: TdDataTableService,
    private router: Router) {

  }

  ngOnInit() {
    this.getJugadores();
    this.jugadorForm = this.formBuilder.group({
      _id: [],
      numero: ['', Validators.required],
      nombre: ['', Validators.required],
      equipos: ['', Validators.required],
      jugadorCuadro: ['', Validators.required],
      h: ['', Validators.required],
      bbate: ['', Validators.required],
      hr: ['', Validators.required],
      ci: ['', Validators.required],
      jg: ['', Validators.required],
      jp: ['', Validators.required],
      js: ['', Validators.required],
      pcl: ['', Validators.required],
      inn: ['', Validators.required],
      k: ['', Validators.required],
      bbola: ['', Validators.required],
    });
  }

  addJugador() {
    console.log(this.jugadorForm.value);
    if (this.jugadorForm.controls._id.value) {
      this.jugadorService.putJugador(this.jugadorForm.value)
        .subscribe(res => {
          this.jugadorForm.reset();
          this.getJugadores();
          // M.toast({html: 'Updated Successfully'});
        });
    } else {
      this.jugadorService.postJugador(this.jugadorForm.value)
        .subscribe(res => {
          this.getJugadores();
          this.jugadorForm.reset();
          // M.toast({html: 'Save successfully'});
        });
    }

  }

  getJugadores() {
    this.jugadorService.getJugadores()
      .subscribe(res => {
        console.log(res);
        this.jugadorService.jugadores = res as Jugador[];
        console.log(this.jugadorService.jugadores);
        this.data = this.jugadorService.jugadores;
        this.filteredData = this.data;
        this.filteredTotal = this.data.length;
      });

    this.equipoService.getEquipos()
      .subscribe(res => {
        this.equipoService.equipos = res as Equipo[];
      });

  }

  editJugador(jugador: Jugador) {
    console.log(jugador);
    this.jugadorService.selectedJugador = jugador;
    this.jugadorForm.setValue(jugador);
  }

  deleteJugador(_id: string, form: NgForm) {
    if (confirm('Are you sure you want to delete it?')) {
      this.jugadorService.deleteJugador(_id)
        .subscribe(res => {
          this.getJugadores();
          this.resetForm(form);
          //M.toast({html: 'Deleted Succesfully'});
        });
    }
  }

  consult() {
    this.jugadorService.consultDB('SELECT * FROM Equipo')
      .subscribe(res => {
        console.log(res);
      });
  }


  compareFn(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1._id === obj2._id : obj1 === obj2;
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.jugadorService.selectedJugador = new Jugador();
    }
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.data;
    let excludedColumns: string[] = this.columns
      .filter((column: ITdDataTableColumn) => {
        return ((column.filter === undefined && column.hidden === true) ||
          (column.filter !== undefined && column.filter === false));
      }).map((column: ITdDataTableColumn) => {
        return column.name;
      });
    newData = this._dataTableService.filterData(newData, this.searchTerm, true, excludedColumns);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

}
