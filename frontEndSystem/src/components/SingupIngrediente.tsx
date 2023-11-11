import "./SignupIngrediente.css";
import create from "../services/ingredientes/create";
import { useRef } from "react";
import Ingrediente from "../models/Ingrediente";

interface SignupIngredienteProps{
    setIngredientes: (ingredientes: Ingrediente[]) => void;
    ingredientes: Ingrediente[];
}

export default function SignupIngrediente({setIngredientes, ingredientes}: SignupIngredienteProps) {
    const formRef = useRef<HTMLFormElement>(null);
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
    );
}
