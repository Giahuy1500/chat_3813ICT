import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocketService } from '../services/socket.service';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  messagecontent: string = "";
  messages: string[] = [];
  ioConnection: any;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.initIoConnection();
  }

   initIoConnection() {
    this.socketService.initSocket();
    this.ioConnection = this.socketService.getMessage()
      .subscribe((message: string) => {
        // add new message to the messages array.
        this.messages.push(message);
      });
  }

   chat() {
    if (this.messagecontent) {
      // check there is a message to send
      this.socketService.send(this.messagecontent);
      this.messagecontent = "";
    } else {
      console.log("no message");
    }
  }
}
