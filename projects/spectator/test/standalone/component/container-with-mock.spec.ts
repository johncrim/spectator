import { Component } from '@angular/core';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';

@Component({
  selector: `test-child-a`,
  template: `<h3 id="child-a">child A</h3>`,
  // standalone: true,
})
export class ChildAComponent {}

@Component({
  selector: `test-child-b`,
  template: `<h3 id="child-b">child B</h3>`,
  // standalone: true,
})
export class ChildBComponent {}

@Component({
  selector: `test-container`,
  template: `<test-child-a /><test-child-b />`,
  // standalone: true,
  imports: [ChildAComponent, ChildBComponent],
})
export class ContainerComponent {}

fdescribe('Standalone component with mock', () => {
  describe('using Spectator', () => {
    let spectator: Spectator<ContainerComponent>;

    const createComponent = createComponentFactory({
      component: ContainerComponent,
      imports: [
        ChildAComponent,
        // ChildBComponent // Removing the mock and declaring the component here fixes the create error
        MockComponent(ChildBComponent),
      ],
    });

    beforeEach(() => {
      spectator = createComponent();
    });

    it('should render mocked and un-mocked children', () => {
      expect(spectator.query('#child-a')).toContainText('child A');
      expect(spectator.query(ChildBComponent)).toBeTruthy();
      expect(spectator.query('#child-b')).not.toContainText('child B');
    });
  });

  // describe('with SpectatorHost', () => {
  //   let host: SpectatorHost<StandaloneComponent>;

  //   const createHost = createHostFactory({
  //     component: StandaloneComponent,
  //     template: `<div><app-standalone></app-standalone></div>`,
  //   });

  //   beforeEach(() => {
  //     host = createHost();
  //   });

  //   it('should render a StandaloneComponent', () => {
  //     expect(host.query('#standalone')).toContainText('This stands alone!');
  //   });
  // });
});
