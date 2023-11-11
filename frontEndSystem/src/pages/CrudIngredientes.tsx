import "./CrudIngredientes.css";
import { useEffect, useState } from "react";
import Ingrediente from "../models/Ingrediente";
import getAll from "../services/ingredientes/getAll";
import SignupIngrediente from "../components/SingupIngrediente";
import IngredienteList from "../components/IngredienteList";

export default function CrudIngredientes() {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    useEffect(() => {
        getAll().then((resIngredientes) => {
            if (resIngredientes && resIngredientes.length > 0)
                setIngredientes(resIngredientes as Ingrediente[]);
        });
    });
    return (
        <div className="crudIngredientes-container">
            <SignupIngrediente setIngredientes={setIngredientes} ingredientes={ingredientes}/>
            <IngredienteList setIngredientes={setIngredientes} ingredientes={ingredientes}/>
        </div>
    );
}
