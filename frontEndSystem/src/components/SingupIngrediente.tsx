import "./SignupIngrediente.css";
import Ingrediente from "../models/Ingrediente";

interface SignupIngredienteProps{
    editIngrediente?: Ingrediente;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function SignupIngrediente({editIngrediente, onSubmit}: SignupIngredienteProps) {
    return (
        <div className="page-paper-container signup-container">
            <h1 className="signup-title">{editIngrediente ? "EDITAR INGREDIENTE" : "INGREDIENTES"}</h1>
            <p className="signup-subtitle">*Informe os dados abaixo.</p>
            <form
                id="create-ingrediente-form"
                onSubmit={onSubmit}
            >
                <input id="idIngrediente" type="hidden" value={editIngrediente?.id}/>
                <input
                    id="nome"
                    className="signup-input"
                    type="text"
                    placeholder="*Nome"
                    defaultValue={editIngrediente?.nome||""}
                    required
                />
                <textarea
                    id="descricao"
                    className="signup-input"
                    placeholder="Descrição"
                    defaultValue={editIngrediente?.descricao||""}
                    required
                />
                <button type="submit">ADICIONAR</button>
            </form>
        </div>
    );
}
