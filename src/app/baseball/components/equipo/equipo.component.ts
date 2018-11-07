import { Component, OnInit } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { IPageChangeEvent } from '@covalent/core/paging';

import { EquipoService } from '../../services/equipo.service';
import {LigaService} from '../../services/liga.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Equipo } from '../../models/equipo';
import { Liga } from '../../models/liga';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name:'_id', label: 'Id', hidden: true }, 
    { name: 'name',  label: 'Equipo', sortable: true},
    { name: 'dim',  label: 'Diminutivo', sortable: true},
  ];
  equipoForm: FormGroup;
  data: any[];
  ligas: Liga[];
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
              private ligaService: LigaService,
              private equipoService: EquipoService, 
              private _dataTableService: TdDataTableService) { 
  }

  ngOnInit() {
    this.getEquipos();
    this.equipoForm = this.formBuilder.group({
      _id: [],
      name: ['', Validators.required],
      dim: ['', Validators.required],
      ligas: ['', Validators.required]
    });
  }
  
  addEquipo() {
    console.log(this.equipoForm.value);
    if(this.equipoForm.controls._id.value) {
      this.equipoService.putEquipo(this.equipoForm.value)
        .subscribe(res => {
          this.getEquipos();
         // M.toast({html: 'Updated Successfully'});
        });
    } else {
      this.equipoService.postEquipo(this.equipoForm.value)
      .subscribe(res => {
        this.getEquipos();
       // M.toast({html: 'Save successfully'});
      });
    }
    
  }

  getEquipos() {
    this.equipoService.getEquipos()
      .subscribe(res => {
        this.equipoService.equipos = res;
        this.data= this.equipoService.equipos;
        this.filteredData = this.data;
        this.filteredTotal = this.data.length;
      });

      this.ligaService.getLigas()
        .subscribe(res => {
          this.ligaService.ligas = res as Liga[];
        });
  }

  editEquipo(equipo: Equipo) {
    this.equipoService.selectedEquipo = equipo;
    this.equipoForm.setValue(equipo);
  }

  deleteEquipo(_id: string) {
    if(confirm('Are you sure you want to delete it?')) {
      this.equipoService.deleteEquipo(_id)
        .subscribe(res => {
          this.getEquipos();
          //M.toast({html: 'Deleted Succesfully'});
        });
    }
  }

  consult(){
    this.equipoService.consultDB('SELECT * FROM Equipo')
      .subscribe(res => {
        console.log(res);
      });
  }

  compareFn(liga1: Liga, liga2: Liga) {
    return liga1 && liga2 ? liga1._id === liga2._id : liga1 === liga2;
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
