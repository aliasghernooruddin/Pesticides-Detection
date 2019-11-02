import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserComponent, DialogOverview } from './user/user.component';
import { ExpertComponent, DialogOverviewExpert } from './expert/expert.component';
import { HomeComponent } from './home/home.component';
import { RepositoryService } from './Repository';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { MatTabsModule } from '@angular/material';
import { MatRippleModule} from '@angular/material';
import { ResearcherComponent, DialogOverviewResearcher } from './researcher/researcher.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    UserComponent,
    ExpertComponent,
    HomeComponent,
    DialogOverview,
    DialogOverviewExpert,
    ResearcherComponent,
    DialogOverviewResearcher,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTabsModule,
    MatRippleModule,
  ],
  providers: [
    RepositoryService,
  ],
  entryComponents: [UserComponent, DialogOverview, ExpertComponent, DialogOverviewExpert, ResearcherComponent, DialogOverviewResearcher],
  bootstrap: [AppComponent]
})
export class AppModule { }
