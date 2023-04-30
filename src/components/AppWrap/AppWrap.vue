<script lang="ts" setup>
</script>

<template>
    <div class="ss-app-wrap">
        <slot />
    </div>
</template>

<style lang="scss">
.ss-app-wrap {
    padding: 0 $gutter-page;
}

@include lg {
    .ss-app-wrap {
        padding: 0 $gutter-page-lg;
    }
}
</style>
