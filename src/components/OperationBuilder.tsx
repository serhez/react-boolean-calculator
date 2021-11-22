import { useState } from "react";
import OperandPicker from "components/OperandPicker";
import LiteralPicker from "components/LiteralPicker";
import VariablePicker from "components/VariablePicker";
import { RootState } from "store";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
    addNode,
    addChild,
    deleteNode,
    removeChild
} from "reducers/operationReducer";

export default function OperationBuilder(props: {
    parentId: string | undefined;
    mustBeBool: boolean;
    optional: boolean;
}) {
    const dispatch = useAppDispatch();
    const count: number = useAppSelector(
        (state: RootState) => state.operation.count
    );

    const [show, setShow] = useState(true);
    const [picker, setPicker] = useState({
        id: (-1).toString(),
        type: "default"
    });

    function onChangePicker(event: React.ChangeEvent<HTMLSelectElement>) {
        // Delete old picker from the state
        if (picker.type !== "default") {
            if (props.parentId !== undefined) {
                dispatch(
                    removeChild({
                        parentId: props.parentId,
                        childId: picker.id
                    })
                );
            }
            dispatch(deleteNode(picker.id));
        }

        // Create new picker and add it to the state
        switch (event.target.value) {
            case "operand":
                dispatch(
                    addNode({
                        type: "operand",
                        value: "not",
                        children: []
                    })
                );
                if (props.parentId !== undefined) {
                    dispatch(
                        addChild({
                            parentId: props.parentId,
                            childId: count.toString()
                        })
                    );
                }
                setPicker({ id: count.toString(), type: "operand" });
                break;

            case "literal":
                dispatch(
                    addNode({
                        type: "literal",
                        value: "True",
                        children: []
                    })
                );
                if (props.parentId !== undefined) {
                    dispatch(
                        addChild({
                            parentId: props.parentId,
                            childId: count.toString()
                        })
                    );
                }
                setPicker({ id: count.toString(), type: "literal" });
                break;

            case "variable":
                dispatch(
                    addNode({
                        type: "variable",
                        value: "",
                        children: []
                    })
                );
                if (props.parentId !== undefined) {
                    dispatch(
                        addChild({
                            parentId: props.parentId,
                            childId: count.toString()
                        })
                    );
                }
                setPicker({ id: count.toString(), type: "variable" });
                break;

            default:
                setPicker({ id: (-1).toString(), type: "default" });
                break;
        }
    }

    function onDelete() {
        setShow(false);
    }

    function onRevert() {
        // Update state
        if (props.parentId !== undefined) {
            dispatch(
                removeChild({ parentId: props.parentId, childId: picker.id })
            );
        }
        dispatch(deleteNode(picker.id));

        // Revert to default picker
        setPicker({
            id: (-1).toString(),
            type: "default"
        });
    }

    return (
        <div className="operation-builder">
            {show && (
                <div className="operation-builder-content">
                    {picker.type === "default" && (
                        <select
                            className="operation-builder-picker"
                            defaultValue=""
                            onChange={onChangePicker}
                        >
                            <option value=""></option>
                            <option
                                disabled={props.mustBeBool ? true : false}
                                value="operand"
                            >
                                Operand
                            </option>
                            <option value="literal">Literal</option>
                            <option value="variable">Variable</option>
                        </select>
                    )}
                    {picker.type === "operand" && (
                        <OperandPicker id={picker.id} onRevert={onRevert} />
                    )}
                    {picker.type === "literal" && (
                        <LiteralPicker id={picker.id} onRevert={onRevert} />
                    )}
                    {picker.type === "variable" && (
                        <VariablePicker id={picker.id} onRevert={onRevert} />
                    )}
                    {props.optional && picker.type === "default" && (
                        <button
                            className="operation-builder-remove-button"
                            onClick={onDelete}
                        >
                            x
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
