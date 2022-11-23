import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { IDocument } from 'src/app/shared/interfaces/document';
import { DocumentsService } from 'src/app/shared/services/documents.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  counts = {
    sent: 0,
    signed: 0,
    unsent: 0,
    unsigned: 0,
  };
  dataSource = new MatTableDataSource<IDocument>();
  displayedColumns: string[] = [
    'name',
    'recipient',
    'dateSent',
    'sent',
    'signed',
    'actions',
  ];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private documentsService: DocumentsService) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(
      this.documentsService.getDocuments()
    );
    this.dataSource.data.forEach((document) => {
      if (document.sent) {
        this.counts.sent++;
      } else {
        this.counts.unsent++;
      }
      if (document.signed) {
        this.counts.signed++;
      } else {
        this.counts.unsigned++;
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(index: number) {
    this.dataSource.data = this.documentsService.deleteDocument(index);
    console.log(this.dataSource);
  }
}
