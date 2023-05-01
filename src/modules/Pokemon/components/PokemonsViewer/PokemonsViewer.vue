<script lang="ts" setup>
import { debounce } from 'lodash'
import { POKEMON_LIST_LIMIT } from '../../configs'
import { getPokemons, getPokemonsByText } from '../../services/http/pokemon'
import type { Pokemon } from '../../types'
import PokemonList from '../PokemonList/PokemonList.vue'
import { DEBOUNCE_MILLISECONDS } from '~/configs/duration'

const { t } = useI18n()

const pokemons = ref<Pokemon[]>([])
const page = ref<number>(1)
const totalPokemons = ref<number>(0)
const searchText = ref<string>('')
const isLoadingPokemons = ref<boolean>(false)

const paginationLength = computed(() => Math.ceil(totalPokemons.value / POKEMON_LIST_LIMIT))
const hasPokemons = computed<boolean>(() => Boolean(pokemons.value.length))

async function getItems(page = 1) {
    isLoadingPokemons.value = true
    const response = await getPokemons({
        offset: (page - 1) * POKEMON_LIST_LIMIT,
    })

    if (!response.isOk) {
        isLoadingPokemons.value = false
        return
    }

    const { result } = response
    totalPokemons.value = result.count
    pokemons.value = result.results
    isLoadingPokemons.value = false
}

function onPaginationChange(page: number) {
    searchText.value = ''
    getItems(page)
}

const onSearchPokemons = debounce(async () => {
    const text = searchText.value.toLowerCase().trim()

    if (!text) {
        getItems(page.value)
        return
    }

    isLoadingPokemons.value = true
    const response = await getPokemonsByText(text)

    if (!response.isOk) {
        isLoadingPokemons.value = false
        return
    }

    pokemons.value = response.result
    isLoadingPokemons.value = false
}, DEBOUNCE_MILLISECONDS)

function onCreate() {
    getItems()
}

onCreate()
</script>

<template>
    <div
        class="ss-pokemons-viewer"
        test-id="pokemons-viewer"
    >
        <div class="ss-pokemons-viewer__search">
            <Input
                v-model="searchText"
                :label="t('$components.PokemonsViewer.searchByName')"
                prepend-icon="search"
                name="search-pokemon-by-name"
                @input="onSearchPokemons"
            />
        </div>

        <Loader v-show="isLoadingPokemons" />

        <template v-if="!isLoadingPokemons && !hasPokemons">
            <Alert state="warning">
                {{ t('$components.PokemonsViewer.noPokemonsError') }}
            </Alert>
        </template>

        <PokemonList
            v-show="!isLoadingPokemons && hasPokemons"
            :pokemons="pokemons"
        />

        <div class="ss-pokemons-viewer__pagination">
        <AppWrap>
            <Pagination
                v-model="page"
                :length="paginationLength"
                name="pokemons-pagination"
                @change="onPaginationChange"
            />
        </AppWrap>
        </div>
    </div>
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
