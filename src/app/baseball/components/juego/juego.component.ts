import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { IPageChangeEvent } from '@covalent/core/paging';

import { JuegoService } from '../../services/juego.service';
import {EquipoService} from '../../services/equipo.service';
import {EstadioService} from '../../services/estadio.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Juego } from '../../models/juego';
import { Equipo } from '../../models/equipo';
import { Estadio } from '../../models/estadio';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css'],
  providers: [ JuegoService ]
})
export class JuegoComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name:'_id', label: 'Id', hidden: true },
    { name: 'equipov',  label: 'Equipo Visitador', sortable: true}, 
    { name: 'equipoh',  label: 'Equipo Home', sortable: true},
    { name: 'estadio',  label: 'Estadio', sortable: true},
  ];
  juegoForm: FormGroup;
  data: any[];
  equipos: Equipo[];
  estadios: Estadio[];
  filteredData: any[];
  filteredTotal: number;

  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 50;
  sortBy: string = 'name';
  selectedRows: any[] = [];
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Descending;

  constructor(private formBuilder: FormBuilder, 
              private equipoService: EquipoService,
              private estadioService: EstadioService,
              private juegoService: JuegoService, 
              private _dataTableService: TdDataTableService,
              private router: Router) { 
  }

  ngOnInit() {
    this.getJuegos();
    this.juegoForm = this.formBuilder.group({
      _id: [],
      equipoh: ['', Validators.required],
      equipov: ['', Validators.required],
      estadio: ['', Validators.required]
    });
  }
  
  addJuego() {
    console.log(this.juegoForm.value);
    if(this.juegoForm.controls._id.value) {
      this.juegoService.putJuego(this.juegoForm.value)
        .subscribe(res => {
          this.resetForm(this.juegoForm);
          this.getJuegos();
         // M.toast({html: 'Updated Successfully'});
        });
    } else {
      this.juegoService.postJuego(this.juegoForm.value)
      .subscribe(res => {
        this.getJuegos();
        this.resetForm(this.juegoForm);
       // M.toast({html: 'Save successfully'});
      });
    }
    
  }

  getJuegos() {
    this.juegoService.getJuegos()
      .subscribe(res => {
        console.log(res);
        this.juegoService.juegos = res as Juego[];
        console.log(this.juegoService.juegos);
        this.data= this.juegoService.juegos;
        this.filteredData = this.data;
        this.filteredTotal = this.data.length;
      });

      this.equipoService.getEquipos()
        .subscribe(res => {
          this.equipoService.equipos = res as Equipo[];
        });
        this.estadioService.getEstadios()
        .subscribe(res => {
          this.estadioService.estadios = res as Estadio[];
        });
  }

  editJuego(juego: Juego) {
    this.juegoService.selectedJuego = juego;
    this.juegoForm.setValue(juego);
  }

  openBoard(juego:Juego){
      localStorage.removeItem("juegoId");
      localStorage.setItem("juegoId", juego._id.toString());
      this.router.navigate(['board']);
  } 

  deleteJuego(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete it?')) {
      this.juegoService.deleteJuego(_id)
        .subscribe(res => {
          this.getJuegos();
          this.resetForm(form);
          //M.toast({html: 'Deleted Succesfully'});
        });
    }
  }
  

  compareFn(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1._id === obj2._id : obj1 === obj2;
}

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.juegoService.selectedJuego = new Juego();
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
