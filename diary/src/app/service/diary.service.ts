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
  private jsonUrl : string;
  diaries : Diary[];

  constructor(
    private http: HttpClient,
    private userService: UserService,
  ) {
    this.diaries = [];
    this.userId = this.userService.getUserId();
    this.month  = new Date().getMonth();
    this.jsonUrl= `assets/${this.userId}/diaries-6.json`;
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
    return this.http.get<Diary[]>(this.jsonUrl);
  }

  getDiariyByDate(date:string): Observable<Diary> {
    try {
      return this.http.get<Diary[]>(this.jsonUrl).pipe(
        map( diaries => {
          const diary = diaries.find( diary => diary.date===date);
          if(diary) { return diary }
          else      { throw new Error(`not found ${date}`)}
        })
      );
    }
    catch(e) {
      throw e;
    }
  }

}
