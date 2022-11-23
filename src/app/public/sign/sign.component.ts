import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DocumentsService } from 'src/app/shared/services/documents.service';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit, OnDestroy {
  id: number = 0;
  previouslySigned = false;
  documentContent: string = '';
  routeSub!: Subscription;
  signedBy: string = '';

  constructor(
    private documentsService: DocumentsService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      const document = this.documentsService.getDocument(this.id);
      if (document) {
        this.previouslySigned = document.signed ? true : false;
        this.documentContent = document.content;
        this.signedBy = document.signedBy || '';
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  signDocument() {
    this.documentsService.signDocument(this.id, this.signedBy);
    this.previouslySigned = true;
    this._snackBar.open('Document signed successfully!', 'Close', {
      duration: 2000,
    });
  }
}
