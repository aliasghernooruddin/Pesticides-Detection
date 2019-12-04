import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserMoreModal } from '../app/user/user.modal';
import { ResearcherComponent } from './researcher/researcher.component';
import { ResearcherModal } from './researcher/researcher.modal';
import { ExpertComponent } from './expert/expert.component';
import { ExpertModal } from './expert/expert.modal';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    UserMoreModal,
    ResearcherComponent,
    ResearcherModal,
    ExpertComponent,
    ExpertModal,
    HomeComponent,
    RegisterComponent,
  ],
  entryComponents: [UserMoreModal, ResearcherModal, ExpertModal],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
