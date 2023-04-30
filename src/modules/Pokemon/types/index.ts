export interface Pokemon {
    id: string
    name: string
    isFavorite: boolean
    abilities?: PokemonAbilityConfig[]
}

export interface ApiPokemon {
    name: string
    url: string
}

export interface PokemonApiRes {
    count: number
    next: string | null
    previous: string | null
    results: ApiPokemon[]
}

export interface PokemonRes {
    count: number
    next: string | null
    previous: string | null
    results: Pokemon[]
}

export type PokemonsDic = Record<string, Pokemon>
export type FavoritePokemonsDic = Record<string, Omit<Pokemon, 'isFavorite'>>

export interface PokemonAbility {
    name: string
    url: string
}

export interface PokemonAbilityConfig {
    ability: PokemonAbility
    is_hidden: boolean
    slot: number
}

export interface PokemonDetail {
    id: string
    name: string
    abilities: PokemonAbilityConfig[]
    isFavorite: boolean
}
