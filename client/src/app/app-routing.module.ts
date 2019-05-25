import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';

const routes: Routes = [
  { path: '', component: LoginScreenComponent },
  { path: 'home', component: MainScreenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
