import { Data } from '@angular/router';
import { BehaviorSubject, combineLatest, Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { NsDateTime } from '../objects/ns-date-time';
import { NsString } from '../objects/ns-string';
import { NsAuthenticateResponseEntity } from './ns-authenticate-response.entity';
import { NsAuthenticateRouteData } from './ns-authenticate-route-data';

const statusIntervalMs = 15 * 1000;

export class NsAuthenticateResponseModel {
  private readonly _changes$: BehaviorSubject<NsAuthenticateResponseModel>;
  private readonly _isLoggedIn$: Observable<boolean>;
  private readonly _loginExpired$: Observable<boolean>;

  private _entity: NsAuthenticateResponseEntity;
  private _expires: NsDateTime;
  private _fullName: string;
  private _hasToken: boolean;

  get isLoggedIn$(): Observable<boolean> {
    return this._isLoggedIn$;
  }

  get loginExpired$(): Observable<boolean> {
    return this._loginExpired$;
  }

  get changes$(): Observable<NsAuthenticateResponseModel> {
    return this._changes$;
  }

  get fullName(): string {
    return this._fullName;
  }

  get userName(): string {
    return this._entity.userName;
  }

  get email(): string {
    return this._entity.email;
  }

  get id(): number {
    return this._entity.id;
  }

  constructor() {
    this._changes$ = new BehaviorSubject<NsAuthenticateResponseModel>(this);

    this._isLoggedIn$ = this._changes$.pipe(map(() => this.getIsLoggedIn()));

    this._loginExpired$ = combineLatest([this._changes$, timer(0, statusIntervalMs)]).pipe(
      map(() => this._hasToken && !this.getIsLoggedIn()),
    );
  }

  update(entity: NsAuthenticateResponseEntity) {
    this._entity = entity;

    this._expires = NsDateTime.from(this._entity.expires);
    this._fullName = NsString.join(' ', [this._entity.firstName, this._entity.lastName]);
    this._hasToken = NsString.isNotNullOrEmpty(this._entity.token);

    this._changes$.next(this);
  }

  private getIsLoggedIn(): boolean {
    return this._hasToken && !this.hasTokenExpired();
  }

  private hasTokenExpired(): boolean {
    return this._expires.isBefore(NsDateTime.from());
  }

  hasPermission(data: NsAuthenticateRouteData | Data) {
    if (data == null || data.permission == null) {
      return true;
    }

    const permissionId = data.permission;
    return this.hasPermissionById(permissionId);
  }

  hasPermissionById(permissionId: number) {
    return permissionId === 0 || this._entity.permissions.some((id) => id === permissionId);
  }
}
