import { makeAutoObservable, runInAction } from 'mobx';

export enum NotificationType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export type Notification = {
  id: number;
  text: string;
  type: NotificationType;
  duration: number;
};

const defaultDurationSeconds: number = 5;

export class NotificationStore {
  notifications: Notification[] = [];
  private lastId: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addNotification(props: {
    text: string;
    type: NotificationType;
    durationSeconds?: number;
  }) {
    const notification: Notification = {
      id: this.lastId++,
      text: props.text,
      type: props.type,
      duration: props.durationSeconds ?? defaultDurationSeconds,
    };

    runInAction(() => {
      this.notifications.push(notification);
    });

    setTimeout(() => {
      this.removeNotification(notification);
    }, notification.duration * 1000);
  }

  private removeNotification(notification: Notification) {
    runInAction(() => {
      const index = this.notifications.findIndex(
        (x) => x.id === notification.id
      );

      this.notifications.splice(index, 1);
    });
  }
}
