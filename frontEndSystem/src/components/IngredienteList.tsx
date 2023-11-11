import Ingrediente from "../models/Ingrediente";
import IngredienteItem from "./IngredienteItem";
import deleteIngrediente from "../services/ingredientes/delete";
import "./IngredienteList.css";
import edit from "../services/ingredientes/edit";
import EditIngrediente from "./EditIngrediente";
import { useState } from "react";

interface IngredienteListProps {
    setIngredientes: (ingredientes: Ingrediente[]) => void;
    ingredientes: Ingrediente[];
}
export default function IngredienteList({
    setIngredientes,
    ingredientes,
}: IngredienteListProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [editedIngrediente, setEditedIngrediente] = useState<Ingrediente | undefined>(undefined);
    const handleEditIngrediente = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        
        const idIngrediente = Number((
            form.querySelector("#idIngrediente") as HTMLInputElement
        )?.value);
        const nomeIngrediente = (
            form.querySelector("#nome") as HTMLInputElement
        )?.value;
        const descricaoIngrediente = (
            form.querySelector("#descricao") as HTMLInputElement
        )?.value;

        const response = await edit({
            id: idIngrediente,
            nome: nomeIngrediente,
            descricao: descricaoIngrediente,
        });
        if (response.status < 400){
            const ingredienteAntigo = ingredientes.find(ingrediente=>ingrediente.id===idIngrediente);
            if(ingredienteAntigo){
                ingredienteAntigo.nome = nomeIngrediente;
                ingredienteAntigo.descricao = descricaoIngrediente;
                setIngredientes([...ingredientes]);
            }
        }

    };
   const handleClickEdit = (ingrediente:Ingrediente)=>{
         setEditedIngrediente(ingrediente);
         setIsOpen(true);
   }

    return (
        <>
            <EditIngrediente isOpen={isOpen} onEditIngredient={handleEditIngrediente} ingrediente={editedIngrediente}/>
            <div className="page-paper-container ingredientes-container">
                <h1 className="ingredientes-title">LISTA INGREDIENTES</h1>

                <ul className="ingredientes-list">
                    {ingredientes.map((ingrediente, index) => (
                        <IngredienteItem
                            key={index}
                            nome={ingrediente.nome}
                            descricao={ingrediente.descricao}
                            onEditar={async () => {
                                handleClickEdit(ingrediente)
                            }}
                            onExcluir={async () => {
                                console.log(ingredientes);
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
        </>
    );
}
