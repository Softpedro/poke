import { ref } from 'vue'
import type { State } from '~/types/state'
import { createUniqueId } from '~/utils/createUniqueId'

export interface NotificationConfig {
  message: string
  type?: State
}

interface Notification extends NotificationConfig {
  id: string
}

export const pageNotifications = ref<Notification[]>([])

const timeoutIds = ref<NodeJS.Timeout[]>([])
const durationInMilliseconds = 8_000

export function multipleNotify(newNotifications: NotificationConfig[]): void {
  newNotifications.forEach((notification) => {
    notify(notification)
  })
}

export function notify(notification: NotificationConfig): void {
  const notificationId = createUniqueId()
  pageNotifications.value.push({ ...notification, id: notificationId })

  const timeoutId = setTimeout(() => removeNotificationById(notificationId), durationInMilliseconds)
  timeoutIds.value.push(timeoutId)
}

function removeNotificationById(id: string): void {
  const index = pageNotifications.value.findIndex(notification => notification.id === id)

  if (index < 0)
    return

  pageNotifications.value.splice(index, 1)
}
