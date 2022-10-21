import {makeAutoObservable, runInAction} from 'mobx';

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
                content: <></>
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