import { Component } from '@angular/core';
import { NsDate } from '../../../nikisoft-utils/src/lib/objects/ns-date';
import { NsDateTimeFormatter } from '../../../nikisoft-utils/src/lib/objects/ns-date-time.formatter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [],
})
export class AppComponent {
  title = 'nikisoft-utils-playground';
  now = NsDateTimeFormatter.formatDate(NsDate.now());
}
