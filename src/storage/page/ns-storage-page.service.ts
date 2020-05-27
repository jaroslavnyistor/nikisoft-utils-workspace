import { NsStorageService } from '../ns-storage.service';
import { NsStoragePageModel } from './ns-storage-page.model';

const navigationToStateKey = 'app-navigation-to-state';
const navigationBackStateKey = 'app-navigation-back-state';

export class NsStoragePageService {
   constructor(
      private readonly _model: NsStoragePageModel,
      private readonly _storageService: NsStorageService
   ) {
   }

   onInit(): void {
      window.addEventListener('beforeunload', this.beforeUnloadListener);

      this.load();
   }

   private load() {
      this.loadPageState();
      this.loadNavigationToState();
      this.loadNavigationBackState();
   }

   private loadPageState() {
      const stateKey = this._model.getStateKey();
      const state = this._storageService.loadPerUser(stateKey);

      if (state != null) {
         this._model.setState(state);
      }
   }

   private loadNavigationToState() {
      const state = this._storageService.loadPerUser(navigationToStateKey);

      if (state != null) {
         this._storageService.deletePerUser(navigationToStateKey);
         this._model.onNavigationToState(state);
      }
   }

   private loadNavigationBackState() {
      const state = this._storageService.loadPerUser(navigationBackStateKey);

      if (state != null) {
         this._storageService.deletePerUser(navigationBackStateKey);

         this._model.onNavigationBackState(state);
      }
   }

   onDestroy(): void {
      window.removeEventListener('beforeunload', this.beforeUnloadListener);
   }

   private beforeUnloadListener = () => {
      this.save();
   };

   save() {
      this.savePageState();
   }

   private savePageState() {
      const state = this._model.getState();

      if (state != null) {
         const stateKey = this._model.getStateKey();
         this._storageService.savePerUser(stateKey, state);
      }
   }

   saveNavigationToState(state: any) {
      if (state != null) {
         this._storageService.savePerUser(navigationToStateKey, state);
      }
   }

   saveNavigationBackState(state: any) {
      if (state != null) {
         this._storageService.savePerUser(navigationBackStateKey, state);
      }
   }

   deletePageState() {
      this._storageService.deletePerUser(this._model.getStateKey());
   }
}
