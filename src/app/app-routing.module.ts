import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { FavoriteListComponent } from './favorite-list/favorite-list.component';
import { JourneyComponent } from './journey/journey.component';
import { DailyQuizComponent } from './daily-quiz/daily-quiz.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'dashboard',
     component: DashboardComponent, canActivate: [authGuard]},
  {path: 'favorite-list',
      component: FavoriteListComponent, canActivate: [authGuard]},
  {path: 'daily',
      component: DailyQuizComponent, canActivate: [authGuard]},
  {path: 'journey',
      component: JourneyComponent, canActivate: [authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }