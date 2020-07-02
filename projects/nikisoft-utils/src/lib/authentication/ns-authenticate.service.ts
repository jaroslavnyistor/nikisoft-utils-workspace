import { Inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, OperatorFunction } from 'rxjs';
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

  /**
   * Gets user ID
   */
  get userId(): number {
    return this._model.id;
  }

  /**
   * Observable which emits true/false if user is logged in
   */
  get isLoggedIn$(): Observable<boolean> {
    return this._model.isLoggedIn$;
  }

  /**
   * Emits changes to user login
   */
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
      next: (loginExpired: boolean) => {
        if (loginExpired && _toLoginOnExpiration) {
          this.logoutAsync(_routerService.url);
        }
      },
    });
  }

  /**
   * Authenticate user based on user name and password
   * @param userName User name
   * @param password Password
   */
  authenticate(userName: string, password: string): Observable<NsAuthenticateResponseEntity> {
    return this._apiService.authenticate(userName, password);
  }

  /**
   * Performs login of user based supplied information with URL where to navigate
   * @param entity Information about user login
   * @param returnUrl URL where to navigate
   */
  async loginAsync(entity: NsAuthenticateResponseEntity, returnUrl: string): Promise<void> {
    this._credentialsStorageService.login(entity);
    this._model.update(entity);

    await this._navService.toUrlAsync(returnUrl);
  }

  /**
   * Logs out user with option return URL
   * @param url URL to return after user logs in again
   */
  async logoutAsync(url?: string): Promise<void> {
    const routerUrl = NsString.nullOrEmpty(url, this._routerService.url);

    await this._navService.toLoginUrlAsync(routerUrl);

    this._credentialsStorageService.logout();
    this._apiService.logout();

    this._model.update(newNsAuthenticateResponseEntity());
  }

  /**
   * Determines if user can activate a specific URL
   * @param route
   * @param state
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._model.isLoggedIn$.pipe(this.resolveCanActive(route, state));
  }

  private resolveCanActive(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): OperatorFunction<boolean, boolean> {
    return map((isLoggedIn: boolean) => {
      if (!isLoggedIn) {
        this.logoutAsync(state.url);
        return false;
      }

      if (!this._model.hasPermission(route.data)) {
        this._noPermissionService.navigateAsync();
        return false;
      }

      return true;
    });
  }

  hasPermission(permissionId: number) {
    return this._model.hasPermissionById(permissionId);
  }
}
