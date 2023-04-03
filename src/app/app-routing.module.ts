import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { LogindealerComponent } from './logindealer/logindealer.component';
import { MaincomponentComponent } from './maincomponent/maincomponent.component';

const routes: Routes = [
  {path: 'login', component: LogindealerComponent},
  {path: '', component: MaincomponentComponent},
  {path: 'admin', component: AdmindashboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
