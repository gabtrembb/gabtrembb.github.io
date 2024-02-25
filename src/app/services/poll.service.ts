import { Injectable } from '@angular/core';
import { Poll } from '../structs/poll';
import { OnlineService } from './online.service';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  public polls : Poll[] = [{name: "Poll test", password: "gab", money: 10.0, questions:[]}, {name: "Another poll", password: "gab", money: 10.0, questions:[]}, {name: "Last poll test", password: "gab", money: 10.0, questions:[]}] 

  constructor(public onlineService: OnlineService) 
  { 
  }

  createPoll(poll : Poll)
  {
    //Poke the server.
  }
}
