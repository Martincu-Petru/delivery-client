import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { RestaurantCardComponent } from './restaurant-card/restaurant-card.component';
import { MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule } from '@angular/material';
import { LoginScreenComponent } from './login-screen/login-screen.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { SignUpDialogComponent } from './signup-dialog/sign-up-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@NgModule({
  declarations: [
    AppComponent,
    MainScreenComponent,
    RestaurantCardComponent,
    LoginScreenComponent,
    LoginDialogComponent,
    SignUpDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatRadioModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
