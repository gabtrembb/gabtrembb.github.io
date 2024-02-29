import { Injectable } from '@angular/core';
import { Poll } from '../structs/poll';
import { io } from "socket.io-client";
import { BehaviorSubject } from 'rxjs';

const WEBSOCKET_DOMAIN = "http://localhost:3000";
//TODO: AMAZON DOMAIN
const socket = io(WEBSOCKET_DOMAIN);

@Injectable({
  providedIn: 'root'
})
export class PollService {
  private pollNames : BehaviorSubject<{id : string, name : string}[]> = new BehaviorSubject<any[]>([]);
  public pollNames$ = this.pollNames.asObservable();

  constructor() 
  { 
    this.initSocketListeners();
  }

  private initSocketListeners()
  {
    socket.on("connect", () => {
      console.log("connection");
      socket.emit('get_poll_names');
    });

    socket.on("request_get_poll_names", () => {
      socket.emit('get_poll_names');
    });

    socket.on("get_poll_names", (pollNames : {id : string, name : string}[]) => {
      this.pollNames.next(pollNames);
    });
    
    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  }

  createPoll(poll : Poll)
  {
    socket.emit('create_poll', poll);
  }
}
