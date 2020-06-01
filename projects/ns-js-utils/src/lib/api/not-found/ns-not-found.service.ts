import { Injectable } from '@angular/core';
import { NsRouterService } from '../../navigation/ns-router.service';
import { routeNotFound } from './ns-not-found.route';

@Injectable({
  providedIn: 'root',
})
export class NsNotFoundService {
  constructor(private _routerService: NsRouterService) {}

  navigate() {
    this._routerService.navigateByUrl(routeNotFound);
  }
}
