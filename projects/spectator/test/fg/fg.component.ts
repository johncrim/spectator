import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fg',
  template: `
    <form [formGroup]="group">
      <input formControlName="name" />
    </form>
  `,
  styles: [],
  standalone: false,
})
export class FgComponent {
  @Input() public group?: FormGroup;
}
