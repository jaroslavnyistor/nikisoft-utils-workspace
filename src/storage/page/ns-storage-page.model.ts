export interface NsStoragePageModel {
   getStateKey(): string;

   getState(): any;

   setState(state: any);

   onNavigationToState(state: any);

   onNavigationBackState(state: any);
}
