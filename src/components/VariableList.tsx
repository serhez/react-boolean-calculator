import { RootState } from "store";
import { VariableTree } from "types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { addVariable } from "reducers/variablesReducer";
import VariableItem from "components/VariableItem";

export default function VariableList() {
    const dispatch = useAppDispatch();
    const variables: VariableTree = useAppSelector(
        (state: RootState) => state.variables.tree
    );

    function onAddVariable() {
        dispatch(
            addVariable({
                name: "",
                value: "True"
            })
        );
    }

    return (
        <div className="variable-list">
            {Object.entries(variables).map(([key, value]) => (
                <VariableItem key={key} id={key} />
            ))}
            <button
                className="variable-list-add-button"
                type="button"
                onClick={onAddVariable}
            >
                +
            </button>
        </div>
    );
}
