import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CentralMessageConfigInterface } from './central-message.types';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CentralMessageConfigService {

  private readonly CONFIG_URL = 'assets/central-message.config.json';
  private config$: Observable<CentralMessageConfigInterface>

  configuration:CentralMessageConfigInterface;
  constructor(private httpClient: HttpClient) { }


  loadConfiguration() {
    this.config$ = this.httpClient.get<CentralMessageConfigInterface>(this.CONFIG_URL)
    .pipe(
      shareReplay(1)
    )

    this.config$.subscribe(config => this.configuration = config);

    return this.config$;
  }
}
