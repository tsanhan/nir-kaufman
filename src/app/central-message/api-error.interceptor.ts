import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError } from 'rxjs/operators'
import { Observable, of } from 'rxjs';
import { CentralMessageService } from './central-message.service';
import { MessageType } from './central-message.types';
import { AbstractCentralMessage } from './abstract-central-message';

@Injectable()
export class ApiErrorInterceptor implements HttpInterceptor {

  constructor(private abstractMessageService: AbstractCentralMessage) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error:any)=> {
        this.abstractMessageService.setMessage({
          type: MessageType.Error,
          description: "something bad happened"
        })
        return of(error);
      })

    )


  }
}
