<script lang="ts" setup>
import type { ComponentPublicInstance } from 'vue'
import { computed, defineAsyncComponent, ref, shallowRef, useSlots, watch } from 'vue'
import { capitalizeStr } from '~/utils/capitalizeString'

export interface InputProps {
  modelValue?: string
  name: string
  type?: string
  label?: string
  placeholder?: string
  isDisabled?: boolean
  hasError?: boolean
  message?: string
  prependIcon?: string
  appendIcon?: string
}

interface InputEmitData {
  $event: InputEvent
}

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  label: '',
  message: '',
})

const emit = defineEmits<{
  (event: 'update:model-value', value: string, $event: InputEvent): void
  (event: 'input', value: string, $event: InputEvent): void
  (event: 'focus', data: InputEmitData): void
  (event: 'blur', data: InputEmitData): void
  (event: 'click'): void
  (event: 'prepend-click'): void
  (event: 'append-click'): void
}>()

const slots = useSlots()

const AppendIcon = shallowRef<ComponentPublicInstance>()
const PrependIcon = shallowRef<ComponentPublicInstance>()

const inputElement = ref<HTMLInputElement | null>(null)

const isFocused = ref(false)
const inputValue = ref<string>('')

const hasAppend = computed<boolean>(() => {
  return Boolean(slots['append-text']) || Boolean(props.appendIcon)
})

const hasPrepend = computed<boolean>(() => {
  return Boolean(slots['prepend-text']) || Boolean(props.prependIcon)
})

watch(() => props.modelValue, (value) => {
  inputValue.value = value || ''
}, { immediate: true })

watch(() => props.prependIcon, (iconName) => {
  if (iconName)
    setPrependIcon(iconName)
}, { immediate: true })

watch(() => props.appendIcon, (iconName) => {
  if (iconName)
    setAppendIcon(iconName)
}, { immediate: true })

const onInput = ($event: InputEvent) => {
  const { value } = $event.target as HTMLInputElement
  emit('update:model-value', value, $event)
  emit('input', value, $event)
}

const onFocus = ($event: InputEvent) => {
  isFocused.value = true
  emit('focus', { $event })
}

const onBlur = ($event: InputEvent) => {
  isFocused.value = false
  emit('blur', { $event })
}

function onClick() {
  emit('click')
}

function onPrependClick() {
  inputElement.value?.focus()
  emit('prepend-click')
}

function onAppendClick() {
  inputElement.value?.focus()
  emit('append-click')
}

function setPrependIcon(iconName: string) {
  const iconPathName = capitalizeStr(iconName)
  PrependIcon.value = defineAsyncComponent(() => import(`../../icons/${iconPathName}Icon.vue`))
}

function setAppendIcon(iconName: string) {
  const iconPathName = capitalizeStr(iconName)
  AppendIcon.value = defineAsyncComponent(() => import(`../../icons/${iconPathName}Icon.vue`))
}

defineExpose({
  inputElement,
})
</script>

<template>
  <div
    :class="{
      'ss-input--disabled': isDisabled,
      'ss-input--error': hasError,
      'ss-input--message': message,
      'ss-input--append': hasAppend,
      'ss-input--prepend': hasPrepend,
    }"
    class="ss-input"
  >
    <div class="ss-input__input-wrap">
      <!-- prepend -->
      <template v-if="hasPrepend">
        <template v-if="slots['prepend-text']">
          <div class="ss-input__prepend-text">
            <slot name="prepend-text" />
          </div>
        </template>

        <template v-else-if="props.prependIcon">
          <div
            class="ss-input__prepend-icon"
            @click="onPrependClick"
          >
            <PrependIcon />
          </div>
        </template>
      </template>

      <!-- input -->
      <input
        :id="name"
        ref="inputElement"
        v-model="inputValue"
        :name="name"
        :test-id="name"
        :type="type"
        :placeholder="placeholder"
        class="ss-input__input"
        :class="{
          'ss-input__input--error': hasError,
        }"
        autocomplete="do-not-autofill"
        @input="onInput"
        @focus="onFocus"
        @blur="onBlur"
        @click="onClick"
      >

      <!-- append -->
      <template v-if="hasAppend">
        <template v-if="slots['append-text']">
          <div class="ss-input__append-text">
            <slot name="append-text" />
          </div>
        </template>

        <template v-else-if="props.appendIcon">
          <div
            class="ss-input__append-icon"
            @click="onAppendClick"
          >
            <AppendIcon />
          </div>
        </template>
      </template>
    </div>

    <template v-if="label">
      <label
        :for="name"
        :class="{
          'ss-input__label--active': modelValue || isFocused,
          'ss-input__label--error': hasError,
        }"
        class="ss-input__label"
      >
        {{ label }}
      </label>
    </template>

    <div
      v-if="message"
      :class="{ 'ss-input__message--error': hasError }"
      class="ss-input__message"
    >
      {{ message }}
    </div>
  </div>
</template>

<style lang="scss">
$input-label-padding: $input-padding;

.ss-input {
  position: relative;
  flex-grow: 1;
  border-radius: $input-border-radius;
  background-color: $color-input-background;
  color: $color-text;
}

.ss-input--message {
  margin-bottom: $spacing-13;
}

.ss-input--disabled {
  @include disabled;
}

.ss-input--error {
  border-color: $color-danger;
  background-color: $bg-error-input;
}

.ss-input__input-wrap {
  display: flex;
}

.ss-input__input {
  width: 100%;
  height: $input-height;
  padding: 0 $input-padding;
  border: $border-input-1 solid $color-input-background;
  border-radius: $input-border-radius;
  background-color: transparent;
  outline: none;
  transition: $transition-base;

  &::placeholder {
    color: $color-text-light;
    opacity: 1; /* Firefox */
  }

  /* Internet Explorer 10-11 */
  &:-webkit-input-placeholder {
    color: $color-text-light;
  }
}

.ss-input__prepend-text,
.ss-input__append-text {
  display: flex;
  flex-shrink: 0;
  align-items: center;
}

.ss-input__prepend-text {
  padding-left: $input-padding;

  &::after {
    content: '\00a0';
  }
}

.ss-input__append-text {
  padding-right: $input-padding;

  &::before {
    content: '\00a0';
  }
}

.ss-input__append-icon,
.ss-input__prepend-icon {
  z-index: 1;
  display: flex;
  flex-basis: $input-height;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.ss-input__input--error {
  border-color: $color-danger;
}

.ss-input__label {
  position: absolute;
  top: $spacing-4 - $spacing-2;
  left: $border-input-1;
  padding: ($spacing-3 - $spacing-1) $input-label-padding;
  border: $border-input-1 solid $color-input-background;
  border-radius: $input-border-radius $input-border-radius $input-border-radius 0;
  background-color: inherit;
  color: $color-text-light;
  font-weight: $regular;
  pointer-events: none;
  transition: $transition-base;
}

.ss-input__label--active {
  top: -$spacing-5 - $spacing-2;
  left: 0;
  font-size: $font-size-xs;

  &.ss-input__label--error {
    border-color: $color-danger;
    border-bottom-color: $bg-error-input;
  }
}

.ss-input__label--error {
  border-color: $bg-error-input;
}

.ss-input__message {
  position: absolute;
  bottom: -$spacing-7;
  left: -$border-input-1;
  display: inline-block;
  overflow: hidden;
  max-width: 100%;
  padding: $spacing-2 $input-padding;
  border: $input-border;
  border-radius: $input-border-radius;
  background-color: $color-input-background;
  color: $color-text-light;
  font-size: $font-size-xs;
  text-overflow: ellipsis;
  transition: $transition-base;
  white-space: nowrap;
}

.ss-input__message--error {
  color: $color-danger;
}

.ss-input--prepend {
  .ss-input__input {
    padding-left: 0;
    border-left-width: 0;
  }

  .ss-input__label {
    left: ($input-height - $input-label-padding);
  }

  .ss-input__label--active {
    left: 0;
  }
}

.ss-input--append {
  .ss-input__input {
    padding-right: 0;
    border-right-width: 0;
  }
}
</style>
