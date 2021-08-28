export const pendingNotifications = state => state.notificationQueue;

export const hasPendingNotifications = state => state.notificationQueue.length > 0;

export const currentNotification = state => state.notificationQueue[0];
