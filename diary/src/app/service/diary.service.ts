import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';

import { Diary } from '../model/diary';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { CustomModule } from '../custom/custom.module';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

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
  userId : string;
  month  : number;
  private jsonUrl : string ="";
  diaries : Diary[];

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {
    this.diaries = [];
    this.userId = this.userService.getUserId();
    this.month  = new Date().getMonth();
    this.jsonUrl = `https://diary-backend-9dj8.onrender.com/`;
    //if(environment.apiUrl) {
    //  this.jsonUrl = environment.apiUrl;
    //}
    
  }

  updateDiary(diary:Diary):Observable<any> {
    const apiUri = `api/update/diary/${this.userId}/${diary.date}`;
    return this.http.put<any>(this.jsonUrl + apiUri, diary);
  }

  getDiaries(): Observable<Diary[]> {
    const apiUri = `api/diaries/${this.userId}`;
    console.log(`API URI = ${this.jsonUrl + apiUri}`);
    return this.http.get<Diary[]>(this.jsonUrl + apiUri);
  }

  getDiaryByDate(date:string): Observable<Diary> {
    try {
      const apiUri = `api/diary/${this.userId}/${date}`;
      console.log(`API URI = ${this.jsonUrl + apiUri}`);
      return this.http.get<Diary>(this.jsonUrl + apiUri);
    }
    catch(e) {
      throw e;
    }
  }

}
