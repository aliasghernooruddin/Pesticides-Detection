import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { ExpertComponent } from './expert/expert.component';
import { ResearcherComponent } from './researcher/researcher.component';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'user/:name', component:UserComponent},
  {path:'expert/:name', component:ExpertComponent},
  {path:'researcher/:name', component:ResearcherComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
