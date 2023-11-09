import "./IngredienteItem.css";

interface IngredienteItemProps {
    nome: string;
    descricao?: string;

      onEditar?: () => void;
      onExcluir?: () => void;
}

export default function IngredienteItem(props: IngredienteItemProps) {
    const { onEditar = ()=>{}, onExcluir = ()=>{}} = props;
    return (
        <li className="ingredientes-list-item">
            <p className="ingredientes-nome">{props.nome}</p>
            <div className="container-ingredientes-buttons">
                <button className="ingredientes-container button" onClick={onExcluir}>
                    Excluir
                </button>
                <button className="ingredientes-container button" onClick={onEditar}>
                    EDITAR
                </button>
            </div>
        </li>
    );
}
