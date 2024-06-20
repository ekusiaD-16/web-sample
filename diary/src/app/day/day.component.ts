import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../service/diary.service';
import { Diary } from '../model/diary';
import { CustomModule } from '../custom/custom.module';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [
    CustomModule,
    MatCardModule,
    MatSlideToggle,
    MatButtonModule,
    FormsModule,
  ],
  providers: [
    DiaryService,
    UserService,
  ],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent implements OnInit {
  diaries : Diary[] = [];
  diary   : Diary;
  message : string = "";

  isWrite : boolean = false;

  constructor(
    private diaryService: DiaryService,
    private userServise : UserService,
  ) {
    this.diary = new Diary("2024-6-20","");
  }

  ngOnInit(): void {
    const today = new Date();
    const todayStr = this.toDateStr(today);
    this.message = todayStr;
    this.diaryService.getDiaries()
    .subscribe( diaries => {
      this.diaries = diaries;
      this.diaries.forEach(diary => {
        if(diary.date==todayStr) {
          this.diary = diary;
        }
      });
    });
  }

  nextDiary() {
    try {
      const current = this.diaries.indexOf(this.diary);
      if(current+1 < this.diaries.length) {
        this.diary = this.diaries[current + 1];
      }
    } catch {
      this.diary = this.diary;
    } finally {
      return this.diary;
    }
  }

  prevDiary() {
    try {
      const current = this.diaries.indexOf(this.diary);
      if(current-1 >= 0) {
        this.diary = this.diaries[current - 1];
      }
    } catch {
      this.diary = this.diary;
    } finally {
      return this.diary;
    }
  }

  toDateStr(date:Date) {
    // Date() => xxxx-xx-xx
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }

}
