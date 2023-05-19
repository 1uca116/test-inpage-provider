import { makeAutoObservable, runInAction } from 'mobx';
import NoEverWallet from '../components/layout/noEverWallet';

export class LayoutStore {
  constructor() {
    makeAutoObservable(this);
  }

  contentModal = {
    show: false,
    content: <></>,
  };

  isMobileSidebarVisible: boolean = false;

  showContentModal(content: JSX.Element) {
    runInAction(() => {
      this.contentModal = {
        show: true,
        content: content,
      };
    });
  }

  hideContentModal() {
    runInAction(() => {
      this.contentModal = {
        show: false,
        content: <></>,
      };
    });
  }

  showEverWalletModal() {
    runInAction(() => {
      this.contentModal = {
        show: true,
        content: <NoEverWallet onClose={() => this.hideContentModal()} />,
      };
    });
  }

  showSidebar() {
    runInAction(() => {
      this.isMobileSidebarVisible = true;
    });
  }

  hideSidebar() {
    runInAction(() => {
      this.isMobileSidebarVisible = false;
    });
  }
}
