import { Observable, PartialObserver, Subscription } from 'rxjs';

export abstract class NsSubscriptionModel {
  private readonly _subscription = new Subscription();

  onInit() {
  }

  onDestroy() {
    this._subscription.unsubscribe();
  }

  protected subscribeTo<T>(observable: Observable<T>, observer?: PartialObserver<T>) {
    const subscription = observable.subscribe(observer);
    this._subscription.add(subscription);
  }
}
