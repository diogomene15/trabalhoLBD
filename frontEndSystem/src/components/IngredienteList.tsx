import Ingrediente from "../models/Ingrediente";
import IngredienteItem from "./IngredienteItem";
import deleteIngrediente from "../services/ingredientes/delete";
import "./IngredienteList.css";

interface IngredienteListProps{
    setIngredientes: (ingredientes: Ingrediente[]) => void;
    ingredientes: Ingrediente[];
}
export default function IngredienteList({setIngredientes,ingredientes}:IngredienteListProps) {
    return (
        <div className="page-paper-container ingredientes-container">
            <h1 className="ingredientes-title">LISTA INGREDIENTES</h1>

            <ul className="ingredientes-list">
                {ingredientes.map((ingrediente, index) => (
                    <IngredienteItem
                        key={index}
                        nome={ingrediente.nome}
                        descricao={ingrediente.descricao}
                        onEditar={async () => {}}
                        onExcluir={async () => {
                            if (ingrediente && ingrediente.id) {
                                const resDelete = await deleteIngrediente(
                                    ingrediente.id
                                );
                                if (resDelete.status < 400)
                                    setIngredientes(
                                        ingredientes.filter(
                                            (ingredienteItem) =>
                                                ingredienteItem.id !==
                                                ingrediente.id
                                        )
                                    );
                            }
                        }}
                    />
                ))}
            </ul>
        </div>
    );
}
