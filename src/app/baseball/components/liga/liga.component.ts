import { Component, OnInit } from '@angular/core';
import { TdDataTableService, TdDataTableSortingOrder, ITdDataTableSortChangeEvent, ITdDataTableColumn } from '@covalent/core/data-table';
import { IPageChangeEvent } from '@covalent/core/paging';

import { LigaService } from '../../services/liga.service';
import { NgForm } from '@angular/forms';
import { Liga } from '../../models/liga';

//declare var M: any;

@Component({
  selector: 'app-liga',
  templateUrl: './liga.component.html',
  styleUrls: ['./liga.component.css'],
  providers: [ LigaService ]
})
export class LigaComponent implements OnInit {

  columns: ITdDataTableColumn[] = [
    { name:'_id', label: 'Id', hidden: true }, 
    { name: 'name',  label: 'Liga', sortable: true, width: 150 }
  ];

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

  constructor(private ligaService: LigaService,private _dataTableService: TdDataTableService) { }

  ngOnInit() {
    this.getLigas();
  }
  
  addLiga(form?: NgForm) {
    if(form.value._id) {
      this.ligaService.putLiga(form.value)
        .subscribe(res => {
          this.resetForm(form);
          this.getLigas();
         // M.toast({html: 'Updated Successfully'});
        });
    } else {
      this.ligaService.postLiga(form.value)
      .subscribe(res => {
        this.getLigas();
        this.resetForm(form);
       // M.toast({html: 'Save successfully'});
      });
    }
    
  }

  getLigas() {
    this.ligaService.getLigas()
      .subscribe(res => {
        this.ligaService.ligas = res as Liga[];
        this.data= this.ligaService.ligas;
        this.filteredData = this.data;
        this.filteredTotal = this.data.length;
      });
  }

  editLiga(liga: Liga) {
    this.ligaService.selectedLiga = liga;
  }

  deleteLiga(_id: string, form: NgForm) {
    if(confirm('Are you sure you want to delete it?')) {
      this.ligaService.deleteLiga(_id)
        .subscribe(res => {
          this.getLigas();
          this.resetForm(form);
          //M.toast({html: 'Deleted Succesfully'});
        });
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.ligaService.selectedLiga = new Liga();
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