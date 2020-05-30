import { Component } from "@angular/core";
import { NsDate } from "ns-js-utils";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'ns-js-utils-playground';
  now = NsDate.now().toHumanReadableString();
}
