import axios from "axios";
import * as actions from "../movies";

const api =
    ({ dispatch, getState }) =>
    (next) =>
    async (action) => {
        // console.log("Action", action);

        if (action.type !== "apiCall") {
            return next(action);
        }

        const { url, onSuccess, onError } = action.payload;
        next(action);
        // [
        //     axios.get(url[0]),
        //     axios.get(url[1]),
        //     axios.get(url[2]),
        //     axios.get(url[3]),
        // ]
        axios
            .all(
                url.map((url) => {
                    return axios.get(url).catch((err) => {
                        return null;
                    });
                })
            )
            .then((resArr) => {
                // console.log(actions.trendingMovies(resArr[0].data.results));
                dispatch(actions.trendingMovies(resArr[0].data.results));
                dispatch(actions.popularTvShows(resArr[1].data.results));
                dispatch(actions.comedyMov(resArr[2].data.results));
                dispatch(actions.topRatedTvShows(resArr[3].data.results));
                // console.log(getState());
            })
            .catch((error) => {
                dispatch({ type: onError, payload: error });
                console.log({ type: onError, payload: error });
            });
    };

export default api;
