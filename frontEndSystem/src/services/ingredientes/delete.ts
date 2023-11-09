import axios, { AxiosResponse } from "axios";
import Ingrediente from "../../models/Ingrediente";

const BASE_URL = 'http://localhost:3000';

export default async function deleteIngrediente(id: number) : Promise<AxiosResponse<Ingrediente[]|undefined> >{
    //use axios
    let response: AxiosResponse<Ingrediente[]|undefined> = <AxiosResponse<Ingrediente[]|undefined>>{data: undefined};
    try{
        response = await axios.delete(`${BASE_URL}/ingrediente/${id}`);
    }catch(error){
        console.error(error);
    }
    if(!response || !response.data) return {data: undefined} as AxiosResponse<Ingrediente[]|undefined>;
    return response;
}