// import { createAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// new method for creating actions
// export let trendingMovies = createAction("trendingMovies");
// export let popularTvShows = createAction("popularTvShows");
// export let latestMovies = createAction("latestMovies");
// export let comedyMov = createAction("comedyMov");
// console.log(action({}));

// action creator old method
// export let addTrendingMov = (trendingMovies) => {
//     return {
//         type: "addTrendingMov",
//         payload: {
//             trendingMovies,
//         },
//     };
// };

// console.log("type", addTrendingMov.type);

// reducer
// new method
// export default createReducer(
//     {},
//     {
//         [trendingMovies.type]: (state, action) => {
//             // state = Object.assign({}, state, {
//             //     trendingMovies: action.payload,
//             // });
//             state[trendingMovies.type] = action.payload;
//         },

//         [popularTvShows.type]: (state, action) => {
//             // state = Object.assign({}, state, {
//             //     popularTvShows: action.payload,
//             // });
//             state[popularTvShows.type] = action.payload;
//         },
//         [comedyMov.type]: (state, action) => {
//             // state = Object.assign({}, state, {
//             //     comedyMov: action.payload,
//             // });
//             state[comedyMov.type] = action.payload;
//         },
//     }
// );

// old method for creating reducers
// export default function reducer(state = {}, action) {
//     switch (action.type) {
//         case addTrendingMov.type:
//             return { ...state, trendingMovies: action.payload };

//         case popularTvShows.type:
//             return { ...state, popularTvShows: action.payload };

//         case latestMovies.type:
//             return { ...state, latestMovies: action.payload };
//         case comedyMov.type:
//             return { ...state, comedyMov: action.payload };

//         default:
//             return state;
//     }
// }

// createSlice method to create actions and reducers
const slice = createSlice({
    name: "movies",
    initialState: {},
    reducers: {
        trendingMovies: (state, action) => {
            // console.log(action);
            state["trendingMovies"] = action.payload;
        },

        popularTvShows: (state, action) => {
            state["popularTvShows"] = action.payload;
        },

        comedyMov: (state, action) => {
            state["comedyMov"] = action.payload;
        },

        latestMovies: (state, action) => {
            state["latestMovies"] = action.payload;
        },
        topRatedTvShows: (state, action) => {
            state["topRatedTvShows"] = action.payload;
        },
    },
});

// console.log(slice);
export const {
    trendingMovies,
    popularTvShows,
    comedyMov,
    latestMovies,
    topRatedTvShows,
} = slice.actions;

export default slice.reducer;

// export const loadMovieData = () => {
//     return (dispatch, getState) => {
//         dispatch({
//             type: "apiCall",
//             payload: {
//                 url: [
//                     `https://api.themoviedb.org/3/trending/all/week?api_key=3e9ea35a5fcdd22c28f994cdeddff43c`,
//                     `https://api.themoviedb.org/3/tv/popular?api_key=3e9ea35a5fcdd22c28f994cdeddff43c&language=en-US&page=1`,
//                     `https://api.themoviedb.org/3/discover/movie?api_key=3e9ea35a5fcdd22c28f994cdeddff43c&language=en-US&region=in&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres=35&with_watch_monetization_types=flatrate`,
//                 ],
//                 onSuccess: "moviesReceived",
//                 onError: "apiRequestFailed",
//             },
//         });
//     };
// };

export const loadMovieData = () => {
    const API_KEY = "3e9ea35a5fcdd22c28f994cdeddff43c";
    return {
        type: "apiCall",
        payload: {
            url: [
                `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}`,
                `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`,
                `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&region=in&sort_by=vote_count.desc&include_adult=true&include_video=false&page=1&with_genres=35&with_watch_monetization_types=flatrate`,
                `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`,
            ],
            onSuccess: "moviesReceived",
            onError: "apiRequestFailed",
        },
    };
};
