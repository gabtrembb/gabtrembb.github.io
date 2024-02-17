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
import {MatIconModule} from '@angular/material/icon';
import { PollService } from '../services/poll.service';
import { Question } from '../structs/question';

@Component({
  selector: 'app-poll-creation',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, CommonModule, MatSelectModule, MatIconModule],
  templateUrl: './poll-creation.component.html',
  styleUrl: './poll-creation.component.css'
})
export class PollCreationComponent {
  public poll : Poll = {name:"", password:"", money: 10, questions: [{question: "", type: QuestionType.TrueFalse, choices: ["", ""]}]};

  constructor(public dialogRef: MatDialogRef<PollCreationComponent>, public pollService: PollService) { }

  trackByIndex(i : number) {
    return i;
  }

  addQuestion() {
    this.poll.questions.push({question: "", type: QuestionType.TrueFalse, choices: ["", ""]});
  }

  deleteQuestion(index : number)
  {
    if(this.poll.questions.length > 1 && index < this.poll.questions.length)
    {
      this.poll.questions.splice(index, 1);
    }
  }

  addChoice(questionIndex : number)
  {
    this.poll.questions[questionIndex].choices.push("");
  }

  removeChoice(questionIndex : number, choiceIndex : number)
  {
    if(questionIndex < this.poll.questions.length && 
      choiceIndex < this.poll.questions[questionIndex].choices.length &&
      this.poll.questions[questionIndex].choices.length > 2)
    {
      this.poll.questions[questionIndex].choices.splice(choiceIndex, 1);
    }
  }

  cancel() {
    this.dialogRef.close();
  }

  isMultiple(type : QuestionType) : boolean
  {
    return type===QuestionType.Multiple;
  }

  submitPoll()
  {
    //Confirm everything is filled properly.

    //Has a name & password.
    if(this.poll.name.length < 1 || this.poll.password.length < 1)
    {
      return;
    }

    for (let i = 0; i < this.poll.questions.length; i++)
    {
      let question : Question = this.poll.questions[i];
      //Has a question.
      if(question.question.length < 1)
      {
        return;
      }

      //Multiple choices have options.
      if(question.type===QuestionType.Multiple)
      {
        for (let j = 0; j < question.choices.length; j++)
        {
          if(question.choices[j].length < 1)
          {
            return;
          }
        }
      }
    }

    this.pollService.polls.push(this.poll);
    this.dialogRef.close();
  }
}
