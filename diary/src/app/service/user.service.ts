import { Injectable, NgModule } from '@angular/core';
import { User } from '../model/user';
import { HttpClient } from '@angular/common/http';
import { CustomModule } from '../custom/custom.module';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators'

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
    this.getUserById(userId).subscribe(
      user => {
        this.user = user;
      }
    )
  }

  deleteUser() {}

  updateUser() {}
  
  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.jsonUrl);
   }

  getUserById(userId:string) {
    try {
      return this.http.get<User[]>(this.jsonUrl)
      .pipe(
        map( users => {
          const user = users.find( user=>{user.userId===userId});
          if(user) { return user }
          else     { throw new Error(`not found ${userId}`) }
        })
      );
    }
    catch(e) {
      throw e;
    }
  }

   getUserId():string {
    return this.user.userId;
   }
}
