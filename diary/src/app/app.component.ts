import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import { User } from './model/user';
import { UserService } from './service/user.service';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    RouterOutlet,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    LoginComponent,
    CommonModule,
    RouterModule,
    UserService,
  ],
  providers: [
    HttpClient,
    Router,
    UserService,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'diary';
  userId : string;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    private router: Router,
  ) {
    this.userId = this.userService.getUserId();
  }

  ngOnInit(): void {
    const loginUser = sessionStorage.getItem("loginUserId");
  }

}
