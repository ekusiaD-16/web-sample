import { Injectable, NgModule } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { CustomModule } from '../custom/custom.module';
import { Observable } from 'rxjs';

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
  ) {
    this.jsonUrl = `assets/users.json`;
    this.user    = new User("sakaguchi","",""); 
  }

  createUser() {}

  setUser(userId:string) {
    this.user = this.getUser(userId);
  }

  deleteUser() {}

  updateUser() {}
  
  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.jsonUrl);
   }

  getUser(userId:string) {
    var user : any;
    this.getUsers()
      .subscribe( users => {
        users.find( user => {
          user.userId == userId;
        }); 
    });
    return user;
  }

   getUserId():string {
    return this.user.userId;
   }
}
