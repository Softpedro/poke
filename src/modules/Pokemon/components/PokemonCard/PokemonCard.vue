<script lang="ts" setup>
import type { Pokemon } from '../../types'
import PokemonImg from '../PokemonImg/PokemonImg.vue'

interface PokemonCardProps {
  pokemon: Pokemon
}

const props = defineProps<PokemonCardProps>()

const emit = defineEmits<{
  (event: 'favorite', value: Pokemon): void
}>()

function onFavoriteClick() {
  emit('favorite', props.pokemon)
}
</script>

<template>
  <div
    class="ss-pokemon-card"
    :class="{
      'ss-pokemon-card--favorite': pokemon.isFavorite,
    }"
    test-id="pokemon-card"
  >
    <Card>
      <div class="ss-pokemon-card__name">
        {{ pokemon.name }}
      </div>

      <div class="ss-pokemon-card__img">
        <PokemonImg :pokemon="pokemon" />
      </div>

      <div class="ss-pokemon-card__id">
        {{ pokemon.id }}
      </div>

      <div class="ss-pokemon-card__favorite">
        <FavoriteButton
          :is-active="pokemon.isFavorite"
          @click.prevent="onFavoriteClick"
        />
      </div>
    </Card>
  </div>
</template>

<style lang="scss">
.ss-pokemon-card {
  position: relative;

  &:hover {
    .ss-card {
      background-color: $color-paper-1;
    }
  }
}

.ss-pokemon-card__img {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: $spacing-5 auto $spacing-10;
}

.ss-pokemon-card__id {
  position: absolute;
  bottom: $input-padding;
  left: $input-padding;
}

.ss-pokemon-card__favorite {
  position: absolute;
  right: 0;
  bottom: 0;
}

.ss-pokemon-card__name {
  overflow: hidden;
  width: 100%;
  font-weight: $bold;
  text-overflow: ellipsis;
  text-transform: capitalize;
  white-space: nowrap;
}
</style>
