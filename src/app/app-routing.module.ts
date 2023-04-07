import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { LogindealerComponent } from './logindealer/logindealer.component';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';
import { AcceptdashboardComponent } from './admindashboard/acceptdashboard/acceptdashboard.component';
import { RejectrequestComponent } from './admindashboard/rejectrequest/rejectrequest.component';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {path: 'drive', component: MaincomponentComponent},
  {path: 'login', component: LogindealerComponent},
  {path: 'admin', component: AdmindashboardComponent},
  {path: 'admin/accept', component: AcceptdashboardComponent},
  {path: 'admin/reject', component: RejectrequestComponent},
  {path: 'superadmin', component: SuperadminComponent},
  {path: '', component: HomeComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
