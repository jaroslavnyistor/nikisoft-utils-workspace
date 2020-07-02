import { OnDestroy, OnInit } from '@angular/core';
import { Observable, PartialObserver, Subscription } from 'rxjs';

/**
 * Base class which exposes API to handle RXJS observable subscription
 * and disposes all subscription
 */
export abstract class NsSubscriptionBase implements OnInit, OnDestroy {
  private readonly _subscription = new Subscription();

  protected constructor() {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
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
