import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { LogindealerComponent } from './logindealer/logindealer.component';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { AcceptdashboardComponent } from './admindashboard/acceptdashboard/acceptdashboard.component';
import { RejectrequestComponent } from './admindashboard/rejectrequest/rejectrequest.component';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { HomeComponent } from './home/home.component';





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    LogindealerComponent,
    MaincomponentComponent,
    AdmindashboardComponent,
    AcceptdashboardComponent,
    RejectrequestComponent,
    SuperadminComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
