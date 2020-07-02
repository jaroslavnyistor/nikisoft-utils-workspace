import { Params } from '@angular/router';
import { loginRoute } from '../authentication/login/login.route';
import { NsString } from '../objects/ns-string';
import { NsStorageService } from '../storage/ns-storage.service';
import { NsStoragePageModel } from '../storage/page/ns-storage-page.model';
import { NsStoragePageService } from '../storage/page/ns-storage-page.service';
import { NsRouterService } from './ns-router.service';

/**
 * Base class for navigation in application
 */
export abstract class NsNavigationService {
  protected constructor(protected _routerService: NsRouterService, private _storageService: NsStorageService) {
  }

  protected finishEditing(model: NsStoragePageModel, navigationBackState?: any) {
    const service = new NsStoragePageService(model, this._storageService);
    service.deletePageState();
    service.saveNavigationBackState(navigationBackState);
  }

  /**
   * Performs navigation to url with optional queryParams and state.
   * @param url URL where to navigate
   * @param queryParams Query parameters
   * @param state Object which is saved during navigation and can be restored after
   * page is loaded
   */
  protected async navigateAsync(url: string, queryParams: Params = null, state: any = null): Promise<void> {
    await this._routerService.navigateAsync(url, queryParams, state);
  }

  /**
   * Navigates to home url
   */
  async toHomeUrlAsync(): Promise<void> {
    await this.navigateAsync('/');
  }

  /**
   * Navigates to login url and adds the returnUrl as query string
   * @param returnUrl
   */
  async toLoginUrlAsync(returnUrl: string = null): Promise<void> {
    const queryParams: Params = {
      returnUrl: NsString.nullOrEmpty(returnUrl, this._routerService.url),
    };

    await this.navigateAsync(loginRoute, queryParams);
  }

  /**
   * Navigates to specific URL
   * @param route
   */
  async toUrlAsync(route: string): Promise<void> {
    await this.navigateAsync(route);
  }
}
