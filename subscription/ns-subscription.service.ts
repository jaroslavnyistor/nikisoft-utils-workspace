import { Subscription } from 'rxjs';

export abstract class NsSubscriptionService {
   private readonly _subscription = new Subscription();

   onInit(): void {
   }

   onDestroy(): void {
      this._subscription.unsubscribe();
   }

   protected addSubscription(subscription: Subscription) {
      this._subscription.add(subscription);
   }
}
