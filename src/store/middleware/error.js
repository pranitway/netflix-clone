const error = (store) => (next) => (action) => {
    if (action.type === "apiRequestFailed") {
        console.log(action.type, action.payload);
    } else {
        next(action);
    }
    // console.log("Action", action);
    // next(action);
};

export default error;
