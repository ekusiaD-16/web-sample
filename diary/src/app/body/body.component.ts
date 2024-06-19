import { Component } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterOutlet } from '@angular/router';
import { routes } from '../app.routes';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [
    RouterOutlet,
    MatCardModule,
    MatButtonToggleModule,
  ],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent {

  constructor(private router: Router) {}
  onChange(value:string) {
    this.router.navigateByUrl(value)
  }
}
