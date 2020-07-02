/**
 * Defines contract to handle storing information about a page in application
 */
export interface NsStoragePageModel {
  /**
   * Gets the key used to store state of page
   */
  getStateKey(): string;

  /**
   * Gets the state of the page
   */
  getState(): any;

  /**
   * Sets the state of the page
   * @param state
   */
  setState(state: any);

  /**
   * Invoked when user navigates to the page with initial state
   * @param state
   */
  onNavigationToState(state: any);

  /**
   * Invoked when user navigates back to the page with state to be set
   * @param state
   */
  onNavigationBackState(state: any);
}
