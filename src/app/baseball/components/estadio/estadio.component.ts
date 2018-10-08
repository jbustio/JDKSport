import { Component, OnInit } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { IPageChangeEvent } from '@covalent/core/paging';

import { EstadioService } from '../../services/estadio.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Estadio } from '../../models/estadio';

@Component({
  selector: 'app-estadio',
  templateUrl: './estadio.component.html',
  styleUrls: ['./estadio.component.css']
})
export class EstadioComponent implements OnInit {

  
  columns: ITdDataTableColumn[] = [
    { name:'_id', label: 'Id', hidden: true }, 
    { name: 'nombre',  label: 'Estadio', sortable: true},
    { name: 'localidad',  label: 'Localidad', sortable: true},
  ];
  estadioForm: FormGroup;
  data: any[];
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
              private estadioService: EstadioService, 
              private _dataTableService: TdDataTableService) { 

  }

  ngOnInit() {
    this.getEstadios();
    this.estadioForm = this.formBuilder.group({
      _id: [],
      nombre: ['', Validators.required],
      localidad: ['', Validators.required]
    });
  }
  
  addEstadio() {
    console.log(this.estadioForm.value);
    if(this.estadioForm.controls._id.value) {
      this.estadioService.putEstadio(this.estadioForm.value)
        .subscribe(res => {
          this.resetForm(this.estadioForm);
          this.getEstadios();
         // M.toast({html: 'Updated Successfully'});
        });
    } else {
      this.estadioService.postEstadio(this.estadioForm.value)
      .subscribe(res => {
        this.getEstadios();
        this.resetForm(this.estadioForm);
       // M.toast({html: 'Save successfully'});
      });
    }
    
  }

  getEstadios() {
    this.estadioService.getEstadios()
      .subscribe(res => {
        this.estadioService.estadios = res;
        this.data= this.estadioService.estadios;
        this.filteredData = this.data;
        this.filteredTotal = this.data.length;
      });
  }

  editEstadio(equipo: Estadio) {
    this.estadioService.selectedEstadio = equipo;
    this.estadioForm.setValue(equipo);
  }

  deleteEstadio(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete it?')) {
      this.estadioService.deleteEstadio(_id)
        .subscribe(res => {
          this.getEstadios();
          this.resetForm(form);
          //M.toast({html: 'Deleted Succesfully'});
        });
    }
  }

  consult(){
    this.estadioService.consultDB('SELECT * FROM Equipo')
      .subscribe(res => {
        console.log(res);
      });
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.estadioService.selectedEstadio = new Estadio();
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
