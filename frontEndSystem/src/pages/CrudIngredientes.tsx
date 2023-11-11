import "./CrudIngredientes.css";
import { useEffect, useState } from "react";
import Ingrediente from "../models/Ingrediente";
import getAll from "../services/ingredientes/getAll";
import SignupIngrediente from "../components/SingupIngrediente";
import IngredienteList from "../components/IngredienteList";
import create from "../services/ingredientes/create";

export default function CrudIngredientes() {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    useEffect(() => {
        getAll().then((resIngredientes) => {
            if (resIngredientes && resIngredientes.length > 0)
                setIngredientes(resIngredientes as Ingrediente[]);
        });
    }, []);
    const handleCreateIngrediente = (async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        const nomeIngrediente = (
            form.querySelector("#nome") as HTMLInputElement
        )?.value;
        const descricaoIngrediente = (
            form.querySelector("#descricao") as HTMLInputElement
        )?.value;
        const response = await create({
            nome: nomeIngrediente,
            descricao: descricaoIngrediente,
        });
        if (response.status < 400)
            setIngredientes([
                ...ingredientes,
                { id:Number(response.data?.id),nome: String(response.data?.nome), descricao: String(response.data?.descricao) },
            ]);
    });

    return (
        <div className="crudIngredientes-container">
            <SignupIngrediente onSubmit={handleCreateIngrediente}/>
            <IngredienteList setIngredientes={setIngredientes} ingredientes={ingredientes}/>
        </div>
    );
}
