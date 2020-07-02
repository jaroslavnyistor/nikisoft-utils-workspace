import { NsStorageService } from '../ns-storage.service';
import { NsStoragePageModel } from './ns-storage-page.model';

/**
 * Handles load and save of page's state, state when user navigates to the page or back to the page
 */
export class NsStoragePageService {
  private static navigationToStateKey = 'app-navigation-to-state';
  private static navigationBackStateKey = 'app-navigation-back-state';

  constructor(private readonly _model: NsStoragePageModel, private readonly _storageService: NsStorageService) {
  }

  /**
   * Initializes the service
   */
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
    const state = this._storageService.loadPerUser(NsStoragePageService.navigationToStateKey);

    if (state != null) {
      this._storageService.deletePerUser(NsStoragePageService.navigationToStateKey);
      this._model.onNavigationToState(state);
    }
  }

  private loadNavigationBackState() {
    const state = this._storageService.loadPerUser(NsStoragePageService.navigationBackStateKey);

    if (state != null) {
      this._storageService.deletePerUser(NsStoragePageService.navigationBackStateKey);

      this._model.onNavigationBackState(state);
    }
  }

  /**
   * Performs clean-up
   */
  onDestroy(): void {
    window.removeEventListener('beforeunload', this.beforeUnloadListener);
  }

  private beforeUnloadListener = () => {
    this.save();
  };

  /**
   * Saves the page state
   */
  save() {
    const state = this._model.getState();

    if (state != null) {
      const stateKey = this._model.getStateKey();
      this._storageService.savePerUser(stateKey, state);
    }
  }

  /**
   * Saves the state when user navigates to the page
   * @param state
   */
  saveNavigationToState(state: any) {
    if (state != null) {
      this._storageService.savePerUser(NsStoragePageService.navigationToStateKey, state);
    }
  }

  /**
   * Saves the state when user navigates back the page
   * @param state
   */
  saveNavigationBackState(state: any) {
    if (state != null) {
      this._storageService.savePerUser(NsStoragePageService.navigationBackStateKey, state);
    }
  }

  /**
   * Deletes the page's state
   */
  deletePageState() {
    this._storageService.deletePerUser(this._model.getStateKey());
  }
}
