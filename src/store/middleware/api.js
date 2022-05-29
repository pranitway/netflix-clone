import axios from "axios";
import * as actions from "../movies";

// const actionObj = {
//     type: "apiCall",
//     payload: {
//         url: [
//             `https://api.themoviedb.org/3/trending/all/week?api_key=3e9ea35a5fcdd22c28f994cdeddff43c`,
//             `https://api.themoviedb.org/3/tv/popular?api_key=3e9ea35a5fcdd22c28f994cdeddff43c&language=en-US&page=1`,
//             `https://api.themoviedb.org/3/discover/movie?api_key=3e9ea35a5fcdd22c28f994cdeddff43c&language=en-US&region=in&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres=35&with_watch_monetization_types=flatrate`,
//         ],

//         method: "GET",
//         data: {},
//         onSuccess: "movies received",
//         onError: "apiRequestFailed",
//     },
// };

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
                    axios.get(url).catch((err) => {
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
