import { Request, Response } from "express";
import * as pokemonsService from "../services/pokemonsService";

export async function getPokemons(req: Request, res: Response){
    try{
        const pokemons = await pokemonsService.getPokemons();
        res.send(pokemons)
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function addPokemon(req: Request, res: Response){
    try{
        const pokemonId = Number(req.params.id)
        const userId = Number(res.locals.id)

        await pokemonsService.addPokemons(userId, pokemonId);
        res.sendStatus(200)
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

export async function removePokemon(req: Request, res: Response){
    try{
        const pokemonId = Number(req.params.id)
        const userId = Number(res.locals.id)

        await pokemonsService.removePokemons(userId, pokemonId);
        res.sendStatus(200)
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

