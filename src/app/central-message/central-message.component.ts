import { Component, OnInit } from '@angular/core';
import { CentralMessageService } from './central-message.service';
import { Observable } from 'rxjs';
import { Message } from './central-message.types';
import { AbstractCentralMessage } from './abstract-central-message';

@Component({
  selector: 'app-central-message',
  template: `
    <ng-container *ngFor="let message of messages$ | async">
      <div class="alert alert-danger alert-dismissible fade show">
        {{message.description}}
        <button (click)="remove(message)" class="close"><span>❌</span></button>
      </div>
    </ng-container>
  `
})
export class CentralMessageComponent implements OnInit {

  messages$: Observable<Message[]>
  constructor(private abstractCentralMessage: AbstractCentralMessage) { }

  ngOnInit(): void {
    this.messages$ = this.abstractCentralMessage.messages$;
  }

  remove(message: Message): void {
    this.abstractCentralMessage.removeMessage(message);
  }
}
