import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
  ],
  providers: [
    HttpClient,
    UserService,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  user : User;
  message : string[];

  constructor(
    private userService:UserService,
    private router: Router,
  ) {
    this.user = new User("", "", "");
    this.message = [];
  }

  onClickLogin() {
    this.message.push(`${JSON.stringify(this.user)}`);
    this.userService.login(this.user);
  }

  onClickAssign() {}

}
