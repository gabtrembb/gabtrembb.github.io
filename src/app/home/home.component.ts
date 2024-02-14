import { Component } from '@angular/core';
import { PollCreationComponent } from '../poll-creation/poll-creation.component';
import { MatDialog } from '@angular/material/dialog'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(public dialog: MatDialog){};

  createNewPoll() {
    let dialogRef = this.dialog.open(PollCreationComponent, {
      height: '400px',
      width: '600px',
    });
  }
}
