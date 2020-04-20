import { Inject, Injectable, InjectionToken, Type } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { NsPageNoPermissionService } from '../../ui/page/no-permission/ns-page-no-permission.service';
import { nsNullOrEmpty } from '../helpers/strings/ns-helpers-strings';
import { NsNavigationService } from '../navigation/ns-navigation.service';
import { NsRouterService } from '../navigation/ns-router.service';
import { newNsAuthenticateResponseEntity, NsAuthenticateResponseEntity } from './ns-authenticate-response.entity';
import { NsAuthenticateResponseModel } from './ns-authenticate-response.model';
import { NsAuthenticationApiService } from './ns-authentication-api.service';
import { NsAuthenticationEvent } from './ns-authentication.event';
import { NsCredentialsStorageService } from './ns-credentials-storage.service';

const DI_NS_AUTHENTICATION_API_SERVICE = new InjectionToken<NsAuthenticationApiService>(
   'DI_NS_AUTHENTICATION_API_SERVICE'
);

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
   private readonly _authenticationEvent$: BehaviorSubject<NsAuthenticationEvent>;

   get userId(): number {
      return this._authenticationEvent$.value.credentials.id;
   }

   get authenticationEvent$(): Observable<NsAuthenticationEvent> {
      return this._authenticationEvent$;
   }

   private get credentials(): NsAuthenticateResponseModel {
      const entity: NsAuthenticateResponseEntity =
         this._credentialsStorageService.credentials || newNsAuthenticateResponseEntity();

      return new NsAuthenticateResponseModel(entity);
   }

   get isLoggedIn(): boolean {
      return this.credentials != null && this.credentials.isLoggedIn;
   }

   constructor(
      @Inject(DI_NS_AUTHENTICATION_API_SERVICE) private _apiService: NsAuthenticationApiService,
      private _navService: NsNavigationService,
      private _noPermissionService: NsPageNoPermissionService,
      private _credentialsStorageService: NsCredentialsStorageService,
      private _routerService: NsRouterService
   ) {
      this._authenticationEvent$ = new BehaviorSubject<NsAuthenticationEvent>(
         this.createAuthenticationEvent(undefined)
      );
   }

   public authenticate(userName: string, password: string): Observable<NsAuthenticateResponseEntity> {
      return this._apiService.authenticate(userName, password);

   }

   public login(
      credentials: NsAuthenticateResponseEntity,
      returnUrl: string
   ) {
      this._credentialsStorageService.login(credentials);
      this.notifyAuthenticationEvent(returnUrl);

      this._navService.toReturnUrl(returnUrl);
   }

   public logout(url?: string) {
      this._credentialsStorageService.logout(newNsAuthenticateResponseEntity());

      this._apiService.logout();

      const routerUrl = nsNullOrEmpty(url, this._routerService.url);
      this.notifyAuthenticationEvent(routerUrl);

      this._navService.toLogin(routerUrl);
   }

   private notifyAuthenticationEvent(url: string) {
      const authenticationEvent = this.createAuthenticationEvent(url);
      this._authenticationEvent$.next(authenticationEvent);
   }

   private createAuthenticationEvent(url: string) {
      return {
         credentials: this.credentials,
         url
      };
   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let canNavigate = this.credentials.isLoggedIn;
      if (!canNavigate) {
         this.logout(state.url);
      }
      else {
         canNavigate = this.credentials.hasPermission(route.data);

         if (!canNavigate) {
            this._noPermissionService.navigate();
         }
      }

      return canNavigate;
   }

   hasPermission(permissionId: number) {
      return permissionId === 0 || this.credentials.hasPermissionById(permissionId);
   }

   static setAuthService(useClass: Type<NsAuthenticationApiService>) {
      return {
         provide: DI_NS_AUTHENTICATION_API_SERVICE, useClass
      };
   }
}
