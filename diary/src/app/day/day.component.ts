import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  message : string[] = [];

  isWrite : boolean = false;

  constructor(
    private diaryService: DiaryService,
    private userServise : UserService,
  ) {
    this.diary = new Diary("","");
  }

  ngOnInit() {
    this.setDiaries();
    this.setDiary();
  }

  setDiaries() {
    this.diaryService.getDiaries()
    .subscribe( diaries => {
      this.diaries = diaries;
    });
  }

  setDiary() {
    const today = new Date();
    const todayStr = this.toDateStr(today);
    try {
      this.diaryService.getDiariyByDate(todayStr)
      .subscribe( diary => {
        this.diary = diary;
      });
    } catch(e) {
      this.message.push(`error : ${e}`);
    }
  }

  nextDiary() {
    const currentDateStr = this.diary.date;
    const nextDate = this.toDate(this.diary.date);
    nextDate.setDate(
      this.toDate(currentDateStr).getDate() + 1
    );
    const nextDateStr = this.toDateStr(nextDate);
    this.diaryService.getDiariyByDate(nextDateStr)
    .subscribe(
      (diary) => {
        if(diary.date) {
          this.diary = diary;
        }
      });
  }

  prevDiary() {
    const currentDateStr = this.diary.date;
    const prevDate = this.toDate(this.diary.date);
    prevDate.setDate(
      this.toDate(currentDateStr).getDate() - 1
    );
    const prevDateStr = this.toDateStr(prevDate);
    this.diaryService.getDiariyByDate(prevDateStr)
    .subscribe(
      (diary) => {
        if(diary.date) {
          this.diary = diary;
        }
      });
  }

  toDateStr(date:Date) {
    // Date() => xxxx-xx-xx
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  }

  toDate(dateStr:string):Date {
    let parts = dateStr.split("-");
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1])-1;
    const date = parseInt(parts[2]);
    const newDate = new Date(year,month,date);
    return newDate;
  }

}
