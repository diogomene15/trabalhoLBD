import Ingrediente from "../models/Ingrediente";
import "./EditIngrediente.css";
import SignupIngrediente from "./SingupIngrediente";

interface EditIngredienteProps {
    isOpen: boolean;
    onEditIngredient: (event: React.FormEvent<HTMLFormElement>) => void;
    ingrediente?: Ingrediente;
}

export default function EditIngrediente({
    isOpen,
    onEditIngredient,
    ingrediente
}: EditIngredienteProps) {
    return (
        <>
            {isOpen && (
                <SignupIngrediente
                    onSubmit={onEditIngredient}
                    editIngrediente={ingrediente}
                ></SignupIngrediente>
            )}
        </>
    );
}
