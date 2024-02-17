import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Poll } from '../structs/poll';
import {MatButtonModule} from '@angular/material/button';
import { QuestionType } from '../structs/question';
import { CommonModule } from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-poll-creation',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, CommonModule, MatSelectModule],
  templateUrl: './poll-creation.component.html',
  styleUrl: './poll-creation.component.css'
})
export class PollCreationComponent {
  public poll : Poll = {name:"", password:"", money: 10, questions: [{question: "", type: QuestionType.TrueFalse, choices: ["", ""]}]};

  constructor(public dialogRef: MatDialogRef<PollCreationComponent>) { }

  addQuestion() {
    this.poll.questions.push({question: "", type: QuestionType.TrueFalse, choices: ["", ""]});
  }

  cancel() {
    this.dialogRef.close();
  }

  isMultiple(type : QuestionType) : boolean
  {
    return type===QuestionType.Multiple;
  }
}
