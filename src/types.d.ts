export type Boolean = "True" | "False" | "Undefined";
export type OperationNodeType = "operand" | "literal" | "variable";

export type OperationNode = {
    type: OperationNodeType;
    value: string;
    children: string[];
};

export type VariableNode = {
    name: string;
    value: Boolean;
};

export type OperationTree = {
    [id: string]: OperationNode;
};

export type VariableTree = {
    [id: string]: VariableNode;
};

export type VariableState = {
    tree: VariableTree;
    count: number;
};

export type OperationState = {
    tree: OperationTree;
    count: number;
};
