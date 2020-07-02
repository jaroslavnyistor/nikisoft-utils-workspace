import { Injectable } from '@angular/core';
import { NsRouterService } from '../../navigation/ns-router.service';

/**
 * Exposes API to navigate to not found page.
 */
@Injectable({
  providedIn: 'root',
})
export class NsNotFoundService {
  /**
   * Default route to not found page
   */
  public static routeNotFound = 'not-found';

  constructor(private _routerService: NsRouterService) {
  }

  /**
   * Navigates to not found route
   */
  async navigateAsync(): Promise<void> {
    await this._routerService.navigateByUrl(NsNotFoundService.routeNotFound);
  }
}
