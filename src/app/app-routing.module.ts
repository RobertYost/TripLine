import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./helpers/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/main/map",
    pathMatch: "full"
  },
  {
    path: "main",
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "map",
        component: MapComponent,
        canActivate: [AuthGuard]
      },
      {
        path: "account",
        component: AccountComponent,
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "account-setup",
    component: AccountSetupComponent
  },
  {
    path: "**",
    redirectTo: "/main/map",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
