import { Component } from '@angular/core';
import { NsDate } from 'nikisoft-utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'nikisoft-utils-playground';
  now = NsDate.now().toHumanReadableString();
}
