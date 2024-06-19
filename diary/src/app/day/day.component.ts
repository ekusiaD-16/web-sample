import { Component, OnInit } from '@angular/core';
import { DiaryService } from '../servise/diary.service';
import { Diary } from '../model/diary';
import { CustomModule } from '../custom/custom.module';

@Component({
  selector: 'app-day',
  standalone: true,
  imports: [
    CustomModule,
  ],
  providers: [
    DiaryService,
  ],
  templateUrl: './day.component.html',
  styleUrl: './day.component.scss'
})
export class DayComponent implements OnInit {
  diaries : Diary[] = [new Diary("xx","mm")];
  message : string = "";

  constructor(private diaryService: DiaryService) {}

  ngOnInit(): void {
    this.diaryService.getDiaries()
    .subscribe( diaries => {
      this.diaries = diaries;
    });
  }

}
