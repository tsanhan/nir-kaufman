import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CentralMessageComponent } from './central-message.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApiErrorInterceptor } from './api-error.interceptor';
import { AbstractCentralMessage } from './abstract-central-message';
import { CentralMessageService } from './central-message.service';
import { CentralMessageConfigService } from './central-messave-config.service';



@NgModule({
  declarations: [CentralMessageComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    CentralMessageComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (configService:CentralMessageConfigService) => () => {
        configService.loadConfiguration().toPromise()
      },
      deps: [CentralMessageConfigService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorInterceptor,
      multi: true
    },
    {
      provide: AbstractCentralMessage,
      useClass: CentralMessageService
    }
  ]
})
export class CentralMessageModule { }
