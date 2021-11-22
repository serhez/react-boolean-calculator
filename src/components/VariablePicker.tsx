import { RootState } from "store";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setNodeValue } from "reducers/operationReducer";
import { VariableTree } from "types";

export default function VariablePicker(props: {
    id: string;
    onRevert: () => void;
}) {
    const dispatch = useAppDispatch();
    const variables: VariableTree = useAppSelector(
        (state: RootState) => state.variables.tree
    );

    function onChangeValue(event: React.ChangeEvent<HTMLSelectElement>) {
        console.log("onChangeValue " + event.target.value);
        dispatch(
            setNodeValue({
                id: props.id,
                value: event.target.value
            })
        );
    }

    return (
        <div className="variable-picker">
            <select
                className="variable-picker-value"
                defaultValue=""
                onChange={onChangeValue}
            >
                <option value=""></option>
                {Object.entries(variables).map(([key, value]) => (
                    <option key={key} value={key}>
                        {value.name}
                    </option>
                ))}
            </select>
            <button
                className="variable-picker-revert-button"
                onClick={props.onRevert}
            >
                x
            </button>
        </div>
    );
}
