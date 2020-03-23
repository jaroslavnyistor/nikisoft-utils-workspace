import { NsStorageService } from '../ns-storage.service';
import { NsStoragePageModel } from './ns-storage-page.model';

const navigationToStateKey = 'app-navigation-to-state';
const navigationBackStateKey = 'app-navigation-back-state';

export class NsStoragePageService {
   private readonly _storageService;

   constructor(
      private _model: NsStoragePageModel,
      storageService: NsStorageService
   ) {
      this._storageService = storageService;
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
      const state = this._storageService.load(stateKey);

      if (state != null) {
         this._model.setState(state);
      }
   }

   private loadNavigationToState() {
      const state = this._storageService.load(navigationToStateKey);

      if (state != null) {
         this._storageService.delete(navigationToStateKey);
         this._model.onNavigationToState(state);
      }
   }

   private loadNavigationBackState() {
      const state = this._storageService.load(navigationBackStateKey);

      if (state != null) {
         this._storageService.delete(navigationBackStateKey);

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
         this._storageService.save(stateKey, state);
      }
   }

   saveNavigationToState(state: any) {
      if (state != null) {
         this._storageService.save(navigationToStateKey, state);
      }
   }

   saveNavigationBackState(state: any) {
      if (state != null) {
         this._storageService.save(navigationBackStateKey, state);
      }
   }

   deletePageState() {
      this._storageService.delete(this._model.getStateKey());
   }
}
