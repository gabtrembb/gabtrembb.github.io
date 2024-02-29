import { Component, ChangeDetectorRef  } from '@angular/core';
import { PollCreationComponent } from '../poll-creation/poll-creation.component';
import { MatDialog } from '@angular/material/dialog';
import { PollService } from '../services/poll.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public pollNames : {id : string, name : string}[] = [];

  constructor(public dialog: MatDialog, public pollService: PollService, private changeDetection: ChangeDetectorRef){};

  createNewPoll() {
    let dialogRef = this.dialog.open(PollCreationComponent, {
      height: '97%',
      width: '97%',
      maxWidth: '100%'
    });
  }

  ngOnInit(): void {
    this.pollService.pollNames$.subscribe((pollNames: {id : string, name : string}[]) => {
      this.pollNames = pollNames;
      this.changeDetection.detectChanges();
    });
  }
}
