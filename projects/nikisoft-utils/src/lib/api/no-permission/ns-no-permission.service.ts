import { Injectable } from '@angular/core';
import { NsRouterService } from '../../navigation/ns-router.service';
import { routeNoPermission } from './ns-no-permission.route';

@Injectable({
  providedIn: 'root',
})
export class NsNoPermissionService {
  constructor(private _routerService: NsRouterService) {}

  async navigate() {
    await this._routerService.navigateByUrl(routeNoPermission);
  }
}
