import { addFavoritePokemonInLocalStorage, removeFavoritePokemonFromLocalStorage } from '../../services/localStorage/pokemon'
import type { Pokemon } from '../../types'

export default function toggleFavoritePokemon(pokemon: Pokemon): void {
  if (pokemon.isFavorite) {
    pokemon.isFavorite = false
    removeFavoritePokemonFromLocalStorage(pokemon)
    return
  }

  pokemon.isFavorite = true
  addFavoritePokemonInLocalStorage(pokemon)
}
