import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-conference',
  standalone: true,
  imports: [RouterModule],  // <-- Add RouterModule here
  templateUrl: './conference.component.html',
  styleUrls: ['./conference.component.scss']  // <-- Fix typo here
})
export class ConferenceComponent {
  constructor(public router: Router) {}
}