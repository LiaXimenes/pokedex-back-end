import { getRepository } from "typeorm";
import Pokemon from "../entities/Pokemons";
import MyPokemons from "../entities/MyPokemons";


export async function getPokemons(){
    const pokemons = await getRepository(Pokemon).find();
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