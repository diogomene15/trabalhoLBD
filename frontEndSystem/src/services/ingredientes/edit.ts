import axios, { AxiosResponse } from "axios";
import Ingrediente from "../../models/Ingrediente";
import { BASE_URL } from "./config";

export default async function edit(newIngredient: Ingrediente) : Promise<AxiosResponse<Ingrediente|undefined> >{
    let response: AxiosResponse<Ingrediente|undefined> = <AxiosResponse<Ingrediente|undefined>>{data: undefined};
    try{
        response = await axios.put(`${BASE_URL}/ingrediente/${newIngredient.id}`, newIngredient);
    }catch(error){
        console.error(error);
    }
    if(!response || !response.data) return {data: undefined} as AxiosResponse<Ingrediente|undefined>;
    return response;
}