
<script lang="ts" setup>
const route = useRoute()

watch(() => route.path, () => {
    window.scrollTo(0, 0)
})
</script>

<template>
    <div class="ss-app-container">
        <AppWrap>
            <slot>
                <RouterView v-slot="{ Component }">
                    <transition
                        mode="out-in"
                        enter-from-class="ss-app-container__transition"
                        leave-to-class="ss-app-container__transition"
                        enter-active-class="ss-app-container__transition-active"
                        leave-active-class="ss-app-container__transition-active"
                    >
                        <component :is="Component" />
                    </transition>
                </RouterView>
            </slot>
        </AppWrap>

        <PageNotifications />
    </div>
</template>

<style lang="scss">
.ss-app-container {
    padding: $gutter-page 0;
    padding-bottom: $page-navigation-height + $input-height + $spacing-6;
}

.ss-app-container__transition {
    filter: blur($spacing-2);
    opacity: 0;
    transform: scale(80%);
}

.ss-app-container__transition-active {
    transition: $transition-base;
    transition-duration: 0.25s;
}

@include lg {
    .ss-app-container {
        padding-bottom: $page-navigation-height + $input-height + $spacing-6;
        padding: $gutter-page-lg 0;
    }
}
</style>