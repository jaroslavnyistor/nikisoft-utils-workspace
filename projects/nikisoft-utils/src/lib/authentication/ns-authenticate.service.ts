import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NsNoPermissionService } from '../api/no-permission/ns-no-permission.service';
import { NsNavigationService } from '../navigation/ns-navigation.service';
import { NsRouterService } from '../navigation/ns-router.service';
import { NsString } from '../objects/ns-string';
import { NsAuthenticateApiService } from './ns-authenticate-api.service';
import { newNsAuthenticateResponseEntity, NsAuthenticateResponseEntity } from './ns-authenticate-response.entity';
import { NsAuthenticateResponseModel } from './ns-authenticate-response.model';
import {
  DI_NS_AUTHENTICATION_API_SERVICE,
  DI_NS_AUTHENTICATION_TO_LOGIN_ON_EXPIRATION,
} from './ns-authenticate.di-tokens';
import { NsAuthenticateStorage } from './ns-authenticate.storage';

/**
 * Service to provide information about user ID, login status and changes
 * to authentication state. Also handles access to routes based on authentication
 * state and permissions
 */
@Injectable({
  providedIn: 'root',
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
    @Inject(DI_NS_AUTHENTICATION_API_SERVICE) private readonly _apiService: NsAuthenticateApiService,
    @Inject(DI_NS_AUTHENTICATION_TO_LOGIN_ON_EXPIRATION) private readonly _toLoginOnExpiration: boolean,
    private readonly _navService: NsNavigationService,
    private readonly _noPermissionService: NsNoPermissionService,
    private readonly _credentialsStorageService: NsAuthenticateStorage,
    private readonly _routerService: NsRouterService,
  ) {
    this._model = new NsAuthenticateResponseModel();

    const entity = this._credentialsStorageService.credentials || newNsAuthenticateResponseEntity();
    this._model.update(entity);

    this._model.loginExpired$.subscribe({
      next: (loginExpired) => {
        if (loginExpired && _toLoginOnExpiration) {
          this.logout(_routerService.url);
        }
      },
    });
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
    const routerUrl = NsString.nullOrEmpty(url, this._routerService.url);

    return this._navService.toLogin(routerUrl).then(() => {
      this._credentialsStorageService.logout();
      this._apiService.logout();

      this._model.update(newNsAuthenticateResponseEntity());
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._model.isLoggedIn$.pipe(map((isLoggedIn) => this.resolveCanActive(route, state, isLoggedIn)));
  }

  private resolveCanActive(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, isLoggedIn: boolean): boolean {
    if (!isLoggedIn) {
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
