export const enqueueNotification = (state, notification) => {
	state.notificationQueue.push(notification);
};

export const dequeueNotification = (state, id) => {
	state.notificationQueue = state.notificationQueue.filter(m => m.id !== id);
};
