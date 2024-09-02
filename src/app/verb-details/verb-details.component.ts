import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Verb } from '../Models/verb.model';
import { VerbService } from '../services/verb.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-verb-details',
  templateUrl: './verb-details.component.html',
  styleUrl: './verb-details.component.scss'
})
export class VerbDetailsComponent{

  public verb: Verb = {} as Verb;	
  constructor(private route: ActivatedRoute, private verbService: VerbService, private userService : UserService, private router: Router) {
   }

   public ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const verb = params['verb'];
      console.log('Verb:', verb);
      this.verbService.getVerb(verb, this.userService.getToken()).subscribe(
        (res) =>{
          this.verb = res;
          console.log(this.verb);
        },
        (err) =>{
          console.log(err);
        }
      )
    });
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

  public goToFavoriteList(){
    this.router.navigate(['/favorite-list']);
  }
}
