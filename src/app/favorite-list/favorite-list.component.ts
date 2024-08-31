import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VerbService } from '../services/verb.service';
import { UserService } from '../services/user.service';
import { Verb } from '../Models/verb.model';
import { VerbSimple } from '../Models/verbSimple.model';

@Component({
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrl: './favorite-list.component.scss'
})
export class FavoriteListComponent {
  public favoriteList: Verb[] = [];
  private favoriteNameList: VerbSimple[] = [];
  constructor(private router: Router, private verbService: VerbService, private userService: UserService) {
    this.fetchFavoriteList();
   }

   private fetchFavoriteList(){
    this.verbService.getAllFavorite(this.userService.getToken()).subscribe(
      (res) =>{
        this.favoriteNameList = res.verbs;
        if(Array.isArray(this.favoriteNameList)){ // validation
          this.favoriteNameList.forEach(verb => {
            this.verbService.getVerb(verb.verb, this.userService.getToken()).subscribe(
              (res) =>{
                this.favoriteList.push(res.verb);
                console.log(this.favoriteList[0]);
              },
              (err) =>{
                console.log(err);
              }
            )
          });
        }
      },
      (err) =>{
        console.log(err);
      }
    )
  }

  public deleteFavorite(id: string){
    this.verbService.deleteFavorite(id, this.userService.getToken()).subscribe(
      (res) =>{
        console.log(res);
        this.router.navigate(['/favorite-list']);
      },
      (err) =>{
        console.log(err);
      }
    )
  }

  public goToVerbDetails(verb: string){
    this.router.navigate(['/verb-details']);
  }

}
