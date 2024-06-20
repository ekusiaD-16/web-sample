import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';

import { Diary } from '../model/diary';
import { Observable } from 'rxjs';
import { CustomModule } from '../custom/custom.module';
import { UserService } from './user.service';

@NgModule({
  imports: [
    CustomModule,
  ],
  providers: [
    HttpClient,
    UserService,
  ]
})

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  userId : string = "";
  private jsonUrl : string = "";
  diaries : Diary[];

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {
    this.diaries = [];
    this.userId = this.userService.getUserId();
    this.jsonUrl= `assets/${this.userId}/diaries.json`;
  }

  getDiaries(): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.jsonUrl);
  }

}
