import axios, { AxiosResponse } from "axios";
import Ingrediente from "../../models/Ingrediente";
import { BASE_URL } from "./config";

export default async function getAll() {
    //use axios
    let response: AxiosResponse<Ingrediente[]|undefined> = <AxiosResponse<Ingrediente[]|undefined>>{data: undefined};
    try{
        response = await axios.get(`${BASE_URL}/ingrediente`);
    }catch(error){
        console.error(error);
    }
    if(!response || !response.data) return [];
    return response.data;
}