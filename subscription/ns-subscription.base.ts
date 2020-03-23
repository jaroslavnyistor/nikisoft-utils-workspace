import { OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

export abstract class NsSubscriptionBase implements OnInit, OnDestroy {
   private readonly _subscription = new Subscription();

   protected constructor() {
   }

   ngOnInit(): void {
   }

   ngOnDestroy(): void {
      this._subscription.unsubscribe();
   }

   protected addSubscription(subscription: Subscription) {
      this._subscription.add(subscription);
   }
}
