import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationExtras, NavigationStart, Params, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, flatMap } from 'rxjs/operators';
import { NsStorageService } from '../storage/ns-storage.service';
import { NsStoragePageService } from '../storage/page/ns-storage-page.service';

/**
 * Responsible for performing navigation with state management. State is sent between
 * two pages.
 */
@Injectable({
  providedIn: 'root',
})
export class NsRouterService {
  private readonly _isNavigating$: Observable<boolean>;

  /**
   * Outputs if the navigation is in progress.
   */
  get isNavigating$(): Observable<boolean> {
    return this._isNavigating$;
  }

  /**
   * Current URL
   */
  get url(): string {
    return this._router.url;
  }

  constructor(private _router: Router, private _storageService: NsStorageService) {
    this._isNavigating$ = _router.events.pipe(
      filter((event) => event instanceof NavigationStart || event instanceof NavigationEnd),
      flatMap((event) => of(event instanceof NavigationStart)),
    );
  }

  /**
   * Performs navigation to url with optional queryParams and state.
   * @param url URL where to navigate
   * @param queryParams Query parameters
   * @param state Object which is saved during navigation and can be restored after
   * page is loaded
   */
  async navigateAsync(url: string, queryParams: Params = null, state: any = null): Promise<void> {
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
