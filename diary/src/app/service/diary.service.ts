import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';

import { Diary } from '../model/diary';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
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
    //if(process.env['EXPRESS_API_URI']) {
    //  this.jsonUrl = process.env['EXPRESS_API_URI'];
    //}
    
  }

  setDiary(diary:Diary) {
    this.getDiaries().subscribe(
      diaries => {
        const targetDiaryIndex = diaries.findIndex(d=>{d.date===diary.date});
        if(targetDiaryIndex) {
          diaries[targetDiaryIndex] = diary;
          this.http.put(this.jsonUrl, diaries);
          return;
        }
      }
    );
  }

  getDiaries(): Observable<Diary[]> {
    const apiUri = `api/diaries`;
    console.log(`API URI = ${this.jsonUrl + apiUri}`);
    return this.http.get<Diary[]>(this.jsonUrl + apiUri);
  }

  getDiariyByDate(date:string): Observable<Diary> {
    try {
      const apiUri = `api/diary/${date}`;
      console.log(`API URI = ${this.jsonUrl + apiUri}`);
      return this.http.get<Diary>(this.jsonUrl + apiUri);
    }
    catch(e) {
      throw e;
    }
  }

}
