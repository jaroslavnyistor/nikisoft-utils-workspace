import { Inject, Injectable, InjectionToken, Type } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { NsPageNoPermissionService } from '../../ui/page/no-permission/ns-page-no-permission.service';
import { nsNullOrEmpty } from '../helpers/strings/ns-helpers-strings';
import { NsNavigationService } from '../navigation/ns-navigation.service';
import { NsRouterService } from '../navigation/ns-router.service';
import { newNsAuthenticateResponseEntity, NsAuthenticateResponseEntity } from './ns-authenticate-response.entity';
import { NsAuthenticateResponseModel } from './ns-authenticate-response.model';
import { NsAuthenticationApiService } from './ns-authentication-api.service';
import { NsCredentialsStorageService } from './ns-credentials-storage.service';

export const DI_NS_AUTHENTICATION_API_SERVICE = new InjectionToken<NsAuthenticationApiService>(
   'DI_NS_AUTHENTICATION_API_SERVICE'
);

export function setAuthService(useClass: Type<NsAuthenticationApiService>) {
   return {
      provide: DI_NS_AUTHENTICATION_API_SERVICE, useClass
   };
}

export function buildSecureRouteToComponent(path: string, component: Type<any>, permissionId): Route {
   return {
      path,
      component,
      canActivate: [NsAuthenticateService],
      data: {
         permission: permissionId
      }
   };
}

@Injectable({
   providedIn: 'root'
})
export class NsAuthenticateService implements CanActivate {
   private readonly _model: NsAuthenticateResponseModel;

   get userId(): number {
      return this._model.id;
   }

   get isLoggedIn$(): Observable<boolean> {
      return this._model.isLoggedIn$;
   }

   get changes$(): Observable<NsAuthenticateResponseModel> {
      return this._model.changes$;
   }

   constructor(
      @Inject(DI_NS_AUTHENTICATION_API_SERVICE) private _apiService: NsAuthenticationApiService,
      private _navService: NsNavigationService,
      private _noPermissionService: NsPageNoPermissionService,
      private _credentialsStorageService: NsCredentialsStorageService,
      private _routerService: NsRouterService
   ) {
      this._model = new NsAuthenticateResponseModel();

      const entity = this._credentialsStorageService.credentials || newNsAuthenticateResponseEntity()
      this._model.update(entity);
   }

   authenticate(userName: string, password: string): Observable<NsAuthenticateResponseEntity> {
      return this._apiService.authenticate(userName, password);
   }

   login(entity: NsAuthenticateResponseEntity, returnUrl: string): Promise<void> {
      this._credentialsStorageService.login(entity);
      this._model.update(entity);

      return this._navService.toReturnUrl(returnUrl);
   }

   logout(url?: string): Promise<void> {
      const routerUrl = nsNullOrEmpty(url, this._routerService.url);

      return this._navService.toLogin(routerUrl)
         .then(() => {
            this._credentialsStorageService.logout();
            this._apiService.logout();

            this._model.update(newNsAuthenticateResponseEntity());
         });
   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      if (!this._model.isLoggedIn) {
         this.logout(state.url);

         return false;
      }

      if (!this._model.hasPermission(route.data)) {
         this._noPermissionService.navigate();
         return false;
      }

      return true;
   }

   hasPermission(permissionId: number) {
      return this._model.hasPermissionById(permissionId);
   }
}
