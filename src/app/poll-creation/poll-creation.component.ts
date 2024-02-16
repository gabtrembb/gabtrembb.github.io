import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Poll } from '../structs/poll';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-poll-creation',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './poll-creation.component.html',
  styleUrl: './poll-creation.component.css'
})
export class PollCreationComponent {
  public poll : Poll = {name:"", password:"", money: 0};
}
