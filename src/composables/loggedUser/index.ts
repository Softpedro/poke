import {
    addLoggedUserInLocalStorage,
    removeLoggedUserFromLocalStorage,
} from '~/modules/Login/services/localStorage/login'

export interface LoggedUser {
    id: string
    email: string
}

const emptyUser: LoggedUser = { id: '', email: '' }

export const loggedUser = ref<LoggedUser>(emptyUser)

export const isUserLoggedIn = computed<boolean>(() => Boolean(loggedUser.value.email))

export function setLoggedUser(user: LoggedUser): void {
    loggedUser.value = user
    addLoggedUserInLocalStorage(user)
}

export function removeLoggedUser(): void {
    removeLoggedUserFromLocalStorage()
    loggedUser.value = emptyUser
}
