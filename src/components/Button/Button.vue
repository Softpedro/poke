<script lang="ts" setup>
import type { State } from 'utils/configs'
import type { ComponentPublicInstance } from 'vue'
import { computed, defineAsyncComponent, shallowRef, useSlots, watch } from 'vue'
import { capitalizeStr } from '~/utils/capitalizeString'

export interface ButtonProps {
  design?: ButtonDesign
  icon?: string
  isActive?: boolean
  isDisabled?: boolean
  isLoading?: boolean
  loadingText?: string
  size?: ButtonSize
  state?: State
  type?: ButtonType
  testId: string
}

export type ButtonSize = 'sm'
export type ButtonType = 'anchor' | 'button' | 'router-link'
export type ButtonDesign = 'primary' | 'secondary'

const props = defineProps<ButtonProps>()
const Spinner = defineAsyncComponent(() => import('../Spinner/Spinner.vue'))
const ButtonIcon = shallowRef<ComponentPublicInstance>()

const slots = useSlots()

const types = {
  'anchor': 'a',
  'router-link': 'router-link',
  'button': 'button',
}

const tagName = computed<string>(() => {
  const { type } = props

  if (!type)
    return 'button'

  return types[type]
})

const hasPrepend = computed<boolean>(() => {
  return Boolean(slots.prepend || props.icon || props.isLoading)
})

watch(() => props.icon, (iconName) => {
  if (!iconName)
    return

  setIcon(iconName)
}, { immediate: true })

function setIcon(iconName: string) {
  const iconPathName = capitalizeStr(iconName)
  ButtonIcon.value = defineAsyncComponent(() => import(`../../icons/${iconPathName}Icon.vue`))
}
</script>

<template>
  <component
    v-bind="$attrs"
    :is="tagName"
    :disabled="isDisabled || isLoading"
    :class="{
      'ss-button--secondary': design === 'secondary',
      'ss-button--sm': size === 'sm',
      'ss-button--active': isActive,
      'ss-button--danger': props.state === 'danger',
      'ss-button--warning': props.state === 'warning',
      'ss-button--info': props.state === 'info',
    }"
    :test-id="testId"
    :type="type"
    class="ss-button"
  >
    <template v-if="hasPrepend">
      <div
        class="ss-button__prepend"
      >
        <slot name="prepend">
          <template v-if="isLoading">
            <Spinner />
          </template>

          <template v-else-if="props.icon">
            <ButtonIcon />
          </template>
        </slot>
      </div>
    </template>

    <template v-if="$slots.default || loadingText">
      <span class="ss-button__text">
        <template v-if="loadingText && isLoading">
          {{ loadingText }}
        </template>
        <template v-else>
          <slot />
        </template>
      </span>
    </template>
  </component>
</template>

<style lang="scss">
@mixin active {
  &:hover,
  &:focus,
  &:active,
  &.ss-button--active {
    @content;
  }
}

.ss-button {
  display: inline-flex;
  min-width: $input-height;
  min-height: $input-height;
  align-items: center;
  justify-content: center;
  padding: ($spacing-4 + $spacing-1) $input-padding;
  border: 1px solid $color-primary;
  // background-image: linear-gradient(to right, $color-primary, $color-hot-teal-2);
  border-radius: $input-border-radius;
  background-color: $color-primary;
  color: $color-white;
  cursor: pointer;
  line-height: 1.25;
  text-decoration: none;
  transition: $transition-base;
  user-select: none;

  @include active {
    background-color: $color-primary-hover;
    color: $color-white;
  }

  &:disabled {
    @include disabled;
  }

  .ss-icon {
    font-size: $font-size-default;
  }
}

.ss-button__text {
  .ss-button__prepend + & {
    margin-left: $spacing-4 - $spacing-2;
  }
}

.ss-button__prepend {
  min-width: $spacing-6;
  line-height: 0;
}

.ss-button--secondary {
  border: $border-base;
  background-color: $c-btn-secondary;
  background-image: none;
  color: $c-btn-secondary-text;

  @include active {
    background-color: $c-btn-secondary-hover;
    color: $color-text;
  }

  &.ss-button--danger {
    border-color: $color-danger-light-hover;
    background-color: $color-danger-light;

    &:hover {
      border-color: $color-danger-light-hover;
      background-color: $color-secondary-hover;
    }
  }

  &.ss-button--warning {
    border-color: $color-warning-light-hover;
    background-color: $color-warning-light;

    &:hover {
      border-color: $color-warning-light-hover;
      background-color: $color-secondary-hover;
    }
  }

  &.ss-button--info {
    border-color: $color-info-light-hover;
    background-color: $color-info-light;

    &:hover {
      border-color: $color-info-light-hover;
      background-color: $color-secondary-hover;
    }
  }
}

.ss-button--active {
  border-color: $color-primary;
}

.ss-button--sm {
  min-width: $input-height-sm;
  min-height: $input-height-sm;
  padding: $spacing-4 $spacing-4;
  font-size: $font-size-xs;
}

.ss-button--danger {
  border-color: $color-danger;
  background-color: $color-danger;
  background-image: none;

  &:hover {
    border-color: $color-danger-hover;
    background-color: $color-danger-hover;
  }

  @include active {
    border-color: $color-danger-active;
    background-color: $color-danger-active;
  }
}

.ss-button--warning {
  border-color: $color-warning;
  background-color: $color-warning;
  background-image: none;

  &:hover {
    border-color: $color-warning-hover;
    background-color: $color-warning-hover;
  }

  @include active {
    border-color: $color-warning-active;
    background-color: $color-warning-active;
  }
}

.ss-button--info {
  border-color: $color-info;
  background-color: $color-info;
  background-image: none;

  &:hover {
    border-color: $color-info-hover;
    background-color: $color-info-hover;
  }

  @include active {
    border-color: $color-info-active;
    background-color: $color-info-active;
  }
}

.ss-button--success {
  background-image: none;
  color: $color-success;

  @include active {
    background-color: $color-success-light;
    color: $color-success;
  }
}
</style>
