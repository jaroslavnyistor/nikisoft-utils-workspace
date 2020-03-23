import { Injectable } from '@angular/core';
import { NavigationExtras, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { NsStorageService } from '../storage/ns-storage.service';
import { NsStoragePageService } from '../storage/page/ns-storage-page.service';

@Injectable({
   providedIn: 'root'
})
export class NsRouterService {
   private _isNavigating$ = new BehaviorSubject<boolean>(false);

   get isNavigating$(): Observable<boolean> {
      return this._isNavigating$;
   }

   get url(): string {
      return this._router.url;
   }

   constructor(private _router: Router,
               private _storageService: NsStorageService
   ) {
   }

   async navigate(url: string, queryParams: Params = null, state: any = null) {
      this._isNavigating$.next(true);

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

      this._isNavigating$.next(false);
   }

   async navigateByUrl(url: string) {
      this._isNavigating$.next(true);

      await this._router.navigateByUrl(url);

      this._isNavigating$.next(false);
   }
}
