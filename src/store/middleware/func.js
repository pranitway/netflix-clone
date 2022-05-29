const func =
    ({ dispatch, getState }) =>
    (next) =>
    (action) => {
        if (typeof action === "function") {
            console.log("Middleware function executed");
            action(dispatch, getState);
        } else {
            // next means reducer
            next(action);
        }
    };

export default func;
