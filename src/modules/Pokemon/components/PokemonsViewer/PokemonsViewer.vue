<script lang="ts" setup>
import { debounce } from 'lodash';
import { POKEMON_LIST_LIMIT } from '../../configs'

</script>

<template>
    <p>PokemonsViewer</p>
</template>

<style lang="scss">
$gap: $input-gutter;
$pagination-height: 72px;

.ss-pokemons-viewer__search {
    margin-bottom: $input-gutter;
}

.ss-pokemons-viewer__pagination {
    position: fixed;
    bottom: $page-navigation-height;
    left: 0;
    width: 100%;
    padding: $spacing-4 0 $spacing-3;
    background-color: $color-paper-3;
}
</style>