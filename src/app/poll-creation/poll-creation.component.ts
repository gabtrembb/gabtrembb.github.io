import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Poll } from '../structs/poll';
import {MatButtonModule} from '@angular/material/button';
import { QuestionType } from '../structs/question';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-poll-creation',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, CommonModule, MatSelectModule],
  templateUrl: './poll-creation.component.html',
  styleUrl: './poll-creation.component.css'
})
export class PollCreationComponent {
  public poll : Poll = {name:"", password:"", money: 0, questions: [{question: "", type: QuestionType.TrueFalse}]};

  addQuestion() {
    this.poll.questions.push({question: "", type: QuestionType.TrueFalse});
  }
}
