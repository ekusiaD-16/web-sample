import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../servise/diary.service';
import { Diary } from '../model/diary'
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent implements OnInit {
  diaries !: Observable<{date:string,memo:string}[]>;
  message : string = "";

  constructor(private diaryServise: DiaryService) {}

  ngOnInit(): void {
    this.diaries = this.diaryServise.getDiaries();
    console.log(this.diaries)
  }

}
