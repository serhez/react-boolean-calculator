import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";
import type { VariableNode, VariableState } from "types";

const initialState: VariableState = {
    tree: {},
    count: 0
};

export const variablesSlice = createSlice({
    name: "variables",
    initialState,

    reducers: {
        addVariable: (state, action: PayloadAction<VariableNode>) => {
            state.tree[state.count] = action.payload;
            state.count++;
        },

        deleteVariable: (state, action: PayloadAction<string>) => {
            delete state.tree[action.payload];
        },

        setVariableName: (
            state,
            action: PayloadAction<{ id: string; name: string }>
        ) => {
            state.tree[action.payload.id].name = action.payload.name;
        },

        setVariableValue: (
            state,
            action: PayloadAction<{ id: string; value: string }>
        ) => {
            state.tree[action.payload.id].value = action.payload.value;
        }
    }
});

export const {
    addVariable,
    deleteVariable,
    setVariableName,
    setVariableValue
} = variablesSlice.actions;

export const selectVariables = (state: RootState) => state.variables.tree;

export default variablesSlice.reducer;
