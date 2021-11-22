import React, { useState } from "react";
import { useAppDispatch } from "store/hooks";
import { setNodeValue, deleteAllChildren } from "reducers/operationReducer";
import OperationBuilder from "components/OperationBuilder";
import styles from "styles/OperandPicker.module.css";

export default function OperandPicker(props: {
    id: string;
    onRevert: () => void;
}) {
    const dispatch = useAppDispatch();

    const [value, setValue] = useState("not");
    const [extraArgs, setExtraArgs] = useState(0);

    function onChangeValue(event: React.ChangeEvent<HTMLSelectElement>) {
        dispatch(setNodeValue({ id: props.id, value: event.target.value }));
        dispatch(deleteAllChildren(props.id));
        setValue(event.target.value);
    }

    function onClickAddArg() {
        setExtraArgs(extraArgs + 1);
    }

    /* NOTE:
     * We do not use dangerouslySetInnerHTML() because SSR strips
     * the store's global state, which the OperationBuilder's need.
     *
     * We also do not combine the operand type checks because, when
     * picking a different operand type, we do not want residual
     * OperationBuilder's we have deleted from the global state (by
     * onChangeValue()) to remain in the DOM.
     */
    return (
        <div className="operand-picker">
            <select
                className="operand-picker-value"
                defaultValue="not"
                onChange={onChangeValue}
            >
                <option value="not">Not</option>
                <option value="and">And</option>
                <option value="or">Or</option>
            </select>
            <button
                className="operand-picker-revert-button"
                onClick={props.onRevert}
            >
                x
            </button>
            <div className={styles["operand-picker-args"]}>
                {value === "not" && (
                    <OperationBuilder
                        parentId={props.id}
                        mustBeBool={true}
                        optional={false}
                    />
                )}
                {value === "and" && (
                    <div>
                        <OperationBuilder
                            parentId={props.id}
                            mustBeBool={true}
                            optional={false}
                        />
                        <OperationBuilder
                            parentId={props.id}
                            mustBeBool={false}
                            optional={false}
                        />
                    </div>
                )}
                {value === "or" && (
                    <div>
                        <OperationBuilder
                            parentId={props.id}
                            mustBeBool={true}
                            optional={false}
                        />
                        <OperationBuilder
                            parentId={props.id}
                            mustBeBool={false}
                            optional={false}
                        />
                    </div>
                )}
                {[...Array(extraArgs)].map((element, index) => {
                    return (
                        <OperationBuilder
                            key={index}
                            parentId={props.id}
                            mustBeBool={false}
                            optional={true}
                        />
                    );
                })}
                {value !== "not" && (
                    <button
                        className="operand-picker-add-button"
                        onClick={onClickAddArg}
                    >
                        Add argument
                    </button>
                )}
            </div>
        </div>
    );
}
