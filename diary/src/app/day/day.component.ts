import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../servise/diary.service';
import { Diary } from '../model/diary';
import { CustomModule } from '../custom/custom.module';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [
    CustomModule,
    MatCardModule,
    MatSlideToggle,
    FormsModule,
  ],
  providers: [
    DiaryService,
  ],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent implements OnInit {
  diaries : Diary[] = [];
  diary   : Diary;
  message : string = "";

  isWrite : boolean = false;

  constructor(private diaryService: DiaryService) {
    this.diary = new Diary("","");
  }

  ngOnInit(): void {
    const today = "xxxx-xx-xx";
    this.diaryService.getDiaries()
    .subscribe( diaries => {
      this.diaries = diaries;
      this.diaries.forEach(diary => {
        if(diary.date==today) {
          this.diary = diary;
        }
      });
    });
  }

}
