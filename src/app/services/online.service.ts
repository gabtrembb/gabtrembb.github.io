import { Injectable } from '@angular/core';
import WebSocket from 'ws';
import { Poll } from '../structs/poll';

const WEBSOCKET_API = "wss://8zw0toxjc9.execute-api.us-east-2.amazonaws.com/production/";
const ws = new WebSocket(WEBSOCKET_API);

@Injectable({
  providedIn: 'root'
})
export class OnlineService {
  constructor() 
  { 
    this.createWebsocket();
  }

  private createWebsocket()
  {
    ws.addEventListener('open', function (this: OnlineService, event) {
      console.log("websocket connected");
      let testPoll : Poll = {name:"", password:"", money: 10, questions: []};
      this.sendPoll(testPoll);
    });

    ws.addEventListener('error', function (event) {
      console.log(event)
    });
  }

  sendPoll(poll : Poll)
  {
    const payload = {
      Action: 'onCreatePoll',
      body: poll
    }
    ws.send(JSON.stringify(payload));
  }
}
