import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import { BsCheckCircle, BsExclamationCircle, BsXCircle } from 'react-icons/bs';
import { Notification, NotificationType } from '../../../store/Notification';
import { useNotification } from '../../../provider/NotificationProvider';

const NotificationItem = ({ item }: { item: Notification }) => {
  const icon = useMemo(() => {
    switch (item.type) {
      case NotificationType.Success:
        return <BsCheckCircle className='text-xl text-success-2' />;
      case NotificationType.Warning:
        return <BsExclamationCircle className='text-xl text-warning-1' />;
      case NotificationType.Error:
        return <BsXCircle className='text-xl text-danger-2' />;
    }
  }, [item.type]);

  const lineClass = useMemo(() => {
    switch (item.type) {
      case NotificationType.Success:
        return 'bg-success-2';
      case NotificationType.Warning:
        return 'bg-warning-1';
      case NotificationType.Error:
        return 'bg-danger-2';
    }
  }, [item.type]);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const initTimeout = setTimeout(() => setShow(true), 100);

    return () => {
      clearTimeout(initTimeout);
    };
  }, [item.duration]);

  return (
    <div
      className={
        'transition-transform translate-x-[150%] duration-500 min-w-[300px] max-w-[300px] ' +
        `flex justify-between notification_background shadow-primary rounded-md ${
          show ? 'translate-x-0' : ''
        }`
      }
    >
      <div className={`min-h-full w-1 rounded-md ${lineClass}`} />
      <div className='w-full flex items-center gap-4 p-4'>
        <div className='flex items-center flex-shrink-0'>{icon}</div>
        <span>{item.text}</span>
      </div>
    </div>
  );
};

const NotificationArea = observer(() => {
  const notificationService = useNotification();

  return (
    <div className='fixed top-[5%] sm:top-[10%] right-0 pointer-events-none z-50 mx-6'>
      <div className='flex flex-col gap-2'>
        {notificationService.notifications.map((notification, index) => (
          <NotificationItem key={index} item={notification} />
        ))}
      </div>
    </div>
  );
});

export default NotificationArea;
