import { AutoFocusDirective } from "./auto-focus.directive";
import { Component, Directive } from "@angular/core";
import { SpectatorWithHost } from "../lib/src";
import { createHostComponentFactory } from "../lib/src/host";
import { By } from "@angular/platform-browser";

@Component({ selector: "custom-host", template: "" })
class CustomHostComponent {
  isFocused = false;
}

describe("DatoAutoFocusDirective", function() {
  let host: SpectatorWithHost<AutoFocusDirective, CustomHostComponent>;

  const createHost = createHostComponentFactory({
    component: AutoFocusDirective,
    host: CustomHostComponent
  });

  it("should be focused", () => {
    host = createHost(`<input datoAutoFocus="true">`);
    const instance = host.getDirectiveInstance<AutoFocusDirective>(
      AutoFocusDirective
    );
    expect(host.element).toBeFocused();
  });

  it("should NOT be focused", () => {
    host = createHost(`<input [datoAutoFocus]="false">`);
    expect(host.element).not.toBeFocused();
  });

  it("should work with dynamic input", () => {
    host = createHost(`<input [datoAutoFocus]="isFocused">`);
    expect(host.element).not.toBeFocused();
    host.setHostInput({ isFocused: true });
    expect(host.element).toBeFocused();
  });
});
