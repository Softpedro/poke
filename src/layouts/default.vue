<script lang="ts" setup>
import { isUserLoggedIn, setLoggedUser } from '~/composables/loggedUser'
import { ViewPath } from '~/configs/ViewPath'
import { getLoggedUserFromLocalStorage } from '~/modules/Login/services/localStorage/login'

const { t } = useI18n()
const router = useRouter()

const response = getLoggedUserFromLocalStorage()

if (response.isOk)
    setLoggedUser(response.result)

if (!isUserLoggedIn.value)
    router.push(ViewPath.LOGIN)
</script>

<template>
    <div
        class="ss-default-template"
    >
        <main v-if="isUserLoggedIn">
            <AppContainer />
        </main>

        <Navigation
            :links="[
                { path: ViewPath.HOME, text: t('Home'), icon: 'home' },
                { path: ViewPath.FAVORITE_POKEMONS, text: t('Favorites'), icon: 'heart' },
            ]"
        />
    </div>
</template>
