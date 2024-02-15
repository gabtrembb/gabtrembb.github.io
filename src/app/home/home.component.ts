import { Component } from '@angular/core';
import { PollCreationComponent } from '../poll-creation/poll-creation.component';
import { MatDialog } from '@angular/material/dialog';
import { PollService } from '../services/poll.service';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(public dialog: MatDialog, public pollService: PollService){};

  createNewPoll() {
    let dialogRef = this.dialog.open(PollCreationComponent, {
      height: '400px',
      width: '600px',
    });
  }
}