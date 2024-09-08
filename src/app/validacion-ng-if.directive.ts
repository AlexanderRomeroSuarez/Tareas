import { NgIf } from '@angular/common';
import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { SharedDataServiceService } from './services/shared-data-service.service';

@Directive({
  selector: '[appValidacionNgIf]',
  standalone: true,
  hostDirectives: [NgIf],
})
export class ValidacionNgIfDirective {
  #userService = inject(SharedDataServiceService);
  private readonly ngIfDirective = inject(NgIf);

  @Input('appValidacionNgIf') set condition(value: boolean) {
    this.ngIfDirective.ngIf = value ?? this.#userService.hasActiveBooleam();;
  }

  constructor( ) {
    
   }

}
