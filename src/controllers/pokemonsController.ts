import { Request, Response } from "express";
import * as pokemonsService from "../services/pokemonsService";

export async function getPokemons (req: Request, res: Response){
    try{
        const pokemons = await pokemonsService.getPokemons();
        res.send(pokemons)
    } catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}