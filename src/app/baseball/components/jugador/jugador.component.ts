import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { MatDialog, MatDialogConfig } from "@angular/material";
import { JugadorDialogComponent } from "./jugador-dialog/jugador-dialog.component";

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
    { name: 'nombre', label: 'nombre', sortable: true },
    { name: 'avg', label: 'Avg', sortable: true },

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
    private dialog: MatDialog,
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
      vb: ['', Validators.required],
      hr: ['', Validators.required],
      ci: ['', Validators.required],
      avg: ['', Validators.required],
      jg: ['', Validators.required],
      jp: ['', Validators.required],
      js: ['', Validators.required],
      pcl: ['', Validators.required],
      inn: ['', Validators.required],
      k: ['', Validators.required],
      bbola: ['', Validators.required],
    });
  }

  addJugador(valor: any) {
    if (valor && valor._id) {
      this.jugadorService.putJugador(valor)
        .subscribe(res => {
          this.getJugadores();
          // M.toast({html: 'Updated Successfully'});
        });
    } else {
      this.jugadorService.postJugador(valor)
        .subscribe(res => {
          this.getJugadores();
          // M.toast({html: 'Save successfully'});
        });
    }

  }

  getJugadores() {
    this.jugadorService.getJugadores()
      .subscribe(res => {
        this.jugadorService.jugadores = res as Jugador[];
        this.data = this.jugadorService.jugadores;
        this.filteredData = this.data;
        this.filteredTotal = this.data.length;
      });

    this.equipoService.getEquipos()
      .subscribe(res => {
        this.equipoService.equipos = res as Equipo[];
      });

  }

  editJugador(jugador:Jugador) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    if (jugador){
      dialogConfig.data = jugador;
    }else{
      dialogConfig.data  = new Jugador();
    }
    
    const dialogRef = this.dialog.open(JugadorDialogComponent,
      dialogConfig);


    dialogRef.afterClosed().subscribe(
      val => this.addJugador(val)
    );
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
