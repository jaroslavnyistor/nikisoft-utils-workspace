import { Observable, PartialObserver, Subscription } from 'rxjs';

export abstract class NsSubscriptionService {
  private readonly _subscription = new Subscription();

  onInit(): void {}

  onDestroy(): void {
    this._subscription.unsubscribe();
  }

  protected subscribeTo<T>(observable: Observable<T>, observer?: PartialObserver<T>) {
    const subscription = observable.subscribe(observer);
    this._subscription.add(subscription);
  }
}
