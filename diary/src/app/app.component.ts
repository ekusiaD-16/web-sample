import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { User } from './model/user';
import { UserService } from './service/user.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    LoginComponent,
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    HttpClient,
    UserService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'diary';
  userId : string;

  constructor(private userService: UserService) {
    this.userId = this.userService.getUserId();
  }
}
