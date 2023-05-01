<script lang="ts" setup>
import type { Pokemon } from '../../types'
import { getPath } from '~/utils/getPath'
import { ImgPath } from '~/configs/ImgPath'

interface PokemonImageProps {
  pokemon: Pokemon
}

const props = defineProps<PokemonImageProps>()

const hasError = ref<boolean>(false)

const src = computed(() => {
  if (hasError.value)
    return ImgPath.POKEMON_IMAGE_NOT_FOUND

  const path = getPath(ImgPath.POKEMON_IMAGE, { params: { pokemonId: props.pokemon.id } })
  return `${path}.png`
})

function onError(): void {
  hasError.value = true
}
</script>

<template>
  <div>
    <img
      :src="src"
      :alt="pokemon.name"
      @error="onError"
    >
  </div>
</template>
