import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemons";
import MyPokemons from "../entities/MyPokemons";


export async function getPokemons(userId: number){
    const allPokemons = await getRepository(Pokemon).find();

    const userPokemons = await getRepository(MyPokemons).find({userId});

    interface userPokemonsIds {
        [key: number]: boolean
    }
    
    const userPokemonsIds: userPokemonsIds = {};

    userPokemons.forEach(pokemon => {
        userPokemonsIds[pokemon.pokemonId] = true;
    });

    const pokemons: Pokemon[] = allPokemons.map(pokemon => {
        return {
        id: pokemon.id,
        name: pokemon.name,
        number: pokemon.number,
        image: pokemon.image,
        weight: pokemon.weight,
        height: pokemon.height,
        baseExp: pokemon.baseExp,
        description: pokemon.description,
        inMyPokemons: userPokemonsIds[pokemon.id] || false,
        };
    });

    return pokemons;
}

export async function addPokemons(userId: number, pokemonId: number){
    const pokemons = await getRepository(MyPokemons).insert({userId, pokemonId});
    return pokemons;
}

export async function removePokemons(userId: number, pokemonId: number){
    const pokemons = await getRepository(MyPokemons).delete({userId, pokemonId});
    return pokemons;
}