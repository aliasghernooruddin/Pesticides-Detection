import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ResearcherComponent } from './researcher/researcher.component';
import { ExpertComponent } from './expert/expert.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '*', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'register', component: RegisterComponent },
  { path: 'user/:name', loadChildren: () => import('./user/user.module').then(m => m.UserPageModule) },
  { path: 'researcher/:name', component: ResearcherComponent },
  { path: 'expert/:name', component: ExpertComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
