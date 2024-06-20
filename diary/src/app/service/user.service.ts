import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {}

   createUser() {}

   deleteUser() {}

   updateUser() {}

   getUser():User {
    return new User("sakaguchi","sakaguchi@email.com","daisuke");
   }

   getUserId() {
    return new User("sakaguchi","sakaguchi@email.com","daisuke").userId;
   }
}
