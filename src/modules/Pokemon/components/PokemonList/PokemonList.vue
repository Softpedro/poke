<script lang="ts" setup>
import type { Pokemon } from '../../types'
import toggleFavoritePokemon from '../../utils/toggleFavoritePokemon'
import PokemonCard from '../PokemonCard/PokemonCard.vue'
import { ViewPath } from '~/configs/ViewPath'
import { getPath } from '~/utils/getPath'

interface PokemonListProps {
  pokemons: Pokemon[]
}

defineProps<PokemonListProps>()

const emit = defineEmits<{
  (event: 'click-favorite', data: Pokemon): void
}>()

function getPokemonDetailPath(pokemon: Pokemon): string {
  return getPath(ViewPath.POKEMON_DETAIL, { params: { pokemonId: pokemon.id } })
}

function onPickFavorite(pokemon: Pokemon) {
  toggleFavoritePokemon(pokemon)
  emit('click-favorite', pokemon)
}
</script>

<template>
  <div
    class="ss-pokemon-list"
    test-id="pokemon-list"
  >
    <div
      v-for="pokemon in pokemons"
      :key="pokemon.id"
      class="ss-pokemon-list__card"
    >
      <router-link :to="getPokemonDetailPath(pokemon)">
        <PokemonCard
          :pokemon="pokemon"
          @favorite="onPickFavorite"
        />
      </router-link>
    </div>
  </div>
</template>

<style lang="scss">
$gap: $input-padding;
$pagination-height: 72px;

.ss-pokemon-list {
  display: grid;
  align-content: start;
  gap: $gap;
  grid-template-columns: repeat(auto-fit, minmax(156px, auto));

  .ss-pokemon-card__img {
    img {
      max-width: 240px;
      height: 120px;
    }
  }
}
</style>
