import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    FormsModule,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']   // ✅ fixed (plural, array)
})
export class App {
  protected readonly title = signal('DriveXchange');
}
