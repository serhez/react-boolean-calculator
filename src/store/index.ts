import { configureStore } from "@reduxjs/toolkit";
import variablesReducer from "reducers/variablesReducer";
import operationReducer from "reducers/operationReducer";

export const store = configureStore({
    reducer: {
        variables: variablesReducer,
        operation: operationReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
