import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DeckDirective } from './card-deck.directive';
import { HttpClientModule } from "@angular/common/http";
import { CentralMessageModule } from './central-message/central-message.module';
import { CentralMessageComponent } from './central-message/central-message.component';
import { MessageLogger, Message, MESSAGE_LOGGERS } from './central-message/central-message.types';
import { AbstractCentralMessage } from './central-message/abstract-central-message';
import { CentralMessageService, CustomMessageService } from './central-message/central-message.service';



class MessageConsoleLogger implements MessageLogger {
  logMessage(message: Message): void {
    console.log('MY CUSTOM 💥 LOGGER', message);
  }
}
class MessageServerLogger implements MessageLogger {
  logMessage(message: Message): void {
    console.log('Send To ☁', message);

  }

}


@NgModule({
  declarations: [
    AppComponent,
    DeckDirective,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CentralMessageModule
  ],
  providers: [
    {
      provide: AbstractCentralMessage,
      useClass: CustomMessageService
    },
    {
      provide: MESSAGE_LOGGERS,
      useClass: MessageConsoleLogger,
      multi: true
    },
    {
      provide: MESSAGE_LOGGERS,
      useClass: MessageServerLogger,
      multi: true
    }
  ],
  bootstrap: [AppComponent, CentralMessageComponent],

})
export class AppModule { }
