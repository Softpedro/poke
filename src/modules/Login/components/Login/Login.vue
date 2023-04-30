<script lang="ts" setup>
import { loginUser } from '../../services/http/login'
import { notify } from '~/composables/pageNotifications'
import { ViewPath } from '~/configs/ViewPath'
import { useDicValidator } from '~/composables/dicValidator'
import { isEmail, isMaxLength, isMinLength } from '~/composables/dicValidator/rules'
import type { ValidationsDic } from '~/composables/dicValidator/types'
import { setLoggedUser } from '~/composables/loggedUser'

interface LoginFormData {
  email: string
  password: string
}

const { t } = useI18n()
const router = useRouter()

const form = ref<LoginFormData>({ email: '', password: '' })
const isLoggingIn = ref<boolean>(false)

const validationsDic: ValidationsDic<LoginFormData> = {
  email: [
    (value: string) => isEmail(value),
    (value: string) => isMaxLength(value, 150),
  ],
  password: [
    (value: string) => isMinLength(value, 5),
    (value: string) => isMaxLength(value, 100),
  ],
}

const {
  validationInfo,
  isValid,
  validate,
} = $(useDicValidator(form.value, validationsDic))

async function onLogin() {
  validate()

  if (!isValid)
    return

  isLoggingIn.value = true

  const response = await loginUser({
    email: form.value.email,
    password: form.value.password,
  })

  if (!response.isOk) {
    notify({
      message: t('$components.Login.invalidCredentialsError'),
      type: 'danger',

    })

    isLoggingIn.value = false
    return
  }

  setLoggedUser(response.result)

  router.push(ViewPath.HOME)
}
</script>

<template>
  <div
    class="ss-login"
    test-id="login"
  >
    <form @submit.prevent="onLogin">
      <FormItem>
        <Input
          v-model="form.email"
          type="email"
          name="email"
          :label="t('Email')"
          :message="t(validationInfo.email.translationConfig.key)"
          :has-error="!validationInfo.email.isValid"
        />
      </FormItem>

      <FormItem>
        <Input
          v-model="form.password"
          type="password"
          name="password"
          :label="t('Password')"
          :message="t(validationInfo.password.translationConfig.key, validationInfo.password.translationConfig.params)"
          :has-error="!validationInfo.password.isValid"
        />
      </FormItem>

      <FormItem>
        <Button
          test-id="login"
          icon="login"
          :is-loading="isLoggingIn"
        >
          {{ t('Login') }}
        </Button>
      </FormItem>
    </form>
  </div>
</template>