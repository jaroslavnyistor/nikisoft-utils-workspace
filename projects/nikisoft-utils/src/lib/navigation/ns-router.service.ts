import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { NavigationExtras, Params } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';
import { NsStorageService } from '../storage/ns-storage.service';
import { NsStoragePageService } from '../storage/page/ns-storage-page.service';

@Injectable({
  providedIn: 'root',
})
export class NsRouterService {
  private readonly _isNavigating$: Observable<boolean>;

  get isNavigating$(): Observable<boolean> {
    return this._isNavigating$;
  }

  get url(): string {
    return this._router.url;
  }

  constructor(private _router: Router, private _storageService: NsStorageService) {
    this._isNavigating$ = _router.events.pipe(
      filter((event) => event instanceof NavigationStart || event instanceof NavigationEnd),
      flatMap((event) => of(event instanceof NavigationStart)),
    );
  }

  async navigate(url: string, queryParams: Params = null, state: any = null) {
    const options: NavigationExtras = {};
    if (queryParams != null) {
      options.queryParams = queryParams;
      options.queryParamsHandling = 'merge';
    }

    if (state != null) {
      const service = new NsStoragePageService(null, this._storageService);
      service.saveNavigationToState(state);
    }

    await this._router.navigate([url], options);
  }

  async navigateByUrl(url: string) {
    await this._router.navigateByUrl(url);
  }
}
