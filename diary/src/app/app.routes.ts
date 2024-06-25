import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BodyComponent } from './body/body.component';
import { DayComponent } from './day/day.component';
import { WeekComponent } from './week/week.component';
import { MonthComponent } from './month/month.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: "",     component: BodyComponent},
    { path: "body", component: BodyComponent},
    { path: "login",     component: LoginComponent},
    { path: "day",  component: DayComponent},
    { path: "week", component: WeekComponent},
    { path: "month",component: MonthComponent},
];

