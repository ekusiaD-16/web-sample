import { Component, Input } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import { User } from '../model/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input()
  userId : string = "guest";

  constructor(
    private userService: UserService,
    private router: Router,
  ) {
    this.userId = this.userService.getUserId();
  }

	onClickLogout() {
    sessionStorage.removeItem("loginUserId");
    this.userId = "";
		this.router.navigate(["/login"]);
  }

}
