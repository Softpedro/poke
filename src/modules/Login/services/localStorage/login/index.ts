import type { LocalStorageRes } from '~/clients/localStorage'
import { addInLocalStorage, getFromLocalStorage, removeFromLocalStorage } from '~/clients/localStorage'
import type { LoggedUser } from '~/composables/loggedUser'
import { LocalStorageKey } from '~/configs/LocalStorageKey'

export function getLoggedUserFromLocalStorage(): LocalStorageRes<LoggedUser> {
    return getFromLocalStorage(LocalStorageKey.LOGGED_USER)
}

export function addLoggedUserInLocalStorage(user: LoggedUser): void {
    addInLocalStorage(LocalStorageKey.LOGGED_USER, user)
}

export function removeLoggedUserFromLocalStorage(): void {
    removeFromLocalStorage(LocalStorageKey.LOGGED_USER)
}
