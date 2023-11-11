import "./CrudIngredientes.css";
import { useEffect, useRef, useState } from "react";
import IngredienteItem from "../components/IngredienteItem";
import Ingrediente from "../models/Ingrediente";
import getAll from "../services/ingredientes/getAll";
import create from "../services/ingredientes/create";
import deleteIngrediente from "../services/ingredientes/delete";

export default function CrudIngredientes() {
    const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        getAll().then((resIngredientes) => {
            if (resIngredientes && resIngredientes.length > 0)
                setIngredientes(resIngredientes as Ingrediente[]);
        });
    });
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nomeIngrediente = (
            formRef.current?.elements.namedItem("nome") as HTMLInputElement
        )?.value;
        const descricaoIngrediente = (
            formRef.current?.elements.namedItem("descricao") as HTMLInputElement
        )?.value;
        const response = await create({
            nome: nomeIngrediente,
            descricao: descricaoIngrediente,
        });
        if (response.status < 400)
            setIngredientes([
                ...ingredientes,
                { nome: nomeIngrediente, descricao: descricaoIngrediente },
            ]);
    };
    return (
        <div className="crudIngredientes-container">
            <div className="page-paper-container signup-container">
                <h1 className="signup-title">INGREDIENTES</h1>
                <p className="signup-subtitle">*Informe os dados abaixo.</p>
                <form
                    id="create-ingrediente-form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <input
                        id="nome"
                        className="signup-input"
                        type="text"
                        placeholder="*Nome"
                        required
                    />
                    <textarea
                        id="descricao"
                        className="signup-input"
                        placeholder="Descrição"
                        required
                    />

                    <button type="submit">ADICIONAR</button>
                </form>
            </div>
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
        </div>
    );
}
