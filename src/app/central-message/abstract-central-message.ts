import { Message } from './central-message.types';
import { Observable, BehaviorSubject } from 'rxjs';

export abstract class AbstractCentralMessage {

  protected _messages: BehaviorSubject<Message[]> = new BehaviorSubject<Message[]>([]);
  protected _messageQueue: Message[] = [];
  readonly messages$: Observable<Message[]> = this._messages.asObservable();

  abstract setMessage(message: Message): void;
  abstract removeMessage(message: Message): void;


}
