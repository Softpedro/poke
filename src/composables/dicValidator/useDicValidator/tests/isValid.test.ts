import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { $ref } from 'vue/macros'
import type { ValidationsDic } from '../../types'
import { isEmail, isMaxLength, isMinLength, useDicValidator } from '../..'
import type { TestForm } from './mocks'
import { validationsDic } from './mocks'

describe('useDicValidator isValid attribute', () => {
  it('with ref', async () => {
    const form = ref<TestForm>({
      name: 'christian',
      email: 'cris@mail.co',
      password: 'password',
    })

    const { isValid } = $(useDicValidator(form.value, validationsDic))
    expect(isValid).toBe(true)

    form.value.password = 'this is a very my long password'
    expect(isValid).toBe(false)
  })

  it('with Sref (reactivity transform)', async () => {
    const form = $ref<TestForm>({
      name: 'christian',
      email: 'cris@mail.co',
      password: 'password',
    })

    const { isValid } = $(useDicValidator(form, validationsDic))
    expect(isValid).toBe(true)

    form.password = 'this is a very my long password'
    expect(isValid).toBe(false)
  })

  it('unordered validation dictionary', async () => {
    const form = $ref<TestForm>({
      name: 'christian',
      email: 'cris@mail.co',
      password: 'password',
    })

    const unorderedValidationsDic: ValidationsDic<TestForm> = {
      password: [
        (value: string) => isMinLength(value, 5),
        (value: string) => isMaxLength(value, 10),
      ],
      email: [
        (value: string) => isEmail(value),
        (value: string) => isMinLength(value, 5),
        (value: string) => isMaxLength(value, 15),
      ],
      name: [
        (value: string) => isMinLength(value, 1),
        (value: string) => isMaxLength(value, 20),
      ],
    }

    const { isValid } = $(useDicValidator(form, unorderedValidationsDic))
    await nextTick()
    expect(isValid).toBe(true)

    form.password = 'this is a very my long password'
    await nextTick()
    expect(isValid).toBe(false)
  })

  it('with partial validations dictionary (not required field)', async () => {
    const partialValidationsDic: ValidationsDic<TestForm> = {
      email: [
        (value: string) => isEmail(value),
        (value: string) => isMinLength(value, 5),
        (value: string) => isMaxLength(value, 15),
      ],
    }

    const form = $ref<TestForm>({
      name: 'christian',
      email: 'cris@mail.co',
      password: 'password',
    })

    const { isValid } = $(useDicValidator(form, partialValidationsDic))
    await nextTick()
    expect(isValid).toBe(true)

    form.password = 'this is a very my long password'
    await nextTick()
    expect(isValid).toBe(true)

    form.email = 'ema@mail.co'
    await nextTick()
    expect(isValid).toBe(true)
  })
})
