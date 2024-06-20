import { HttpClient } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';

import { Diary } from '../model/diary';
import { Observable } from 'rxjs';
import { CustomModule } from '../custom/custom.module';

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
export class DiaryService {
  private jsonUrl : string = 'assets/diaries.json';
  diaries : Diary[];

  constructor(private http: HttpClient) {
    this.diaries = [];
  }

  getDiaries(): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.jsonUrl);
  }

}
