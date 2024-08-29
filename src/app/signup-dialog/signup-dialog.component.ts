import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-signup-dialog',
  templateUrl: './signup-dialog.component.html',
  styleUrl: './signup-dialog.component.scss'
})
export class SignupDialogComponent {

  public titre: string = '';
  public message: string = '';
  private isOk: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<SignupDialogComponent>,
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
      this.isOk = false;
    }else{
      this.titre = 'Compte créé';
      this.message = "Votre compte a bien été crée. Vous pouvez maintenant vous connecter.";
      this.isOk = true;
    }
  }

  onClose(): void {
    this.dialogRef.close(this.isOk);
  }
}
