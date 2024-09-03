import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Verb } from '../Models/verb.model';
import { VerbService } from '../services/verb.service';
import { UserService } from '../services/user.service';
import { VerbSimple } from '../Models/verbSimple.model';

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
      this.verbService.getVerb(verb, this.userService.getToken()).subscribe(
        (res) =>{
          this.verb = res;
          this.verbService.getAllFavorite(this.userService.getToken()).subscribe(
            (res) =>{
              res.verbs.forEach((verbFavorite: VerbSimple) => {
                if(this.verb.verb == verbFavorite.verb){
                  this.verb.id = verbFavorite.uid;
                }
              });
            },
            (err) =>{
              console.log(err);
            }
          )
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
