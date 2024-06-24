import { Injectable, NgModule } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { CustomModule } from '../custom/custom.module';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators'
import { Router } from '@angular/router';

@NgModule({
  imports: [
    CustomModule,
  ],
  providers: [
    HttpClient,
  ]
})

@Injectable({
  providedIn: 'root'
})
export class UserService {

  jsonUrl : string;
  user    : User;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.jsonUrl = `https://diary-backend-9dj8.onrender.com/`;
    this.user    = new User("","","");
  }

  createUser() {}

  setUser(userId:string) {
    this.getUserById(userId).subscribe(
      user => {
        this.user = user;
      });
  }

  login(loginUser:User) {
    this.getUserById(loginUser.userId).subscribe(
      user => {
        if(user.password == loginUser.password ) {
          user.isLogin = true;
          sessionStorage.setItem("loginUserId", user.userId);
          console.log(`${JSON.stringify(user)}`);
          this.router.navigate(["/"]);
        } else {
          this.router.navigate(["login"]);
        }
      });
  }

  deleteUser() {}

  updateUser(newUser:User) {
  }
  
  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.jsonUrl);
   }

  getUserById(userId:string) {
    const apiUri = `api/user/${userId}`;
    return this.http.get<User>(this.jsonUrl + apiUri);
  }

   getUserId():string {
    const userId = sessionStorage.getItem("loginUserId");
    return userId!==null? userId : "";
   }
}
