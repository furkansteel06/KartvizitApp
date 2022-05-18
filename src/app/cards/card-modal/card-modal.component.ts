import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Card } from 'src/app/models/card';
import { CardService } from 'src/app/services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-modal',
  templateUrl: './card-modal.component.html',
  styleUrls: ['./card-modal.component.scss']
})
export class CardModalComponent implements OnInit {

  cardForm!: FormGroup;
  showSpinner: boolean = false;

  constructor(private fb: FormBuilder,
    private cs: CardService,
    private dialogRef: MatDialogRef<CardModalComponent>,
    private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: Card) { }

  ngOnInit(): void {
    console.log(this.data);
    this.cardForm = this.fb.group({
      name: [this.data != null ? this.data.name : null || "", Validators.maxLength(50)],
      title: [this.data != null ? this.data.title : null || "", [Validators.required, Validators.maxLength(255)]],
      phone: [this.data != null ? this.data.phone : null || "", [Validators.required, Validators.maxLength(20)]],
      email: [this.data != null ? this.data.email : null || "", [Validators.email, Validators.maxLength(50)]],
      address: [this.data != null ? this.data.address : null || "", Validators.maxLength(255)],
    });
  }

  addCard(): void {
    this.showSpinner = true;
    this.cs.addCard(this.cardForm.value).subscribe((res: any) => {
      this.getSuccess(res || "Kartvizit başarıyla eklendi.")
    }, (err: any) => {
      this.getError(err.message || "Kartvizit eklenirken bir sorun oluştu.")
    });
  }

  updateCard(): void {
    this.showSpinner = true;
    this.cs.updateCard(this.cardForm.value, this.data.id)
      .subscribe((res: any) => {
        this.getSuccess(res || "Kartvizit başarıyla güncellendi.")
      }, (err: any) => {
        this.getError(err.message || "Kartvizit güncellenirken bir sorun oluştu.")
      });
  }

  deleteCard(): void {
    this.showSpinner = true;
    this.cs.deleteCard(this.data.id)
      .subscribe((res: any) => {
        this.getSuccess(res || "Kartvizit başarıyla silindi.")
      }, (err: any) => {
        this.getError(err.message || "Kartvizit silinirken bir sorun oluştu.")
      });
  }

  getSuccess(message: string): void {
    this.snackbarService.createSnackBar("success", message);
    this.cs.getCards();
    this.showSpinner = false;
    this.dialogRef.close();
  }

  getError(message: string): void {
    this.snackbarService.createSnackBar("error", message);
    this.showSpinner = false;
  }
}
