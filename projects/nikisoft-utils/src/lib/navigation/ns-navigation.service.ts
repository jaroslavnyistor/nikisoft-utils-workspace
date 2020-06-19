import { Params } from '@angular/router';
import { loginRoute } from '../authentication/login/login.route';
import { NsString } from '../objects/ns-string';
import { NsStorageService } from '../storage/ns-storage.service';
import { NsStoragePageModel } from '../storage/page/ns-storage-page.model';
import { NsStoragePageService } from '../storage/page/ns-storage-page.service';
import { NsRouterService } from './ns-router.service';

export abstract class NsNavigationService {
  protected constructor(protected _routerService: NsRouterService, private _storageService: NsStorageService) {
  }

  protected finishEditing(model: NsStoragePageModel, navigationBackState?: any) {
    const service = new NsStoragePageService(model, this._storageService);
    service.deletePageState();
    service.saveNavigationBackState(navigationBackState);
  }

  protected navigate(url: string, queryParams: Params = null, state: any = null) {
    return this._routerService.navigate(url, queryParams, state);
  }

  toHomePage(): Promise<void> {
    return this.navigate('/');
  }

  toLogin(returnUrl: string = null): Promise<void> {
    const queryParams: Params = {
      returnUrl: NsString.nullOrEmpty(returnUrl, this._routerService.url),
    };

    return this.navigate(loginRoute, queryParams);
  }

  toReturnUrl(returnUrl: string) {
    return this.navigate(returnUrl);
  }

  toUrl(route: string) {
    return this.navigate(route);
  }
}
