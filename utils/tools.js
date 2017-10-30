import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

// Notifications
const NOTIFICATION_KEY = 'Flashcards:notifications';

export function clearLocalNotifications() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);
}

export function createNotification() {
  return {
    title: 'Don\'t forget to take a quizz',
    body: 'Just do it',
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export function setReminder() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
          if (status === 'granted') {
            Notifications.cancelAllScheduledNotificationsAsync();
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(20);
            tomorrow.setMinutes(0);
            Notifications.scheduleLocalNotificationAsync(
              createNotification(),
              {
                time: tomorrow,
                repeat: 'day',
              }
            );
            AsyncStorage.setItem(NOTIFICATION_KEY, 'true');
          }
        });
      }
    });
}

// Utility functions
export function randomValue() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 16; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

// Transforming arrays into objects to allow refferencing
export function factorObject(items) {
  const newObj = {};
  items.map((item) => {
    const itemId = item.id;
    newObj[itemId] = item;
    return null;
  });
  return newObj;
}
