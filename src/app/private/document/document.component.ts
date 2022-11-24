import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Editor } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { IDocument } from 'src/app/shared/interfaces/document';
import { DocumentsService } from 'src/app/shared/services/documents.service';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
})
export class DocumentComponent implements OnInit, OnDestroy {
  edit = false;
  editor!: Editor;
  html!: '';
  documentForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    recipientName: new FormControl('', [Validators.required]),
    recipientEmail: new FormControl('', [Validators.email]),
    content: new FormControl('', [Validators.required]),
  });
  publicLink: string = '';
  id: number = 0;
  routeSub!: Subscription;
  document: IDocument | undefined;

  constructor(
    private documentsService: DocumentsService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.documentForm.patchValue(this.documentsService.getDocument(this.id));
      this.document = this.documentsService.getDocument(this.id);
      if (this.document.signed) {
        this.documentForm.disable();
      }
    });
    this.edit = !this.router.url.includes('create');
    this.editor = new Editor();
    this.publicLink = this.edit
      ? `${window.location.origin}/sign/${this.id}`
      : '';
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.routeSub.unsubscribe();
  }

  saveForm() {
    if (this.edit) {
      this.documentsService.updateDocument(this.id, this.documentForm.value);
      this._snackBar.open('Document Updated', 'Close', {
        duration: 2000,
      });
    } else {
      let count = this.documentsService.addDocument(this.documentForm.value);
      this._snackBar.open('Document Saved', 'Close', {
        duration: 2000,
      });
      this.router.navigate([`/private/document/${count - 1}`]);
    }
  }

  copy() {
    navigator.clipboard.writeText(this.publicLink);
    this._snackBar.open('Link copied to clipboard', 'Close', {
      duration: 2000,
    });
  }
}
