import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {trainReducer} from "./slices/train.slice";


const rootReducer = combineReducers({
    trainReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer,
});

export {setupStore};
