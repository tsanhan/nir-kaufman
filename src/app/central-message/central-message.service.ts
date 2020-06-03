import { Injectable, Inject, Optional } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message, MESSAGE_LOGGERS, MessageLogger } from './central-message.types';
import { AbstractCentralMessage } from './abstract-central-message';
import { CentralMessageConfigService } from './central-messave-config.service';

@Injectable({
  providedIn: 'root'
})
export class CentralMessageService extends AbstractCentralMessage {
  // reactive data service



  constructor(
    @Inject(MESSAGE_LOGGERS) @Optional() private loggers: MessageLogger[],
    private configService: CentralMessageConfigService
  ) {
    super();
  }


  public setMessage(message: Message): void {
    this._messageQueue.push(message);
    this._messages.next([...this._messageQueue]);

    if (this.configService.configuration.enableLoggers) {

      if (this.loggers && this.loggers.length > 0) {
        this.loggers.forEach(logger => {
          logger.logMessage(message);
        })
      }
    }
  }

  public removeMessage(message: Message): void {
    const index = this._messageQueue.indexOf(message);
    this._messageQueue.splice(index, 1);
    this._messages.next([...this._messageQueue]);
  }

}


@Injectable({
  providedIn: 'root'
})
export class CustomMessageService extends AbstractCentralMessage {
  setMessage(message: Message): void {
    console.log("cant send 🌋");

  }
  removeMessage(message: Message): void {
    console.log("cant remove 🌋");

  }

}
