const logger = (store) => (next) => (action) => {
    // console.log("store", store);
    // console.log("next", next);
    // console.log("action", action);
    // console.log(store.getState());
    // passing action to reducer, here reducer is next
    // console.log("Action", action);
    next(action);
};

export default logger;
