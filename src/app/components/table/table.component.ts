import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { TableConfig } from '@app/config/table-config';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '@app/models/user';
import {
  ChangeDetectorRef,
  AfterViewInit,
  EventEmitter,
  Component,
  ViewChild,
  Output,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = [];

  @Input() data: UserModel[] | any = [];
  @Input() node: string = '';
  @Input() totalPages: number = 0;
  @Input() total: number = 0;
  @Input() totalPerPage: number = 0;

  @Output() onPaginationClick = new EventEmitter();
  @Output() onRowClick = new EventEmitter();

  isLoadingResults = true;
  resultsLength = 0;
  pageIndex = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator(
    new MatPaginatorIntl(),
    ChangeDetectorRef.prototype
  );
  tableData = [];

  constructor(private _httpClient: HttpClient) {}

  ngOnInit(): void {
    if (this.node && TableConfig[this.node]) {
      this.displayedColumns = TableConfig[this.node];
    }
  }

  ngOnChanges(): void {
    setTimeout(() => {
      this.resultsLength = this.data.length;

      const firstRowIndex = this.pageIndex * this.totalPerPage;
      this.tableData = this.data.slice(
        firstRowIndex,
        firstRowIndex + this.totalPerPage
      );
    }, 1000);
  }

  ngAfterViewInit() {
    this.isLoadingResults = false;

    this.paginator.page.subscribe((item) => {
      this.onPaginationClick.emit(item.pageIndex);

      this.pageIndex = item.pageIndex;

      this.ngOnChanges();
    });
  }

  onTableRowClick(row: number): void {
    this.onRowClick.emit(row);
  }
}
