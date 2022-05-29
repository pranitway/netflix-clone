// import axios from "axios";
// import configStore from "./store/configureStore";
// import * as actions from "./store/movies";

// const store = configStore();

// let API_KEY = "3e9ea35a5fcdd22c28f994cdeddff43c";

// store.dispatch((dispatch, getState) => {
// here we can call an api
// when the promise is resolved => dispatch()
// if promise is rejected => dispatch()
// console.log("function executed");
// dispatch(actions.latestMovies(["a", "b", "c", "d"]));
// console.log(getState());
// dispatch("error");
//     dispatch({
//         type: "apiCall",
//         payload: {
//             url: [
//                 `https://api.themoviedb.org/3/trending/all/week?api_key=3e9ea35a5fcdd22c28f994cdeddff43c`,
//                 `https://api.themoviedb.org/3/tv/popular?api_key=3e9ea35a5fcdd22c28f994cdeddff43c&language=en-US&page=1`,
//                 `https://api.themoviedb.org/3/discover/movie?api_key=3e9ea35a5fcdd22c28f994cdeddff43c&language=en-US&region=in&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres=35&with_watch_monetization_types=flatrate`,
//             ],
//             onSuccess: "movies received",
//             onError: "apiRequestFailed",
//         },
//     });
// });
// store.dispatch("apiCall");
// store.dispatch("error");
// async function loadData() {
//     // let response = await axios.get(
//     //     `https://api.themoviedb.org/3/trending/all/week`,
//     //     {
//     //         params: { api_key: API_KEY },
//     //     }
//     // );

//     let data = await axios
//         .all([
//             axios.get(`https://api.themoviedb.org/3/trending/all/week`, {
//                 params: { api_key: API_KEY },
//             }),
//             axios.get(`https://api.themoviedb.org/3/tv/popular`, {
//                 params: {
//                     api_key: API_KEY,
//                     language: "en-US",
//                     page: 1,
//                 },
//             }),
//             axios.get(
//                 `https://api.themoviedb.org/3/discover/movie?api_key=3e9ea35a5fcdd22c28f994cdeddff43c&language=en-US&region=in&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres=35&with_watch_monetization_types=flatrate`
//             ),
//         ])
//         .then((resArr) => {
//             // console.log("res", res.data.results);
//             store.dispatch(actions.trendingMovies(resArr[0].data.results));
//             store.dispatch(actions.popularTvShows(resArr[1].data.results));
//             store.dispatch(actions.comedyMov(resArr[2].data.results));

//             // store.dispatch(actions.popularTvShows(resArr[1].data.results));
//             // store.dispatch(actions.comedyMov(resArr[2].data.results));
//             console.log("storeData:", store.getState());
//             // return resArr.data.results;
//         })
//         .catch((err) => {
//             console.log(err);
//         });

//     return data;
// }
// loadData();
// let movData = loadData();
// store.dispatch(actions.addTrendingMov(movData));
// console.log(store.getState());

// store.dispatch(actions.addTrendingMov([{ name: "doctor strange" }]));
// console.log("this time:", store.getState());
