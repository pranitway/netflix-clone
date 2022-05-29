import "./App.css";

// import "mdbootstrap/css/bootstrap.min.css";

// import "mdbootstrap/js/bootstrap.js";
// import "bootstrap-icons/font/bootstrap-icons.css";
import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/common/Navbar";
import TvShows from "./components/Tvshows";
import Movies from "./components/Movies";
import NewPopular from "./components/NewPopular";
import MyList from "./components/MyList";
import NotFound from "./components/NotFound";

import { Provider } from "react-redux";

import configStore from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const store = configStore();
const persistor = persistStore(store);

function App() {
    // let [latestMovies, setLatestMov] = useState({});

    // function loadData() {}

    // useEffect();
    let [page, setPage] = useState({
        home: [
            {
                id: 1,
                sec: "trendingMovies",
                movieType: "trendingMovies",
                movieRowTitle: "New Releases",
                type: "movie",
            },
            {
                id: 2,
                sec: "popularTvShows",
                movieType: "popularTvShows",
                movieRowTitle: "Popular TV Shows",
                type: "tv",
            },
            {
                id: 3,
                sec: "comedy",
                movieType: "comedyMov",
                movieRowTitle: "Comedy Movies",
                type: "movie",
            },
            {
                id: 4,
                sec: "topRatedTvShows",
                movieType: "topRatedTvShows",
                movieRowTitle: "Top Rated TV Shows",
                type: "tv",
            },
        ],
    });

    return (
        <Provider store={store}>
            <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
                <div className="App">
                    <Navbar></Navbar>
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate replace to="/browse" />}
                        />
                        <Route
                            path="/browse"
                            element={<Home homeSec={page.home}></Home>}
                        ></Route>
                        <Route
                            path="/browse/tv-shows"
                            element={<TvShows></TvShows>}
                        ></Route>
                        <Route
                            path="/browse/movies"
                            element={<Movies></Movies>}
                        ></Route>
                        <Route
                            path="/browse/new-and-popular"
                            element={<NewPopular></NewPopular>}
                        ></Route>
                        <Route
                            path="/browse/my-list"
                            element={<MyList></MyList>}
                        ></Route>
                        <Route
                            path="/*"
                            element={<Navigate replace to="/not-found" />}
                        ></Route>
                        <Route path="/not-found" element={<NotFound />}></Route>
                    </Routes>
                </div>
            </PersistGate>
        </Provider>
    );
}

export default App;
