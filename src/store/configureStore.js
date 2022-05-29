// import { createStore } from "redux";
// import { devToolsEnhancer } from "@redux-devtools/extension";
import reducer from "./movies";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
// import logger from "./middleware/logger";
import func from "./middleware/func";
import error from "./middleware/error";
import api from "./middleware/api";
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";

// function configureStore() {
//     const store = createStore(
//         reducer,
//         window.__REDUX_DEVTOOLS_EXTENSION__ &&
//             window.__REDUX_DEVTOOLS_EXTENSION__()
//     );
//     return store;
// }

// function configureStore() {
//     const store = createStore(reducer, devToolsEnhancer({ trace: true }));
//     return store;
// }

// export default function configStore() {
//     return configureStore({
//         reducer: reducer,
//         middleware: [logger, func, error, api],
//     });
// }

// persist reducer for keeping data on reload
const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

export default function configStore() {
    return configureStore({
        reducer: persistedReducer,
        // devTools: process.env.NODE_ENV !== "production",
        middleware: [
            ...getDefaultMiddleware({
                serializableCheck: {
                    ignoreActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }),
            error,
            func,
            api,
        ],
    });
}

// export default configureStore;
