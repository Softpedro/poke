import type { FavoritePokemonsDic, Pokemon } from '../../../types'
import type { LocalStorageRes } from '~/clients/localStorage'
import { addInLocalStorage, getFromLocalStorage } from '~/clients/localStorage'
import { LocalStorageKey } from '~/configs/LocalStorageKey'
import { loggedUser } from '~/composables/loggedUser'

export function getFavoritePokemonsByUserIdFromStorage(): LocalStorageRes<Record<string, FavoritePokemonsDic>> {
    return getFromLocalStorage<Record<string, FavoritePokemonsDic>>(LocalStorageKey.FAVORITE_POKEMONS)
}

export function addFavoritePokemonInLocalStorage(pokemon: Pokemon): void {
    const { isFavorite, ...favoritePokemon } = pokemon

    if (!isFavorite)
        throw new Error(`the pokemon ${pokemon.id} ${pokemon.name}} is not favorite`)

    const response = getFavoritePokemonsByUserIdFromStorage()

    if (!response.isOk) {
        addInLocalStorage(LocalStorageKey.FAVORITE_POKEMONS, {
        [loggedUser.value.id]: { [pokemon.id]: favoritePokemon },
        })

        return
    }

    const favoritePokemonsByUserId = response.result
    const favoritePokemonsDic = favoritePokemonsByUserId[loggedUser.value.id]

    if (!favoritePokemonsDic) {
        favoritePokemonsByUserId[loggedUser.value.id] = { [pokemon.id]: favoritePokemon }
        addInLocalStorage(LocalStorageKey.FAVORITE_POKEMONS, favoritePokemonsByUserId)

        return
    }

    favoritePokemonsDic[pokemon.id] = favoritePokemon
    addInLocalStorage(LocalStorageKey.FAVORITE_POKEMONS, favoritePokemonsByUserId)
}

export function removeFavoritePokemonFromLocalStorage(pokemon: Pokemon): void {
    const response = getFavoritePokemonsByUserIdFromStorage()

    if (!response.isOk)
        return

    const favoritePokemonsByUserId = response.result
    const favoritePokemonsDic = favoritePokemonsByUserId[loggedUser.value.id]

    if (!favoritePokemonsDic)
        return

    delete favoritePokemonsDic[pokemon.id]

    addInLocalStorage(LocalStorageKey.FAVORITE_POKEMONS, favoritePokemonsByUserId)
}
