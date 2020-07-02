import { Observable, PartialObserver, Subscription } from 'rxjs';

/**
 * Base class which exposes API to handle RXJS observable subscription
 * and disposes all subscription for models
 */
export abstract class NsSubscriptionModel {
  private readonly _subscription = new Subscription();

  /**
   * Performs initialization
   */
  onInit() {
  }

  /**
   * Performs clean-up
   */
  onDestroy() {
    this._subscription.unsubscribe();
  }

  /**
   * Subscribes observer to observables and keeps the subscription internally.
   * @param observable
   * @param observer
   */
  protected subscribeTo<T>(observable: Observable<T>, observer?: PartialObserver<T>) {
    const subscription = observable.subscribe(observer);
    this._subscription.add(subscription);
  }
}
