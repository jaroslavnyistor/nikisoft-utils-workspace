import { Injectable } from '@angular/core';
import { NsRouterService } from '../../navigation/ns-router.service';

/**
 * Exposes API to navigate to no permission page.
 */
@Injectable({
  providedIn: 'root',
})
export class NsNoPermissionService {
  /**
   * Default route to no permission page
   */
  public static routeNoPermission = 'no-permission';

  constructor(private _routerService: NsRouterService) {
  }

  /**
   * Navigates to no permission route.
   */
  async navigateAsync(): Promise<void> {
    await this._routerService.navigateByUrl(NsNoPermissionService.routeNoPermission);
  }
}
