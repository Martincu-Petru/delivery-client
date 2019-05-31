import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import {MainScreenCourierComponent} from './main-screen-courier/main-screen-courier.component';
import {LoginScreenCourierComponent} from './login-screen-courier/login-screen-courier.component';

const routes: Routes = [
  { path: 'user', component: LoginScreenComponent },
  { path: 'courier', component: LoginScreenCourierComponent },
  { path: 'user/home', component: MainScreenComponent },
  { path: 'courier/home', component: MainScreenCourierComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
