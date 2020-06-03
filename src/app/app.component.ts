import { Component, ViewChild, TemplateRef, ViewContainerRef, AfterViewInit } from '@angular/core';
import { Card, CardTypes } from './cards/card.types';
import { HttpClient } from '@angular/common/http';

interface UserContext {
  $implicit: User,
  id: number
}

interface User {
  name: string;
  age: number;
  email: string;
}

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1 class="display-1">Angular <span class="text-muted">MasterClass</span></h1>

      <ng-container *vyDeck="let card blah cards;primary altPrimary "></ng-container>

      <ng-template #altPrimary let-card>
      <div class="card text-white bg-primary mb-3" style="max-width: 18rem;">
        <div class="card-header">{{card.header}}</div>
        <div class="card-body">
          <h5 class="card-title">{{card.title}}</h5>
          <p class="card-text">{{card.text}}</p>
        </div>
      </div>
      </ng-template>




    <h1>Tae Qwon DI</h1>
    <div class="btn-group">
      <button (click)="generateCode(200)" class='btn btn-success'>Generate 200</button>
      <button (click)="generateCode(404)" class='btn btn-warning'>Generate 404</button>
      <button (click)="generateCode(500)" class='btn btn-danger'>Generate 500</button>
    </div>
  `,

})
export class AppComponent implements AfterViewInit {

  cards: Card[] = [
    {
      type: CardTypes.Plain,
      title: "The Title",
      text: " the Text"
    },
    {
      type: CardTypes.Plain,
      title: "Another Title",
      text: " Another Text to render"
    },
    {
      type: CardTypes.Primary,
      title: "what else",
      text: " the Text the Text the Text",
      header: "Im the Header",
      smallText: "and some small text"
    }
  ]

  generateCode(status: number){
    this.httpClient.get(`https://httpstat.us/${status}?sleep=2000`).subscribe()
  }
  constructor(private httpClient: HttpClient) {

  }
  ngAfterViewInit(): void { }
}
