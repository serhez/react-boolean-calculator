import { useAppDispatch } from "store/hooks";
import { setNodeValue } from "reducers/operationReducer";

export default function LiteralPicker(props: {
    id: string;
    onRevert: () => void;
}) {
    const dispatch = useAppDispatch();

    function onChangeValue(event: React.ChangeEvent<HTMLSelectElement>) {
        dispatch(setNodeValue({ id: props.id, value: event.target.value }));
    }

    return (
        <div className="literal-picker">
            <select
                className="literal-picker-value"
                defaultValue="True"
                onChange={onChangeValue}
            >
                <option value="True">True</option>
                <option value="False">False</option>
            </select>
            <button
                className="literal-picker-revert-button"
                onClick={props.onRevert}
            >
                x
            </button>
        </div>
    );
}
