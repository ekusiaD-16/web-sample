import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Diary } from '../model/diary';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {
  diaries : Diary[]

  constructor(private http: HttpClient) {
    this.diaries = [];
  }

  getDiaries() {
    return this.http.get<{date:string,memo:string}[]>("../data/diaries.json");
  }

}
