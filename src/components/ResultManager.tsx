import { RootState } from "store";
import { Boolean, OperationNode, OperationTree, VariableTree } from "types";
import { useAppSelector } from "store/hooks";

export default function ResultManager() {
    const operation: OperationTree = useAppSelector(
        (state: RootState) => state.operation.tree
    );
    const variables: VariableTree = useAppSelector(
        (state: RootState) => state.variables.tree
    );

    function evaluateNot(literal: Boolean): Boolean {
        switch (literal) {
            case "True":
                return "False";
            case "False":
                return "True";
            default:
                return "Undefined";
        }
    }

    function evaluateAnd(literals: Boolean[]): Boolean {
        console.log("Evaluating and with: ");
        console.log(literals);
        if (literals.length === 0) {
            return "Undefined";
        }
        for (var i = 0; i < literals.length; i++) {
            console.log("[AND] " + literals[i]);
            if (literals[i] === "Undefined") {
                return "Undefined";
            } else if (literals[i] === "False") {
                console.log("returning False");
                return "False";
            }
        }
        console.log("returning True");
        return "True";
    }

    function evaluateOr(literals: Boolean[]): Boolean {
        if (literals.length === 0) {
            return "Undefined";
        }
        for (var i = 0; i < literals.length; i++) {
            if (literals[i] === "Undefined") {
                return "Undefined";
            } else if (literals[i] === "True") {
                return "True";
            }
        }
        return "False";
    }

    function getAllChildrenLiterals(node: OperationNode): Boolean[] {
        let literals: Boolean[] = [];

        node.children.forEach((childId) => {
            let child = operation[childId];
            switch (child.type) {
                case "literal":
                    literals.push(child.value as Boolean);
                    break;
                case "variable":
                case "operand":
                    literals.push(evaluateNode(child));
                    break;
            }
        });

        return literals;
    }

    function evaluateNode(node: OperationNode): Boolean {
        if (node === undefined) {
            return "Undefined";
        }
        switch (node.type) {
            case "literal":
                return node.value as Boolean;
            case "variable":
                if (variables[node.value] === undefined) {
                    return "Undefined";
                }
                return variables[node.value].value;
            case "operand":
                switch (node.value) {
                    case "not":
                        let arg = operation[node.children[0]];
                        return evaluateNot(evaluateNode(arg));
                    case "and":
                        let andLiterals: Boolean[] = getAllChildrenLiterals(
                            node
                        );
                        return evaluateAnd(andLiterals);
                    case "or":
                        let orLiterals: Boolean[] = getAllChildrenLiterals(
                            node
                        );
                        return evaluateOr(orLiterals);
                    default:
                        return "Undefined";
                }
            default:
                return "Undefined";
        }
    }

    function evaluate(): Boolean {
        console.log("Operation: ");
        console.log(operation);
        console.log("Variables: ");
        console.log(variables);
        return evaluateNode(operation[Object.keys(operation)[0]]);
    }

    return <p>{evaluate()}</p>;
}
