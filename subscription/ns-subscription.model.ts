import { Subscription } from 'rxjs';

export abstract class NsSubscriptionModel {
   private readonly _subscription = new Subscription();

   onInit() {
   }

   onDestroy() {
      this._subscription.unsubscribe();
   }

   protected addSubscription(subscription: Subscription) {
      this._subscription.add(subscription);
   }
}
