import { Injectable } from '@angular/core';
import { Poll } from '../structs/poll';

@Injectable({
  providedIn: 'root'
})
export class PollService {
  public polls : Poll[] = [{name: "Poll test", password: "gab", money: 10.0}, {name: "Another poll", password: "gab", money: 10.0}, {name: "Last poll test", password: "gab", money: 10.0}] 

  constructor() { }
}
