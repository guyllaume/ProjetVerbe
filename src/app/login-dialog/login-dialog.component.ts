import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.scss'
})
export class LoginDialogComponent {

  public titre: string = '';
  public message: string = '';
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any 
  ) { }

  ngOnInit(): void {
    this.processData(); 
  }
  processData(){
    console.log(this.data);
    if(this.data.error){
      this.titre = 'Erreur';
      this.message = this.data.error.error;
    }else{
      this.onClose();
    }
  }

  onClose(): void {
    this.dialogRef.close(this.data);
  }

}
