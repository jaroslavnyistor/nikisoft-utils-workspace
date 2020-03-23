import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { loginRoute } from '../../ui/page/login/login.routes';
import { nsNullOrEmpty } from '../helpers/strings/ns-helpers-strings';
import { NsStorageService } from '../storage/ns-storage.service';
import { NsStoragePageModel } from '../storage/page/ns-storage-page.model';
import { NsStoragePageService } from '../storage/page/ns-storage-page.service';
import { NsRouterService } from './ns-router.service';

@Injectable({
   providedIn: 'root'
})
export class NsNavigationService {
   constructor(
      protected _routerService: NsRouterService,
      private _storageService: NsStorageService
   ) {
   }

   protected finishEditing(model: NsStoragePageModel, navigationBackState?: any) {
      const service = new NsStoragePageService(model, this._storageService);
      service.deletePageState();
      service.saveNavigationBackState(navigationBackState);
   }

   protected async navigate(url: string, queryParams: Params = null, state: any = null) {
      await this._routerService.navigate(url, queryParams, state);
   }

   async toLogin(returnUrl: string = null) {
      const queryParams: Params = {
         returnUrl: nsNullOrEmpty(returnUrl, this._routerService.url)
      };

      await this.navigate(loginRoute, queryParams);
   }

   async toReturnUrl(returnUrl: string) {
      await this.navigate(returnUrl);
   }

   async toUrl(route: string) {
      await this.navigate(route);
   }
}

