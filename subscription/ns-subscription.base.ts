import { OnDestroy, OnInit } from '@angular/core';
import { Observable, PartialObserver, Subscription } from 'rxjs';

export abstract class NsSubscriptionBase implements OnInit, OnDestroy {
   private readonly _subscription = new Subscription();

   protected constructor() {
   }

   ngOnInit(): void {
   }

   ngOnDestroy(): void {
      this._subscription.unsubscribe();
   }

   protected subscribeTo<T>(observable: Observable<T>, observer?: PartialObserver<T>) {
      const subscription = observable.subscribe(observer);
      this._subscription.add(subscription);
   }
}
