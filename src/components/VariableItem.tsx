import React from "react";
import { useAppDispatch } from "store/hooks";
import {
    deleteVariable,
    setVariableName,
    setVariableValue
} from "reducers/variablesReducer";

export default function VariableItem(props: { id: string }) {
    const dispatch = useAppDispatch();

    function onChangeName(event: React.ChangeEvent<HTMLInputElement>) {
        dispatch(setVariableName({ id: props.id, name: event.target.value }));
    }

    function onChangeValue(event: React.ChangeEvent<HTMLSelectElement>) {
        dispatch(setVariableValue({ id: props.id, value: event.target.value }));
    }

    function onDelete() {
        dispatch(deleteVariable(props.id));
    }

    return (
        <div className="variable-item">
            <input
                className="variable-item-name"
                onChange={onChangeName}
            ></input>
            <select
                className="variable-item-value"
                defaultValue="True"
                onChange={onChangeValue}
            >
                <option value="True">True</option>
                <option value="False">False</option>
            </select>
            <button className="variable-item-remove-button" onClick={onDelete}>
                x
            </button>
        </div>
    );
}
