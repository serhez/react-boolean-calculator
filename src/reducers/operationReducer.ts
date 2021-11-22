import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";
import type { OperationNode, OperationTree, OperationState } from "types";

const initialState: OperationState = {
    tree: {},
    count: 0
};

function deleteChildren(tree: OperationTree, childrenIds: string[]) {
    childrenIds.forEach((id) => {
        deleteChildren(tree, tree[id].children);
        delete tree[id];
    });
}

export const operationSlice = createSlice({
    name: "operation",
    initialState,

    reducers: {
        addNode: (state, action: PayloadAction<OperationNode>) => {
            state.tree[state.count] = action.payload;
            state.count++;
        },

        addChild: (
            state,
            action: PayloadAction<{ parentId: string; childId: string }>
        ) => {
            state.tree[action.payload.parentId].children.push(
                action.payload.childId
            );
        },

        removeChild: (
            state,
            action: PayloadAction<{ parentId: string; childId: string }>
        ) => {
            let children = state.tree[action.payload.parentId].children;
            const index = children.indexOf(action.payload.childId);
            if (index > -1) {
                children.splice(index, 1);
            }
        },

        removeAllChildren: (state, action: PayloadAction<string>) => {
            state.tree[action.payload].children = [];
        },

        deleteAllChildren: (state, action: PayloadAction<string>) => {
            deleteChildren(state.tree, state.tree[action.payload].children);
            state.tree[action.payload].children = [];
        },

        modifyNode: (
            state,
            action: PayloadAction<{ id: string; node: OperationNode }>
        ) => {
            state.tree[action.payload.id] = action.payload.node;
        },

        setNodeValue: (
            state,
            action: PayloadAction<{ id: string; value: string }>
        ) => {
            state.tree[action.payload.id].value = action.payload.value;
        },

        deleteNode: (state, action: PayloadAction<string>) => {
            deleteChildren(state.tree, state.tree[action.payload].children);
            delete state.tree[action.payload];
        }
    }
});

export const {
    addNode,
    addChild,
    removeChild,
    removeAllChildren,
    deleteAllChildren,
    modifyNode,
    setNodeValue,
    deleteNode
} = operationSlice.actions;

export const selectOperation = (state: RootState) => state.operation.tree;

export default operationSlice.reducer;
