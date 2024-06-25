import { Component, OnInit, importProvidersFrom } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { routes } from '../app.routes';
import { CommonModule } from '@angular/common';
import { DayComponent } from '../day/day.component';
import { WeekComponent } from '../week/week.component';
import { MonthComponent } from '../month/month.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DayComponent,
    WeekComponent,
    MonthComponent,
    RouterModule,
    HttpClientModule,
    RouterOutlet,
    MatCardModule,
    MatButtonToggleModule,
  ],
  providers: [
    Router,
    HttpClient,
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent implements OnInit {

  toggle = "day";
  message : string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const loginUser = sessionStorage.getItem("loginUserId");
    setTimeout(()=>{
			if(!sessionStorage.getItem("loginUserId")) {
        this.router.navigate(["/login"]);
      }
    }, 1000);
  }

  onChange(value:string) {
    this.toggle = value;
    this.message.push(this.toggle);
  }
}
