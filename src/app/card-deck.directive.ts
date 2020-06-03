import { Directive, Input, ViewContainerRef, Renderer2, ComponentFactoryResolver, Injector, ElementRef, OnInit, ComponentRef, TemplateRef } from '@angular/core';
import { Card, CardTypes, CardTemplateContext } from './cards/card.types';
import { CardTemplatesComponent } from './cards/card-templates.component';

@Directive({
  selector: '[vyDeck]'
})
export class DeckDirective implements OnInit {
  @Input('vyDeckBlah') cards: Card[]
  @Input('vyDeckPrimary') PrimaryTemplate:TemplateRef<CardTemplateContext>;
  constructor(
    private viewContainer: ViewContainerRef,
    private renderer: Renderer2,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector,
    private hostElement: ElementRef
  ) { }


  ngOnInit(): void {
    const parentNode = this.renderer.parentNode(this.hostElement.nativeElement);
    const wrapper = this.renderer.createElement('div');

    this.renderer.addClass(wrapper, 'card-deck');

    this.renderer.insertBefore(parentNode, wrapper, this.hostElement.nativeElement);
    this.renderer.removeChild(parentNode, this.hostElement.nativeElement);
    this.renderer.appendChild(wrapper, this.hostElement.nativeElement);

    // create CardTemplatesComponent
    const cardTemplateFactory = this.componentFactoryResolver.resolveComponentFactory(CardTemplatesComponent)
    const cardTemplateComponent: ComponentRef<CardTemplatesComponent> = cardTemplateFactory.create(this.injector);

    this.cards.forEach(card => {
      this.renderTemplate(card, cardTemplateComponent);
    })
  }
  renderTemplate(card: Card, templateComponent: ComponentRef<CardTemplatesComponent>) {
    switch (card.type) {
      case CardTypes.Plain:
        this.viewContainer.createEmbeddedView(templateComponent.instance.plainCardTemplate, { $implicit: card })
        break;
      case CardTypes.Primary:
        this.viewContainer.createEmbeddedView(
          this.PrimaryTemplate || templateComponent.instance.primaryCardTemplate, { $implicit: card }
          )
        break
      default:
        break;
    }
  }

}
