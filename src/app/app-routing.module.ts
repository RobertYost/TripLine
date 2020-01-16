import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './helpers/auth.guard';
import { AppComponent } from './app.component';
import { TripComponent } from './components/trip/trip/trip.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main/trips',
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: AppComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'trips',
        component: TripComponent,
        canActivate: [AuthGuard]
      },
      // {
      //   path: "account",
      //   component: AccountComponent,
      //   canActivate: [AuthGuard]
      // }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: '/main/trips',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
